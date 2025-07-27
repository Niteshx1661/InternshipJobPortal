package com.zidio.auth.service;

import com.zidio.auth.dto.JobRequest;
import com.zidio.auth.entity.Job;
import com.zidio.auth.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public String jobPost(JobRequest request) {
        Job job = new Job();
        job.setTitle(request.title);
        job.setDescription(request.description);
        job.setCompanyName(request.companyName);
        job.setLocation(request.location);
        job.setJobType(request.jobType);
        job.setDuration(request.duration);
        job.setSkills(request.skills);

        jobRepository.save(job);
        return "Job post saved";
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Job> searchByTitle(String title) {
        return jobRepository.findByTitle(title);
    }

    public List<Job> searchByCompanyName(String companyName) {
        return jobRepository.findByCompanyName(companyName);
    }
}
