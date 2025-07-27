package com.zidio.auth.service;

import java.util.Optional;
import com.zidio.auth.dto.EmailRequest;
import com.zidio.auth.dto.LoginRequest;
import com.zidio.auth.dto.RegisterRequest;
import com.zidio.auth.entity.User;
import com.zidio.auth.repository.UserRepository;
import com.zidio.auth.config.JWTUtil;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private NotificationService notificationService;



    public User register(RegisterRequest request) {
    User user = new User();
    user.setName(request.name);
    user.setEmail(request.email);
    // Encrypt password before saving
    String encodedPassword = passwordEncoder.encode(request.password);
    user.setPassword(encodedPassword);
    //user.setPassword(passwordEncoder.encode(request.password));
    user.setRole(request.role);
    user.setEnabled(false);

    // generate token
    String token = UUID.randomUUID().toString();
    user.setVerificationToken(token);

    userRepository.save(user);

    // send verification email
    String link = "http://localhost:8080/api/auth/verify?token=" + token;
    EmailRequest email = new EmailRequest();
    email.setTo(user.getEmail());
    email.setSubject("Verify your account");
    email.setBody("Click the link to activate your account: " + link);
    notificationService.sendMail(email);

    return user;
}

public boolean verifyUser(String token) {
    Optional<User> optionalUser = userRepository.findAll().stream()
            .filter(u -> token.equals(u.getVerificationToken()))
            .findFirst();

    if (optionalUser.isPresent()) {
        User user = optionalUser.get();
        user.setEnabled(true);
        user.setVerificationToken(null);
        userRepository.save(user);
        return true;
    }
    return false;
}

public String loginOld(LoginRequest request) {
    User user = userRepository.findByEmail(request.email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!user.isEnabled()) throw new RuntimeException("Please verify your email before login.");
    if (!passwordEncoder.matches(request.password, user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }
    // return jwtUtil.generateToken(user.getEmail());
    return jwtUtil.generateToken(user.getEmail(), user.getRole());

}

public String login(LoginRequest request) {
    User user = userRepository.findByEmail(request.email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (!user.isEnabled()) throw new RuntimeException("Please verify your email before login.");
    if (!passwordEncoder.matches(request.password, user.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    return jwtUtil.generateToken(user.getEmail(), user.getRole().toUpperCase()); // include role
}


public boolean validateToken(String token) {
    return jwtUtil.validateToken(token); // assuming jwtUtil is autowired
}

public boolean activateEmail(String token) {
        return userRepository.findByVerificationToken(token).map(user -> {
            user.setEnabled(true);
            user.setVerificationToken(null); // optional: remove token after use
            userRepository.save(user);
            return true;
        }).orElse(false);
    }


    // public User register(RegisterRequest request) {
    //     User user = new User();
    //     user.setName(request.name);
    //     user.setEmail(request.email);
    //     user.setPassword(passwordEncoder.encode(request.password));
    //     user.setRole(request.role);
    //    return userRepository.save(user);
    // }

    // public String login(LoginRequest request) {
    //     User user = userRepository.findByEmail(request.email)
    //             .orElseThrow(() -> new RuntimeException("User not found"));

    //     if (!passwordEncoder.matches(request.password, user.getPassword())) {
    //         throw new RuntimeException("Invalid password");
    //     }

    //     return jwtUtil.generateToken(user.getEmail());
    // }

    // public boolean validateToken(String token) {
    //     return jwtUtil.validateToken(token);
    // }


}

