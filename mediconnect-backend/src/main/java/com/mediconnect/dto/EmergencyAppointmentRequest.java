package com.mediconnect.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class EmergencyAppointmentRequest extends EmergencyTriageRequest {
    private String patientName;
    private String patientPhone;
    private Double latitude;
    private Double longitude;
    private String manualLocation;
}
