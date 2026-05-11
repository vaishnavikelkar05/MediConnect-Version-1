package com.mediconnect.service;

import com.mediconnect.dto.AmbulanceRecommendationRequest;
import com.mediconnect.dto.AmbulanceRecommendationResponse;
import com.mediconnect.entity.AmbulanceService;
import com.mediconnect.entity.Hospital;
import com.mediconnect.repository.AmbulanceServiceRepository;
import com.mediconnect.util.EmergencyMapper;
import com.mediconnect.util.GeoUtil;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Service
public class AmbulanceRecommendationService {
    private final AmbulanceServiceRepository ambulanceRepository;
    private final RouteOptimizationService routeOptimizationService;

    public AmbulanceRecommendationService(AmbulanceServiceRepository ambulanceRepository, RouteOptimizationService routeOptimizationService) {
        this.ambulanceRepository = ambulanceRepository;
        this.routeOptimizationService = routeOptimizationService;
    }

    public AmbulanceRecommendationResponse recommendAmbulance(AmbulanceRecommendationRequest request) {
        String idealType = EmergencyMapper.ambulanceTypeFor(request.getEmergencyType());
        return ambulanceRepository.findByAvailabilityStatusIgnoreCase("Available").stream()
                .filter(ambulance -> ambulance.getHospital() != null)
                .map(ambulance -> scoreAmbulance(request, ambulance, idealType))
                .max(Comparator.comparing(AmbulanceRecommendationResponse::getScore))
                .orElseThrow(() -> new IllegalStateException("No ambulances are currently available"));
    }

    private AmbulanceRecommendationResponse scoreAmbulance(AmbulanceRecommendationRequest request, AmbulanceService ambulance, String idealType) {
        Hospital hospital = ambulance.getHospital();
        double distance = GeoUtil.distanceKm(request.getLatitude(), request.getLongitude(), ambulance.getCurrentLatitude(), ambulance.getCurrentLongitude());
        String traffic = routeOptimizationService.trafficFor(distance);
        int eta = routeOptimizationService.eta(distance, traffic);
        boolean typeMatch = idealType.equalsIgnoreCase(ambulance.getAmbulanceType());
        boolean equipmentMatch = normalize(ambulance.getEquipmentSupported()).contains(firstWord(idealType));
        boolean hospitalReady = Boolean.TRUE.equals(hospital.getEmergencySupported());

        double score = value(ambulance.getReliabilityScore(), 5) * 2.4
                + value(ambulance.getRating(), 3) * 2.0
                + (typeMatch ? 18 : 8)
                + (equipmentMatch ? 14 : 6)
                + (hospitalReady ? 12 : 2)
                + Math.max(0, 16 - eta * 0.7)
                + Math.max(0, 10 - distance);

        List<String> reasons = List.of(
                "Reliability score " + value(ambulance.getReliabilityScore(), 5) + "/10",
                typeMatch ? "Matches required " + idealType : "Can respond while ideal unit is unavailable",
                equipmentMatch ? "Emergency equipment matches the case" : "Basic stabilization equipment available",
                "ETA " + eta + " minutes with " + traffic.toLowerCase(Locale.ROOT) + " traffic simulation",
                hospitalReady ? "Linked hospital supports emergency intake" : "Linked hospital has limited emergency intake"
        );

        return new AmbulanceRecommendationResponse(
                ambulance,
                hospital,
                round(distance),
                eta,
                round(score),
                "Fastest route selected using traffic-aware simulation",
                List.of("Hospital road alternate", "Bypass road alternate"),
                reasons
        );
    }

    private String normalize(String value) {
        return value == null ? "" : value.toLowerCase(Locale.ROOT);
    }

    private String firstWord(String value) {
        return value.split(" ")[0].toLowerCase(Locale.ROOT);
    }

    private double value(Number value, double fallback) {
        return value == null ? fallback : value.doubleValue();
    }

    private double round(double value) {
        return Math.round(value * 10.0) / 10.0;
    }
}
