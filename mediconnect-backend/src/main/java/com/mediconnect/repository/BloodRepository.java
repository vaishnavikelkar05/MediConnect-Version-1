package com.mediconnect.repository;

import com.mediconnect.entity.Blood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BloodRepository extends JpaRepository<Blood, Integer> {
    List<Blood> findByBloodGroupIgnoreCase(String bloodGroup);
    List<Blood> findByHospitalId(Integer hospitalId);
}
