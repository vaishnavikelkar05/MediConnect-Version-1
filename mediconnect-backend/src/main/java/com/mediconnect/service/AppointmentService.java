package com.mediconnect.service;

import com.mediconnect.entity.Appointment;
import com.mediconnect.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment save(Appointment appointment) {
        appointment.setCreatedAt(LocalDateTime.now());
        return appointmentRepository.save(appointment);
    }

    public int currentQueueLoad(Integer doctorId) {
        return appointmentRepository.findByDoctorIdAndStatusIn(
                doctorId,
                List.of("Pending", "Confirmed", "Emergency Priority")
        ).size();
    }
}
