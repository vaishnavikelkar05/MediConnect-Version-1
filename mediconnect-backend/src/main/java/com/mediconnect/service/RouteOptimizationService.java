package com.mediconnect.service;

import com.mediconnect.dto.RouteResponse;
import com.mediconnect.entity.Hospital;
import com.mediconnect.repository.HospitalRepository;
import com.mediconnect.util.GeoUtil;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class RouteOptimizationService {
    private final HospitalRepository hospitalRepository;

    public RouteOptimizationService(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    public RouteResponse optimizeRoute(Double fromLat, Double fromLng, Double toLat, Double toLng) {
        double distance = GeoUtil.distanceKm(fromLat, fromLng, toLat, toLng);
        String traffic = trafficFor(distance);
        int eta = eta(distance, traffic);
        List<Hospital> nearby = hospitalRepository.findAll().stream()
                .filter(hospital -> Boolean.TRUE.equals(hospital.getEmergencySupported()))
                .sorted(Comparator.comparing(hospital -> GeoUtil.distanceKm(fromLat, fromLng, hospital.getLatitude(), hospital.getLongitude())))
                .limit(5)
                .toList();
        return new RouteResponse(
                round(distance),
                eta,
                "Fastest emergency corridor via arterial roads",
                traffic,
                List.of("Alternate route via ring road", "Backup route avoiding central congestion"),
                nearby
        );
    }

    public int eta(double distanceKm, String trafficCondition) {
        double speed = switch (trafficCondition) {
            case "Heavy" -> 28.0;
            case "Moderate" -> 38.0;
            default -> 48.0;
        };
        return Math.max(3, (int) Math.ceil((distanceKm / speed) * 60));
    }

    public String trafficFor(double distanceKm) {
        int minute = java.time.LocalTime.now().getMinute();
        if (distanceKm > 10 || minute % 5 == 0) return "Heavy";
        if (minute % 2 == 0) return "Moderate";
        return "Clear";
    }

    private double round(double value) {
        return Math.round(value * 10.0) / 10.0;
    }
}
