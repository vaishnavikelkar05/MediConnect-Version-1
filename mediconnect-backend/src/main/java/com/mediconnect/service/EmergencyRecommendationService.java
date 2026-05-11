package com.mediconnect.service;

import com.mediconnect.dto.*;
import com.mediconnect.entity.Appointment;
import com.mediconnect.entity.Doctor;
import com.mediconnect.entity.DoctorSchedule;
import com.mediconnect.entity.Hospital;
import com.mediconnect.repository.DoctorRepository;
import com.mediconnect.repository.DoctorScheduleRepository;
import com.mediconnect.util.EmergencyMapper;
import com.mediconnect.util.GeoUtil;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Service
public class EmergencyRecommendationService {
    public static final double MAX_EMERGENCY_RADIUS = 20.0;
    public static final int MAX_ACCEPTABLE_ETA = 25;

    private final DoctorRepository doctorRepository;
    private final DoctorScheduleRepository scheduleRepository;
    private final TriageService triageService;
    private final AppointmentService appointmentService;

    public EmergencyRecommendationService(
            DoctorRepository doctorRepository,
            DoctorScheduleRepository scheduleRepository,
            TriageService triageService,
            AppointmentService appointmentService
    ) {
        this.doctorRepository = doctorRepository;
        this.scheduleRepository = scheduleRepository;
        this.triageService = triageService;
        this.appointmentService = appointmentService;
    }

    public EmergencyDoctorRecommendation recommendBestDoctor(EmergencyAppointmentRequest request) {
        TriageResponse triage = triageService.triage(request);
        String specialization = EmergencyMapper.specializationFor(request.getEmergencyType());

        return doctorRepository.findAll().stream()
                .filter(doctor -> doctor.getHospital() != null && Boolean.TRUE.equals(doctor.getEmergencySupported()))
                .filter(doctor -> Boolean.TRUE.equals(doctor.getHospital().getEmergencySupported()))
                .map(doctor -> buildRecommendation(request, triage, specialization, doctor, false))
                .filter(candidate -> candidate.getDistanceKm() <= MAX_EMERGENCY_RADIUS)
                .filter(candidate -> candidate.getEtaMinutes() <= MAX_ACCEPTABLE_ETA)
                .max(Comparator.comparing(EmergencyDoctorRecommendation::getScore))
                .orElseGet(() -> doctorRepository.findAll().stream()
                        .filter(doctor -> doctor.getHospital() != null && Boolean.TRUE.equals(doctor.getEmergencySupported()))
                        .map(doctor -> buildRecommendation(request, triage, specialization, doctor, true))
                        .max(Comparator.comparing(EmergencyDoctorRecommendation::getScore))
                        .orElseThrow(() -> new IllegalStateException("No emergency doctors are available")));
    }

    public EmergencyDoctorRecommendation bookEmergencyAppointment(EmergencyAppointmentRequest request) {
        EmergencyDoctorRecommendation recommendation = recommendBestDoctor(request);
        Appointment appointment = new Appointment();
        appointment.setPatientName(request.getPatientName());
        appointment.setPatientPhone(request.getPatientPhone());
        appointment.setDoctor(recommendation.getDoctor());
        appointment.setHospital(recommendation.getHospital());
        appointment.setAppointmentType("Emergency");
        appointment.setEmergencyType(request.getEmergencyType());
        appointment.setAppointmentTime(LocalDateTime.now().plusMinutes(Math.max(5, recommendation.getEtaMinutes())));
        appointment.setStatus("Critical".equals(recommendation.getSeverityLevel()) ? "Emergency Priority" : "Pending");
        appointment.setSeverityLevel(recommendation.getSeverityLevel());
        appointment.setPatientLatitude(request.getLatitude());
        appointment.setPatientLongitude(request.getLongitude());
        appointment.setQueuePriority(priorityFor(recommendation.getSeverityLevel()));
        Appointment saved = appointmentService.save(appointment);
        recommendation.setAppointment(saved);
        return recommendation;
    }

    public double calculateEmergencyScore(Doctor doctor, String specialization, TriageResponse triage, double distanceKm, int etaMinutes, int queueLoad, boolean hospitalCompatible, boolean available) {
        double specializationScore = doctor.getSpecialization() != null && doctor.getSpecialization().equalsIgnoreCase(specialization) ? 10 : 6;
        double reliability = value(doctor.getReliabilityScore(), 5);
        double rating = value(doctor.getRating(), 3) * 2;
        double experience = Math.min(value(doctor.getYearsExperience(), 0) / 2.0, 10);
        double etaScore = Math.max(0, 10 - (etaMinutes / 2.5));
        double distanceScore = Math.max(0, 10 - (distanceKm / 2.0));
        double queueScore = Math.max(0, 10 - (queueLoad * 1.8));
        double availabilityScore = available ? 10 : 4;
        double hospitalScore = hospitalCompatible ? 10 : 5;
        double severityBoost = "Critical".equals(triage.getSeverityLevel()) ? reliability * 0.8 : reliability * 0.4;

        // Reliability and emergency capability intentionally outweigh pure distance.
        return reliability * 2.2
                + hospitalScore * 1.5
                + specializationScore * 1.6
                + availabilityScore * 1.4
                + etaScore * 1.2
                + rating
                + experience
                + queueScore
                + distanceScore * 0.6
                + severityBoost;
    }

    public int estimateETA(double distanceKm, String severityLevel) {
        double avgEmergencySpeedKmh = "Critical".equals(severityLevel) ? 48.0 : 40.0;
        int trafficBuffer = distanceKm > 8 ? 5 : 2;
        return Math.max(4, (int) Math.ceil((distanceKm / avgEmergencySpeedKmh) * 60) + trafficBuffer);
    }

    public double calculateDistance(Double lat1, Double lon1, Double lat2, Double lon2) {
        return GeoUtil.distanceKm(lat1, lon1, lat2, lon2);
    }

    private EmergencyDoctorRecommendation buildRecommendation(EmergencyAppointmentRequest request, TriageResponse triage, String specialization, Doctor doctor, boolean allowOutsideThreshold) {
        Hospital hospital = doctor.getHospital();
        double distance = calculateDistance(request.getLatitude(), request.getLongitude(), hospital.getLatitude(), hospital.getLongitude());
        int eta = estimateETA(distance, triage.getSeverityLevel());
        int queueLoad = appointmentService.currentQueueLoad(doctor.getId());
        boolean compatible = EmergencyMapper.hospitalSupports(
                request.getEmergencyType(),
                Boolean.TRUE.equals(hospital.getTraumaSupport()),
                Boolean.TRUE.equals(hospital.getCardiacSupport()),
                Boolean.TRUE.equals(hospital.getNeurologySupport())
        );
        boolean available = isDoctorAvailable(doctor.getId());
        double score = calculateEmergencyScore(doctor, specialization, triage, distance, eta, queueLoad, compatible, available);
        if (!allowOutsideThreshold && (!compatible || !available)) {
            score -= 8;
        }

        List<String> reasons = List.of(
                "High emergency reliability score: " + value(doctor.getReliabilityScore(), 5) + "/10",
                available ? "Available immediately for emergency queue" : "Not in scheduled slot, but emergency-supported",
                "Specialized for " + specialization + " response",
                "Reachable in " + eta + " minutes",
                compatible ? "Hospital has matching emergency capability" : "Hospital can stabilize but has limited specialty capability",
                "Queue load: " + queueLoad + " active patient(s)"
        );
        return new EmergencyDoctorRecommendation(doctor, hospital, null, specialization, triage.getSeverityLevel(), round(distance), eta, round(score), queueLoad, reasons, triage);
    }

    private boolean isDoctorAvailable(Integer doctorId) {
        String today = LocalDateTime.now().getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
        LocalTime now = LocalTime.now();
        List<DoctorSchedule> schedules = scheduleRepository.findByDoctorId(doctorId);
        return schedules.isEmpty() || schedules.stream().anyMatch(schedule ->
                Boolean.TRUE.equals(schedule.getIsAvailable())
                        && schedule.getDay().equalsIgnoreCase(today)
                        && !now.isBefore(schedule.getStartTime())
                        && !now.isAfter(schedule.getEndTime())
        );
    }

    private int priorityFor(String severityLevel) {
        return switch (severityLevel) {
            case "Critical" -> 100;
            case "High" -> 75;
            case "Moderate" -> 45;
            default -> 20;
        };
    }

    private double round(double value) {
        return Math.round(value * 10.0) / 10.0;
    }

    private double value(Number value, double fallback) {
        return value == null ? fallback : value.doubleValue();
    }
}
