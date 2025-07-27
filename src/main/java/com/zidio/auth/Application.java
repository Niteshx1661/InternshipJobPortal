package com.zidio.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        
        SpringApplication.run(Application.class, args);
        
        System.out.println("\n✅ Server is running at: http://localhost:8080\n");
    
    }
}
