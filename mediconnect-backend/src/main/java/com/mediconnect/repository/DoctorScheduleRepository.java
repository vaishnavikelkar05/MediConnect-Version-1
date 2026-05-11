package com.mediconnect.repository;

import com.mediconnect.entity.DoctorSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, Integer> {
    List<DoctorSchedule> findByDoctorId(Integer doctorId);
}
