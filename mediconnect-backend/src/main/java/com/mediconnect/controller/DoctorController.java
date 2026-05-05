package com.mediconnect.controller;

import com.mediconnect.entity.Doctor;
import com.mediconnect.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/doctors")
    public List<Doctor> getDoctors(
            @RequestParam(required = false) Integer hospitalId,
            @RequestParam(required = false) String specialization) {

        if (hospitalId != null) {
            return doctorService.getDoctorsByHospital(hospitalId);
        }
        if (specialization != null && !specialization.trim().isEmpty()) {
            return doctorService.getDoctorsBySpecialization(specialization);
        }
        return doctorService.getAllDoctors();
    }
}
