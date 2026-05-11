package com.mediconnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ambulance_services")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AmbulanceService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ambulanceId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @Column(length = 50)
    private String ambulanceType;

    private String driverName;

    private Float rating;

    private Float reliabilityScore;

    @Column(length = 30)
    private String availabilityStatus;

    private Double currentLatitude;

    private Double currentLongitude;

    @Column(length = 255)
    private String equipmentSupported;
}
