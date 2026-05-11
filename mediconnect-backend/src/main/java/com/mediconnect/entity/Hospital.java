package com.mediconnect.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hospitals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    private Double latitude;

    private Double longitude;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(length = 20)
    private String contact;

    private Boolean emergencySupported;

    private Integer icuBedsAvailable;

    private Integer generalBedsAvailable;

    private Integer emergencyBedsAvailable;

    private Integer traumaBedsAvailable;

    private Boolean traumaSupport;

    private Boolean cardiacSupport;

    private Boolean neurologySupport;
}
