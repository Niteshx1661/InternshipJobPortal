package com.zidio.auth.service;

import com.zidio.auth.dto.RecruiterRequest;
import com.zidio.auth.entity.Recruiter;
import com.zidio.auth.repository.RecruiterRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecruiterService {

    @Autowired
    private RecruiterRepository recruiterRepository;

    public RecruiterRequest saveRecruiter(RecruiterRequest request) {
        Recruiter recruiter = new Recruiter();
        /*recruiter.setCompanyName(request.companyName);
        recruiter.setRecruiterName(request.recruiterName);
        recruiter.setRecruiterEmail(request.recruiterEmail);
        recruiter.setDesignation(request.designation);*/
        recruiter.setCompanyName(request.getCompanyName());
        recruiter.setRecruiterName(request.getRecruiterName());
        recruiter.setRecruiterEmail(request.getRecruiterEmail());
        recruiter.setDesignation(request.getDesignation());


        Recruiter saved = recruiterRepository.save(recruiter);

        RecruiterRequest response = new RecruiterRequest();
        BeanUtils.copyProperties(saved, response);
        return response;
    }

    public List<RecruiterRequest> getAllRecruiters() {
        return recruiterRepository.findAll().stream().map(r -> {
            RecruiterRequest dto = new RecruiterRequest();
            BeanUtils.copyProperties(r, dto);
            return dto;
        }).collect(Collectors.toList());
    }

    public RecruiterRequest getByRecruiterEmail(String recruiterEmail) {
        Recruiter recruiter = recruiterRepository.findByRecruiterEmail(recruiterEmail);
        if (recruiter == null) throw new RuntimeException("Recruiter not found");

        RecruiterRequest dto = new RecruiterRequest();
        BeanUtils.copyProperties(recruiter, dto);
        return dto;
    }
}
