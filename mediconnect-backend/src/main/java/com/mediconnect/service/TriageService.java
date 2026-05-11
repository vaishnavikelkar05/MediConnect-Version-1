package com.mediconnect.service;

import com.mediconnect.dto.EmergencyTriageRequest;
import com.mediconnect.dto.TriageResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class TriageService {

    public TriageResponse triage(EmergencyTriageRequest request) {
        int score = 0;
        List<String> reasons = new ArrayList<>();
        String text = normalize(request.getSymptoms() + " " + request.getSeverity());

        if (containsAny(text, "chest pain", "heart attack", "stroke", "seizure", "poison")) {
            score += 30;
            reasons.add("Symptoms match a high-risk emergency pattern");
        }
        if (normalize(request.getConsciousnessState()).contains("unconscious")) {
            score += 30;
            reasons.add("Patient consciousness state requires immediate priority");
        }
        if (containsAny(normalize(request.getBreathingCondition()), "difficulty", "not breathing", "severe")) {
            score += 25;
            reasons.add("Breathing condition increases emergency severity");
        }
        if (containsAny(normalize(request.getBleedingLevel()), "severe", "heavy", "uncontrolled")) {
            score += 25;
            reasons.add("Bleeding level indicates urgent intervention");
        }
        if (normalize(request.getEmergencyType()).contains("heart") || normalize(request.getEmergencyType()).contains("stroke")) {
            score += 20;
            reasons.add("Emergency category needs specialist response");
        }

        String level = score >= 70 ? "Critical" : score >= 45 ? "High" : score >= 20 ? "Moderate" : "Low";
        return new TriageResponse(level, score, score >= 60, reasons);
    }

    private boolean containsAny(String value, String... needles) {
        for (String needle : needles) {
            if (value.contains(needle)) return true;
        }
        return false;
    }

    private String normalize(String value) {
        return value == null ? "" : value.toLowerCase(Locale.ROOT);
    }
}
