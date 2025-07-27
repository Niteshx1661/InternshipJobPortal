package com.zidio.auth.controller;

import com.zidio.auth.dto.JobRequest;
import com.zidio.auth.entity.Job;
import com.zidio.auth.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping("/jobPost")
    public ResponseEntity<String> postJob(@RequestBody JobRequest request) {
        return ResponseEntity.ok(jobService.jobPost(request));
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/search/title/{title}")
    public ResponseEntity<List<Job>> searchByTitle(@PathVariable String title) {
        return ResponseEntity.ok(jobService.searchByTitle(title));
    }

    @GetMapping("/search/companyName/{companyName}")
    public ResponseEntity<List<Job>> searchByCompanyName(@PathVariable String companyName) {
        return ResponseEntity.ok(jobService.searchByCompanyName(companyName));
    }
}
