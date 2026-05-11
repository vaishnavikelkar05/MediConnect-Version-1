package com.mediconnect.repository;

import com.mediconnect.entity.AmbulanceService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AmbulanceServiceRepository extends JpaRepository<AmbulanceService, Integer> {
    List<AmbulanceService> findByAvailabilityStatusIgnoreCase(String availabilityStatus);
}
