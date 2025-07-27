package com.zidio.auth.analytics.repository;

import com.zidio.auth.analytics.entity.Analytics;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnalyticsRepository extends JpaRepository<Analytics, Long> {
    List<Analytics> findByUserEmail(String email);
}
