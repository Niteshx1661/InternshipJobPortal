package com.zidio.auth.dto;

public class ApplicationResponse {
    public Long id;
    public String studentEmail;
    public Long jobId;
    public String status;

    public ApplicationResponse(Long id, String studentEmail, Long jobId, String status) {
        this.id = id;
        this.studentEmail = studentEmail;
        this.jobId = jobId;
        this.status = status;
    }
}
