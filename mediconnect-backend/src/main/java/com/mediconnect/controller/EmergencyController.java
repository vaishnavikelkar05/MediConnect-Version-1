package com.mediconnect.controller;

import com.mediconnect.dto.*;
import com.mediconnect.entity.Hospital;
import com.mediconnect.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/emergency")
@CrossOrigin(origins = "*")
public class EmergencyController {
    private final TriageService triageService;
    private final EmergencyRecommendationService emergencyRecommendationService;
    private final AmbulanceRecommendationService ambulanceRecommendationService;
    private final BedAvailabilityService bedAvailabilityService;
    private final RouteOptimizationService routeOptimizationService;
    private final OfflineEmergencySyncService offlineEmergencySyncService;

    public EmergencyController(
            TriageService triageService,
            EmergencyRecommendationService emergencyRecommendationService,
            AmbulanceRecommendationService ambulanceRecommendationService,
            BedAvailabilityService bedAvailabilityService,
            RouteOptimizationService routeOptimizationService,
            OfflineEmergencySyncService offlineEmergencySyncService
    ) {
        this.triageService = triageService;
        this.emergencyRecommendationService = emergencyRecommendationService;
        this.ambulanceRecommendationService = ambulanceRecommendationService;
        this.bedAvailabilityService = bedAvailabilityService;
        this.routeOptimizationService = routeOptimizationService;
        this.offlineEmergencySyncService = offlineEmergencySyncService;
    }

    @PostMapping("/triage")
    public ResponseEntity<TriageResponse> triage(@RequestBody EmergencyTriageRequest request) {
        return ResponseEntity.ok(triageService.triage(request));
    }

    @PostMapping("/appointments/recommend")
    public ResponseEntity<EmergencyDoctorRecommendation> recommendDoctor(@RequestBody EmergencyAppointmentRequest request) {
        return ResponseEntity.ok(emergencyRecommendationService.recommendBestDoctor(request));
    }

    @PostMapping("/appointments")
    public ResponseEntity<EmergencyDoctorRecommendation> bookEmergencyAppointment(@RequestBody EmergencyAppointmentRequest request) {
        return ResponseEntity.ok(emergencyRecommendationService.bookEmergencyAppointment(request));
    }

    @PostMapping("/ambulances/recommend")
    public ResponseEntity<AmbulanceRecommendationResponse> recommendAmbulance(@RequestBody AmbulanceRecommendationRequest request) {
        return ResponseEntity.ok(ambulanceRecommendationService.recommendAmbulance(request));
    }

    @GetMapping("/beds")
    public ResponseEntity<List<Hospital>> beds() {
        return ResponseEntity.ok(bedAvailabilityService.getBedAvailability());
    }

    @GetMapping("/route")
    public ResponseEntity<RouteResponse> route(
            @RequestParam Double fromLat,
            @RequestParam Double fromLng,
            @RequestParam Double toLat,
            @RequestParam Double toLng
    ) {
        return ResponseEntity.ok(routeOptimizationService.optimizeRoute(fromLat, fromLng, toLat, toLng));
    }

    @PostMapping("/offline-sync")
    public ResponseEntity<EmergencyDoctorRecommendation> syncOffline(@RequestBody EmergencyAppointmentRequest request) {
        return ResponseEntity.ok(offlineEmergencySyncService.syncOfflineRequest(request));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, String>> handleEmergencyException(IllegalStateException ex) {
        return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
    }
}
