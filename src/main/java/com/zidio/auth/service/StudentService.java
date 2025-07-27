package com.zidio.auth.service;

import com.zidio.auth.dto.StudentDto;
import com.zidio.auth.entity.Student;
import com.zidio.auth.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public String createOrUpdate(StudentDto dto) {
        Student student = studentRepository.findByEmail(dto.email).orElse(new Student());
        student.setName(dto.name);
        student.setEmail(dto.email);
        student.setCourse(dto.course);
        student.setUniversity(dto.university);
        student.setResumeUrl(dto.resumeUrl);

        studentRepository.save(student);
        return "Student profile saved";
    }

    public StudentDto getProfile(String email) {
        Student s = studentRepository.findByEmail(email).orElseThrow();
        StudentDto dto = new StudentDto();
        dto.name = s.getName();
        dto.email = s.getEmail();
        dto.course = s.getCourse();
        dto.university = s.getUniversity();
        dto.resumeUrl = s.getResumeUrl();
        return dto;
    }
}
