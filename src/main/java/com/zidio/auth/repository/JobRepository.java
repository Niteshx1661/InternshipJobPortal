package com.zidio.auth.repository;

import com.zidio.auth.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByTitle(String title);
    List<Job> findByCompanyName(String companyName);
}
