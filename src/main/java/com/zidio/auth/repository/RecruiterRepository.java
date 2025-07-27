package com.zidio.auth.repository;

import com.zidio.auth.entity.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterRepository extends JpaRepository<Recruiter, Long> {
    Recruiter findByRecruiterEmail(String recruiterEmail);
}
