package com.zidio.auth.service;

import com.zidio.auth.dto.ApplicationRequest;
import com.zidio.auth.dto.ApplicationResponse;
import com.zidio.auth.entity.Application;
import com.zidio.auth.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public ApplicationResponse apply(ApplicationRequest request) {
        Optional<Application> existing = applicationRepository.findByStudentEmailAndJobId(request.studentEmail, request.jobId);
        if (existing.isPresent()) {
            throw new RuntimeException("Already applied");
        }

        Application application = Application.builder()
                .studentEmail(request.studentEmail)
                .jobId(request.jobId)
                .status("applied")
                .build();

        Application saved = applicationRepository.save(application);
        return new ApplicationResponse(saved.getId(), saved.getStudentEmail(), saved.getJobId(), saved.getStatus());
    }

    public List<ApplicationResponse> getApplicationsByStudent(String studentEmail) {
        return applicationRepository.findByStudentEmail(studentEmail)
                .stream()
                .map(a -> new ApplicationResponse(a.getId(), a.getStudentEmail(), a.getJobId(), a.getStatus()))
                .collect(Collectors.toList());
    }

    public List<ApplicationResponse> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId)
                .stream()
                .map(a -> new ApplicationResponse(a.getId(), a.getStudentEmail(), a.getJobId(), a.getStatus()))
                .collect(Collectors.toList());
    }
}
