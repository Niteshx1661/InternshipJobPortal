package com.zidio.auth.Subscription.repository;

import com.zidio.auth.Subscription.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByUserEmail(String email);
}
