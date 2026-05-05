package com.mediconnect.service;

import com.mediconnect.entity.Hospital;
import com.mediconnect.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    public Optional<Hospital> getHospitalById(Integer id) {
        return hospitalRepository.findById(id);
    }

    public List<Hospital> searchHospitals(String name) {
        return hospitalRepository.findByNameContainingIgnoreCase(name);
    }
}
