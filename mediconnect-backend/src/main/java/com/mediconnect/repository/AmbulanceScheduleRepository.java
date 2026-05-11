package com.mediconnect.repository;

import com.mediconnect.entity.AmbulanceSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AmbulanceScheduleRepository extends JpaRepository<AmbulanceSchedule, Integer> {
    List<AmbulanceSchedule> findByAmbulanceAmbulanceId(Integer ambulanceId);
}
