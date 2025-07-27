package com.zidio.auth.controller;

import com.zidio.auth.dto.ApplicationRequest;
import com.zidio.auth.dto.ApplicationResponse;
import com.zidio.auth.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    public ApplicationResponse apply(@RequestBody ApplicationRequest request) {
        return applicationService.apply(request);
    }

    @GetMapping("/student/{email}")
    public List<ApplicationResponse> getByStudentEmail(@PathVariable String email) {
        return applicationService.getApplicationsByStudent(email);
    }

    @GetMapping("/job/{jobId}")
    public List<ApplicationResponse> getByJobId(@PathVariable Long jobId) {
        return applicationService.getApplicationsByJob(jobId);
    }
}
