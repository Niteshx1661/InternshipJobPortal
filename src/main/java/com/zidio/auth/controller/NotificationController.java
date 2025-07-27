package com.zidio.auth.controller;

import com.zidio.auth.dto.EmailRequest;
import com.zidio.auth.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notify")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/email")
    public ResponseEntity<String> sendMail(@RequestBody EmailRequest request) {
        return ResponseEntity.ok(notificationService.sendMail(request));
    }
}
