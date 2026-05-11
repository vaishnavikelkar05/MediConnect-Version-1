package com.mediconnect.controller;

import com.mediconnect.entity.Hospital;
import com.mediconnect.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    @GetMapping("/hospitals")
    public List<Hospital> getAllHospitals(@RequestParam(required = false) String search) {
        if (search != null && !search.trim().isEmpty()) {
            return hospitalService.searchHospitals(search);
        }
        return hospitalService.getAllHospitals();
    }

    @GetMapping("/hospitals/{id}")
    public ResponseEntity<Hospital> getHospitalById(@PathVariable Integer id) {
        return hospitalService.getHospitalById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
