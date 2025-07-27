package com.zidio.auth.controller;

import com.zidio.auth.config.JWTUtil;
import com.zidio.auth.dto.LoginRequest;
import com.zidio.auth.dto.RegisterRequest;
import com.zidio.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.zidio.auth.entity.User;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JWTUtil jwtUtil;

//     @PostMapping("/register")
// public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
//     // 1. Register the user
//     User user = authService.register(request);

//     // 2. Generate JWT token
//     String token = jwtUtil.generateToken(user.getEmail());

//     // 3. Return the token
//     return ResponseEntity.ok(token);
// }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        User user = authService.register(request);
        return ResponseEntity.ok("Registered successfully. Check your email to verify your account.");
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verify(@RequestParam String token) {
        boolean isVerified = authService.verifyUser(token);
        return isVerified ? ResponseEntity.ok("Account verified. You can now log in.")
                        : ResponseEntity.badRequest().body("Invalid or expired verification token.");
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }



    @GetMapping("/validate")
    public ResponseEntity<String> validate(@RequestParam String token) {
        boolean isValid = authService.validateToken(token);
        return isValid ? ResponseEntity.ok("Valid Token") : ResponseEntity.status(401).body("Invalid Token");
    }

    @GetMapping("/activate")
    public ResponseEntity<String> activateEmail(@RequestParam String token) {
        boolean activated = authService.activateEmail(token);
        if (activated) {
            return ResponseEntity.ok("Email successfully activated. You can now log in.");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }
    }
    }
