package com.zidio.auth.repository;

import com.zidio.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
