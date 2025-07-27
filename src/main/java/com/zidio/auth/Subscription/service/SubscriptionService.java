// package com.zidio.auth.Subscription.service;

// import com.zidio.auth.Subscription.entity.Subscription;
// import com.zidio.auth.Subscription.repository.SubscriptionRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.time.LocalDate;
// import java.util.Optional;

// @Service
// public class SubscriptionService {

//     @Autowired
//     private SubscriptionRepository subscriptionRepository;

//     public Subscription subscribeUser(String email, String planName, int durationInDays) {
//         Subscription subscription = new Subscription();
//         subscription.setUserEmail(email);
//         subscription.setPlanName(planName);
//         subscription.setStartDate(LocalDate.now());
//         subscription.setEndDate(LocalDate.now().plusDays(durationInDays));
//         subscription.setActive(true);
//         return subscriptionRepository.save(subscription);
//     }

//     public Optional<Subscription> getUserSubscription(String email) {
//         return subscriptionRepository.findByUserEmail(email);
//     }

//     public boolean isUserSubscribed(String email) {
//         Optional<Subscription> subOpt = subscriptionRepository.findByUserEmail(email);
//         if (subOpt.isEmpty()) return false;

//         Subscription subscription = subOpt.get();
//         boolean isActive = subscription.getEndDate().isAfter(LocalDate.now());
//         subscription.setActive(isActive);
//         subscriptionRepository.save(subscription);
//         return isActive;
//     }
// }





package com.zidio.auth.Subscription.service;

import com.zidio.auth.Subscription.entity.Subscription;
import com.zidio.auth.Subscription.repository.SubscriptionRepository;
import com.zidio.auth.dto.EmailRequest;
import com.zidio.auth.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private NotificationService notificationService;

    public Subscription subscribeUser(String email, String planName, int durationInDays) {
        Subscription subscription = new Subscription();
        subscription.setUserEmail(email);
        subscription.setPlanName(planName);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(LocalDate.now().plusDays(durationInDays));
        subscription.setActive(true);

        Subscription savedSubscription = subscriptionRepository.save(subscription);

        // 📨 Send confirmation email
        String subject = "Subscription Activated";
        String body = "Dear user,\n\nYour subscription to the " + planName + " plan is now active.\n"
                + "Start Date: " + savedSubscription.getStartDate() + "\n"
                + "End Date: " + savedSubscription.getEndDate() + "\n\nThank you for subscribing!";
        notificationService.sendMail(new EmailRequest(email, subject, body));

        return savedSubscription;
    }

    public Optional<Subscription> getUserSubscription(String email) {
        return subscriptionRepository.findByUserEmail(email);
    }

    public boolean isUserSubscribed(String email) {
        Optional<Subscription> subOpt = subscriptionRepository.findByUserEmail(email);
        if (subOpt.isEmpty()) return false;

        Subscription subscription = subOpt.get();
        boolean isActive = subscription.getEndDate().isAfter(LocalDate.now());
        subscription.setActive(isActive);
        subscriptionRepository.save(subscription);
        return isActive;
    }
}
