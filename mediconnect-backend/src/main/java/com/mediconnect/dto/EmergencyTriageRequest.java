package com.mediconnect.dto;

import lombok.Data;

@Data
public class EmergencyTriageRequest {
    private String symptoms;
    private String severity;
    private String consciousnessState;
    private String breathingCondition;
    private String bleedingLevel;
    private String emergencyType;
}
