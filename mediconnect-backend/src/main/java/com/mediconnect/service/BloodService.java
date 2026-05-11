package com.mediconnect.service;

import com.mediconnect.entity.Blood;
import com.mediconnect.repository.BloodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BloodService {

    @Autowired
    private BloodRepository bloodRepository;

    public List<Blood> getAllBlood() {
        return bloodRepository.findAll();
    }

    public List<Blood> getBloodByGroup(String group) {
        return bloodRepository.findByBloodGroupIgnoreCase(group);
    }

    public List<Blood> getBloodByHospital(Integer hospitalId) {
        return bloodRepository.findByHospitalId(hospitalId);
    }
}
