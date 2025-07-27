package com.zidio.auth.payment.controller;

import com.zidio.auth.payment.entity.Payment;
import com.zidio.auth.payment.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/pay")
    public ResponseEntity<Payment> makePayment(@RequestParam String email, @RequestParam Double amount) {
        return ResponseEntity.ok(paymentService.makePayment(email, amount));
    }

    @GetMapping("/history")
    public ResponseEntity<List<Payment>> getPayments(@RequestParam String email) {
        return ResponseEntity.ok(paymentService.getUserPayments(email));
    }
}
