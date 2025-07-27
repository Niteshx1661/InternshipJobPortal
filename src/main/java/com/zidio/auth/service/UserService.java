package com.zidio.auth.service;

import com.zidio.auth.dto.EmailRequest;
import com.zidio.auth.dto.UserDto;
import com.zidio.auth.entity.User;
import com.zidio.auth.payment.entity.Payment;
import com.zidio.auth.repository.UserRepository;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepository ProfileRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String createOrUpdate(UserDto dto) {
        User profile = ProfileRepository.findByEmail(dto.email).orElse(new User());
        profile.setName(dto.name);
        profile.setEmail(dto.email);

        String encodedPassword = passwordEncoder.encode(dto.password);
        profile.setPassword(encodedPassword);

        
        profile.setEnabled(dto.enabled);
        String guid = java.util.UUID.randomUUID().toString();
        profile.setVerificationToken(guid);
        profile.setRole(dto.role);
        ProfileRepository.save(profile);


        // 📨 Send confirmation email
        String subject = "Account Creation Confirmation";
        String body = "Dear user,\n\nYour account is succesfully created."
                + " Thank you for registering with us. Kindly click on below link to activate your account.\n\n"
                + "http://localhost:8080/api/auth/activate?token=" + guid + "\n\nThank you!"
                + "\n\nBest regards,\nZidio Team";

        notificationService.sendMail(new EmailRequest(dto.email, subject, body));



        return "New student profile saved..";
    }

    public UserDto getProfile(String email) {
        User s = ProfileRepository.findByEmail(email).orElseThrow();
        UserDto dto = new UserDto();
        dto.name = s.getName();
        dto.email = s.getEmail();
        dto.password = s.getPassword();
        dto.role = s.getRole();
        return dto;
    }
}
