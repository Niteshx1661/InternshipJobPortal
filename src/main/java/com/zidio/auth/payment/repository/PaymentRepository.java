package com.zidio.auth.payment.repository;

import com.zidio.auth.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserEmail(String userEmail);
}
