package com.zidio.auth.Subscription.controller;

import com.zidio.auth.Subscription.entity.Subscription;
import com.zidio.auth.Subscription.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/subscribe")
    public ResponseEntity<String> subscribeUser(@RequestParam String email,
                                                @RequestParam String plan,
                                                @RequestParam int durationDays) {
        Subscription subscription = subscriptionService.subscribeUser(email, plan, durationDays);
        return ResponseEntity.ok("User subscribed successfully: " + subscription.getPlanName());
    }

    @GetMapping("/status")
    public ResponseEntity<String> checkStatus(@RequestParam String email) {
        boolean active = subscriptionService.isUserSubscribed(email);
        return ResponseEntity.ok(active ? "Subscription Active" : "Subscription Inactive");
    }

    @GetMapping("/details")
    public ResponseEntity<?> getDetails(@RequestParam String email) {
        Optional<Subscription> subscription = subscriptionService.getUserSubscription(email);
        return subscription.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
