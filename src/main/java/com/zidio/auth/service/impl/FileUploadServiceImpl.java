package com.zidio.auth.service.impl;

import com.zidio.auth.service.FileUploadService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileUploadServiceImpl implements FileUploadService {

    @Value("${upload.path}")
    private String uploadDir;

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String contentType = file.getContentType();
            if (!contentType.equals("image/png") &&
                !contentType.equals("image/jpeg") &&
                !contentType.equals("application/pdf")) {
                return "Only PNG, JPEG, and PDF files are allowed.";
            }

            String originalFileName = file.getOriginalFilename();
            String uniqueFileName = System.currentTimeMillis() + "_" + originalFileName;
            String filePath = uploadDir + File.separator + uniqueFileName;

            file.transferTo(new File(filePath));
            return uniqueFileName;
        } catch (IOException e) {
            return "File upload failed: " + e.getMessage();
        }
    }

    @Override
    public Resource downloadFile(String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return null;
            }

            return resource;
        } catch (MalformedURLException e) {
            return null;
        }
    }
}
