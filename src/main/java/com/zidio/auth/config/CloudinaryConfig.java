// package com.zidio.auth.config;

// import com.cloudinary.Cloudinary;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;

// import java.util.HashMap;
// import java.util.Map;

// @Configuration
// public class CloudinaryConfig {

//     @Value("${cloudinary.cloud_name}")
//     private String cloudName;

//     @Value("${cloudinary.api_key}")
//     private String apiKey;

//     @Value("${cloudinary.api_secret}")
//     private String apiSecret;

//     @Bean
//     public Cloudinary cloudinary() {
//         Map<String, String> config = new HashMap<>();
//         config.put("cloud_name", cloudName);
//         config.put("api_key", apiKey);
//         config.put("api_secret", apiSecret);
//         return new Cloudinary(config);
//     }
// }

// // package com.zidio.auth.config;

// // import com.cloudinary.Cloudinary;
// // import com.cloudinary.utils.ObjectUtils;
// // import org.springframework.context.annotation.Bean;
// // import org.springframework.context.annotation.Configuration;

// // import java.util.HashMap;
// // import java.util.Map;

// // @Configuration
// // public class CloudinaryConfig {

// //     @Bean
// //     public Cloudinary cloudinary() {
// //         Map<String, String> config = new HashMap<>();
// //         config.put("cloud_name", "dasundfmc");
// //         config.put("api_key", "162751362763761");
// //         config.put("api_secret", "mz-oy_H53n8Y0cVz_AWJuuPjbUc");
// //         return new Cloudinary(config);
// //     }
// // }

