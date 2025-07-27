package com.zidio.auth.analytics.controller;

import com.zidio.auth.analytics.entity.Analytics;
import com.zidio.auth.analytics.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @PostMapping("/log")
    public ResponseEntity<String> logEvent(@RequestParam String email,
                                           @RequestParam String eventType) {
        analyticsService.logEvent(email, eventType);
        return ResponseEntity.ok("Event logged successfully");
    }

    @GetMapping("/user")
    public ResponseEntity<List<Analytics>> getUserAnalytics(@RequestParam String email) {
        return ResponseEntity.ok(analyticsService.getUserAnalytics(email));
    }
}
