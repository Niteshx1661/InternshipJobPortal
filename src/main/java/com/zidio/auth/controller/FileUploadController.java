package com.zidio.auth.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    @Value("${upload.path}")
    private String uploadDir;

    // 🔼 Upload Endpoint
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // ✅ Ensure upload directory exists
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            // 🔒 Restrict file types
            String contentType = file.getContentType();
            if (!contentType.equals("image/png") &&
                !contentType.equals("image/jpeg") &&
                !contentType.equals("application/pdf")) {
                return ResponseEntity.badRequest().body("Only PNG, JPEG, and PDF files are allowed.");
            }

            // 📂 Create unique filename
            String originalFileName = file.getOriginalFilename();
            String uniqueFileName = System.currentTimeMillis() + "_" + originalFileName;
            String filePath = uploadDir + File.separator + uniqueFileName;

            // 💾 Save file
            file.transferTo(new File(filePath));

            return ResponseEntity.ok("File uploaded successfully as: " + uniqueFileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File upload failed: " + e.getMessage());
        }
    }

    // ⬇️ Download Endpoint
    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}









// package com.zidio.auth.controller;

// import com.zidio.auth.service.FileUploadService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.core.io.Resource;
// import org.springframework.http.*;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// @RestController
// @RequestMapping("/api/files")
// public class FileUploadController {

//     private final FileUploadService fileUploadService;

//     @Autowired
//     public FileUploadController(FileUploadService fileUploadService) {
//         this.fileUploadService = fileUploadService;
//     }

//     // 🔼 Upload Endpoint
//     @PostMapping("/upload")
//     public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
//         String result = fileUploadService.uploadFile(file);
//         if (result.startsWith("Only") || result.startsWith("File upload failed")) {
//             return ResponseEntity.badRequest().body(result);
//         }
//         return ResponseEntity.ok("File uploaded successfully as: " + result);
//     }

//     // ⬇️ Download Endpoint
//     @GetMapping("/download/{filename}")
//     public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
//         Resource resource = fileUploadService.downloadFile(filename);

//         if (resource == null) {
//             return ResponseEntity.notFound().build();
//         }

//         return ResponseEntity.ok()
//                 .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                 .header(HttpHeaders.CONTENT_DISPOSITION,
//                         "attachment; filename=\"" + resource.getFilename() + "\"")
//                 .body(resource);
//     }
// }






// package com.zidio.auth.controller;

// import com.zidio.auth.service.FileUploadService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.core.io.Resource;
// import org.springframework.http.*;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// @RestController
// @RequestMapping("/api/files")
// public class FileUploadController {

//     @Autowired
//     private FileUploadService fileUploadService;

//     @PostMapping("/upload")
//     public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
//         String result = fileUploadService.uploadFile(file);
//         if (result.startsWith("Only") || result.startsWith("File upload failed")) {
//             return ResponseEntity.badRequest().body(result);
//         }
//         return ResponseEntity.ok("File uploaded successfully as: " + result);
//     }

//     @GetMapping("/download/{filename}")
//     public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
//         Resource resource = fileUploadService.downloadFile(filename);
//         if (resource == null) {
//             return ResponseEntity.notFound().build();
//         }
//         return ResponseEntity.ok()
//                 .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                 .header(HttpHeaders.CONTENT_DISPOSITION,
//                         "attachment; filename=\"" + resource.getFilename() + "\"")
//                 .body(resource);
//     }
// }
