package com.mediconnect.dto;

import com.mediconnect.entity.Appointment;
import com.mediconnect.entity.Doctor;
import com.mediconnect.entity.Hospital;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class EmergencyDoctorRecommendation {
    private Doctor doctor;
    private Hospital hospital;
    private Appointment appointment;
    private String mappedSpecialization;
    private String severityLevel;
    private Double distanceKm;
    private Integer etaMinutes;
    private Double score;
    private Integer queueLoad;
    private List<String> selectedBecause;
    private TriageResponse triage;
}
