package com.mediconnect.service;

import com.mediconnect.dto.EmergencyAppointmentRequest;
import com.mediconnect.dto.EmergencyDoctorRecommendation;
import org.springframework.stereotype.Service;

@Service
public class OfflineEmergencySyncService {
    private final EmergencyRecommendationService emergencyRecommendationService;

    public OfflineEmergencySyncService(EmergencyRecommendationService emergencyRecommendationService) {
        this.emergencyRecommendationService = emergencyRecommendationService;
    }

    public EmergencyDoctorRecommendation syncOfflineRequest(EmergencyAppointmentRequest request) {
        return emergencyRecommendationService.bookEmergencyAppointment(request);
    }
}
