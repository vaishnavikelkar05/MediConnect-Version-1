package com.mediconnect.controller;

import com.mediconnect.entity.Blood;
import com.mediconnect.service.BloodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class BloodController {

    @Autowired
    private BloodService bloodService;

    @GetMapping("/blood")
    public List<Blood> getBlood(
            @RequestParam(required = false) String group,
            @RequestParam(required = false) Integer hospitalId) {

        if (group != null && !group.trim().isEmpty()) {
            return bloodService.getBloodByGroup(group);
        }
        if (hospitalId != null) {
            return bloodService.getBloodByHospital(hospitalId);
        }
        return bloodService.getAllBlood();
    }
}
