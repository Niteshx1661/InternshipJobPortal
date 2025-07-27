package com.zidio.auth.paidstatus.controller;

import com.zidio.auth.paidstatus.service.PaidStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paidstatus")
public class PaidStatusController {

    @Autowired
    private PaidStatusService paidStatusService;

    @PostMapping("/mark-paid")
    public ResponseEntity<String> markUserAsPaid(@RequestParam String email) {
        paidStatusService.setPaid(email);
        return ResponseEntity.ok("User marked as paid.");
    }

    @GetMapping("/check")
    public ResponseEntity<String> checkPaidStatus(@RequestParam String email) {
        boolean isPaid = paidStatusService.isUserPaid(email);
        return ResponseEntity.ok(isPaid ? "User has paid." : "User has not paid.");
    }
}
