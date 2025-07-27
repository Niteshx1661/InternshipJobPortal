package com.zidio.auth.controller;

import com.zidio.auth.dto.UserDto;
import com.zidio.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userprofile")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/registerstudprofile")
    public ResponseEntity<String> saveStudProfile(@RequestBody UserDto dto) {
        return ResponseEntity.ok(userService.createOrUpdate(dto));
    }


    @GetMapping("/profile/{email}")
    public ResponseEntity<UserDto> get(@PathVariable String email) {
        return ResponseEntity.ok(userService.getProfile(email));
    }
}
