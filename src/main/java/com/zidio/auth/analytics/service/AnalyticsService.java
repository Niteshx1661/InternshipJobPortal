package com.zidio.auth.analytics.service;

import com.zidio.auth.analytics.entity.Analytics;
import com.zidio.auth.analytics.repository.AnalyticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AnalyticsService {

    @Autowired
    private AnalyticsRepository analyticsRepository;

    public void logEvent(String email, String eventType) {
        Analytics analytics = new Analytics();
        analytics.setUserEmail(email);
        analytics.setEventType(eventType);
        analytics.setEventDate(LocalDate.now());
        analyticsRepository.save(analytics);
    }

    public List<Analytics> getUserAnalytics(String email) {
        return analyticsRepository.findByUserEmail(email);
    }
}
