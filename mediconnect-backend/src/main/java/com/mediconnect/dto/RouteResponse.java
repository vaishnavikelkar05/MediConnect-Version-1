package com.mediconnect.dto;

import com.mediconnect.entity.Hospital;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RouteResponse {
    private Double distanceKm;
    private Integer etaMinutes;
    private String fastestRoute;
    private String trafficCondition;
    private List<String> alternateRoutes;
    private List<Hospital> nearbyEmergencyHospitals;
}
