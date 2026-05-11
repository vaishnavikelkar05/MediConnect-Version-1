package com.mediconnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer appointmentId;

    @Column(nullable = false)
    private String patientName;

    @Column(nullable = false, length = 20)
    private String patientPhone;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @Column(length = 50)
    private String appointmentType;

    @Column(length = 100)
    private String emergencyType;

    private LocalDateTime appointmentTime;

    @Column(length = 40)
    private String status;

    @Column(length = 20)
    private String severityLevel;

    private Double patientLatitude;

    private Double patientLongitude;

    private Integer queuePriority;

    private LocalDateTime createdAt;
}
