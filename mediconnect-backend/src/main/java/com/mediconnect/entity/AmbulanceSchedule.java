package com.mediconnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Entity
@Table(name = "ambulance_schedule")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AmbulanceSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer scheduleId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ambulance_id")
    private AmbulanceService ambulance;

    @Column(name = "schedule_day", length = 20)
    private String day;

    private LocalTime startTime;

    private LocalTime endTime;

    private Boolean isAvailable;
}
