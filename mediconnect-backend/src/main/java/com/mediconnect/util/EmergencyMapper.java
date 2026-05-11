package com.mediconnect.util;

import java.util.Locale;

public final class EmergencyMapper {
    private EmergencyMapper() {
    }

    public static String specializationFor(String emergencyType) {
        String value = normalize(emergencyType);
        if (value.contains("heart")) return "Cardiologist";
        if (value.contains("stroke") || value.contains("seizure") || value.contains("unconscious")) return "Neurologist";
        if (value.contains("accident") || value.contains("trauma") || value.contains("bleeding")) return "Trauma Surgeon";
        if (value.contains("breathing")) return "Pulmonologist";
        if (value.contains("burn")) return "Emergency Physician";
        if (value.contains("poison")) return "General Physician";
        return "General Physician";
    }

    public static boolean hospitalSupports(String emergencyType, boolean trauma, boolean cardiac, boolean neuro) {
        String value = normalize(emergencyType);
        if (value.contains("heart") || value.contains("breathing")) return cardiac;
        if (value.contains("stroke") || value.contains("seizure") || value.contains("unconscious")) return neuro;
        if (value.contains("accident") || value.contains("trauma") || value.contains("bleeding") || value.contains("burn")) return trauma;
        return true;
    }

    public static String ambulanceTypeFor(String emergencyType) {
        String value = normalize(emergencyType);
        if (value.contains("heart")) return "Cardiac Ambulance";
        if (value.contains("accident") || value.contains("trauma") || value.contains("bleeding") || value.contains("burn")) return "Trauma Ambulance";
        if (value.contains("stroke") || value.contains("unconscious") || value.contains("breathing")) return "ICU Ambulance";
        return "Basic Ambulance";
    }

    private static String normalize(String value) {
        return value == null ? "" : value.toLowerCase(Locale.ROOT);
    }
}
