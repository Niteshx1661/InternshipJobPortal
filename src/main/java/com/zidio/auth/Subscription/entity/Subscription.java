package com.zidio.auth.Subscription.entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    private String planName;

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean isActive;

    // Getters and Setters

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getUserEmail() { return userEmail; }

    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getPlanName() { return planName; }

    public void setPlanName(String planName) { this.planName = planName; }

    public LocalDate getStartDate() { return startDate; }

    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }

    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public boolean isActive() { return isActive; }

    public void setActive(boolean active) { isActive = active; }
}
