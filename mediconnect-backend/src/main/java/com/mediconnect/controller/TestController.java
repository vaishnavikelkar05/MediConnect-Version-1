package com.mediconnect.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TestController {

    @GetMapping("/test")
    public Map<String, String> test() {
        return Map.of("message", "Backend working");
    }
}
