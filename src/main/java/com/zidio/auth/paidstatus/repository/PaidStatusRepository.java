package com.zidio.auth.paidstatus.repository;

import com.zidio.auth.paidstatus.entity.PaidStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaidStatusRepository extends JpaRepository<PaidStatus, Long> {
    Optional<PaidStatus> findByUserEmail(String email);
}
