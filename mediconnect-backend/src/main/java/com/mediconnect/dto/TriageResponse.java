package com.mediconnect.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class TriageResponse {
    private String severityLevel;
    private Integer priorityScore;
    private Boolean prioritizeIcu;
    private List<String> reasons;
}
