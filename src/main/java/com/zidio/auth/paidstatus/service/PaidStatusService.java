package com.zidio.auth.paidstatus.service;

import com.zidio.auth.paidstatus.entity.PaidStatus;
import com.zidio.auth.paidstatus.repository.PaidStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaidStatusService {

    @Autowired
    private PaidStatusRepository paidStatusRepository;

    public void setPaid(String email) {
        Optional<PaidStatus> existing = paidStatusRepository.findByUserEmail(email);
        PaidStatus status = existing.orElse(new PaidStatus());
        status.setUserEmail(email);
        status.setPaid(true);
        paidStatusRepository.save(status);
    }

    public boolean isUserPaid(String email) {
        return paidStatusRepository.findByUserEmail(email)
                .map(PaidStatus::isPaid)
                .orElse(false);
    }
}
