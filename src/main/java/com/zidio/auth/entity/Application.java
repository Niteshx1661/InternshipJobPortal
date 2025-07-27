package com.zidio.auth.entity;

import javax.persistence.*;

@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentEmail;
    private Long jobId;
    private String status;

    // No-args constructor
    public Application() {}

    // All-args constructor
    public Application(Long id, String studentEmail, Long jobId, String status) {
        this.id = id;
        this.studentEmail = studentEmail;
        this.jobId = jobId;
        this.status = status;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public Long getJobId() {
        return jobId;
    }

    public String getStatus() {
        return status;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String studentEmail;
        private Long jobId;
        private String status;

        public Builder studentEmail(String email) {
            this.studentEmail = email;
            return this;
        }

        public Builder jobId(Long id) {
            this.jobId = id;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }

        public Application build() {
            Application app = new Application();
            app.setStudentEmail(this.studentEmail);
            app.setJobId(this.jobId);
            app.setStatus(this.status);
            return app;
        }
    }
}
