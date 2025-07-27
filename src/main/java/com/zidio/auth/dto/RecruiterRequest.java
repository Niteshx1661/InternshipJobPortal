package com.zidio.auth.dto;

public class RecruiterRequest {

    private String companyName;
    private String recruiterEmail;
    private String recruiterName;
    private String designation;

    // Getters and Setters
    public String getCompanyName() {
        return companyName;
    }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRecruiterEmail() {
        return recruiterEmail;
    }
    public void setRecruiterEmail(String recruiterEmail) {
        this.recruiterEmail = recruiterEmail;
    }

    public String getRecruiterName() {
        return recruiterName;
    }
    public void setRecruiterName(String recruiterName) {
        this.recruiterName = recruiterName;
    }

    public String getDesignation() {
        return designation;
    }
    public void setDesignation(String designation) {
        this.designation = designation;
    }
}
