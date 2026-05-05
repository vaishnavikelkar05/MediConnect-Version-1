package com.mediconnect.controller;

import com.mediconnect.dto.RecommendRequest;
import com.mediconnect.dto.RecommendResponse;
import com.mediconnect.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class RecommendController {

    @Autowired
    private RecommendationService recommendationService;

    @PostMapping("/recommend-specialist")
    public RecommendResponse recommendSpecialist(@RequestBody RecommendRequest request) {
        return recommendationService.recommend(request);
    }
}
