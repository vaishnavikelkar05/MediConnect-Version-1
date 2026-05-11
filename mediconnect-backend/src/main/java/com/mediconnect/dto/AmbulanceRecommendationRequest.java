package com.mediconnect.dto;

import lombok.Data;

@Data
public class AmbulanceRecommendationRequest {
    private Double latitude;
    private Double longitude;
    private String emergencyType;
    private String severityLevel;
}
