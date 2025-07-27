package com.zidio.auth.repository;

import com.zidio.auth.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    Optional<Application> findByStudentEmailAndJobId(String studentEmail, Long jobId);
    List<Application> findByStudentEmail(String studentEmail);
    List<Application> findByJobId(Long jobId);
}
