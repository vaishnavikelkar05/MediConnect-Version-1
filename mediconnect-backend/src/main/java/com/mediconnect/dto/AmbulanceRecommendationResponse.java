package com.mediconnect.dto;

import com.mediconnect.entity.AmbulanceService;
import com.mediconnect.entity.Hospital;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AmbulanceRecommendationResponse {
    private AmbulanceService ambulance;
    private Hospital hospital;
    private Double distanceKm;
    private Integer etaMinutes;
    private Double score;
    private String routeSummary;
    private List<String> alternateRoutes;
    private List<String> selectedBecause;
}
