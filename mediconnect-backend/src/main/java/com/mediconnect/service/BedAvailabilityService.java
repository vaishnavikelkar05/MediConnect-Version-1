package com.mediconnect.service;

import com.mediconnect.entity.Hospital;
import com.mediconnect.repository.HospitalRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class BedAvailabilityService {
    private final HospitalRepository hospitalRepository;
    private final Random random = new Random();

    public BedAvailabilityService(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    public List<Hospital> getBedAvailability() {
        return hospitalRepository.findAll();
    }

    @Scheduled(fixedRate = 60000)
    public void simulateDynamicAvailability() {
        List<Hospital> hospitals = hospitalRepository.findAll();
        for (Hospital hospital : hospitals) {
            hospital.setIcuBedsAvailable(nextBedCount(hospital.getIcuBedsAvailable(), 0, 18));
            hospital.setGeneralBedsAvailable(nextBedCount(hospital.getGeneralBedsAvailable(), 0, 55));
            hospital.setEmergencyBedsAvailable(nextBedCount(hospital.getEmergencyBedsAvailable(), 0, 12));
            hospital.setTraumaBedsAvailable(nextBedCount(hospital.getTraumaBedsAvailable(), 0, 8));
        }
        hospitalRepository.saveAll(hospitals);
    }

    private int nextBedCount(Integer current, int min, int max) {
        int value = current == null ? random.nextInt(max + 1) : current + random.nextInt(5) - 2;
        return Math.max(min, Math.min(max, value));
    }
}
