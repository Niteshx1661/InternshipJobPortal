# 💼 **Zidio Connect – Job Portal System**

Zidio Connect is a comprehensive job portal web application developed as part of my internship project at Zidio Development. 
The platform facilitates seamless interaction between **students/job seekers** and **recruiters**, enabling them to register, manage their profiles, post and apply for jobs, and more.

This project is divided into two main modules:
- 🖥️ **Frontend**: React.js + TailwindCSS
- 🔧 **Backend**: Java Spring Boot + Spring Security + MySQL

---

## 📸 **Demo Preview**
🔗 [Click here to watch the demo video on LinkedIn](https://www.linkedin.com/posts/nitx-patil_zidioconnect-springboot-reactjs-activity-7355280348877934596-uQOP?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFBgtO8B0cGk7vK7WUI55kzith0grZh87Fg)

---

## 🚀 **Tech Stack**

### 🔹 Frontend
- React.js
- TailwindCSS
- Axios (API integration)
- React Router DOM

### 🔹 Backend
- Java Spring Boot
- Spring Security (Role-based access)
- JWT Authentication
- MySQL (database)
- JPA/Hibernate
- Lombok (for boilerplate reduction)
- JavaMailSender (Email Verification)
- Maven

### 🔹 Tools Used
- IntelliJ IDEA (backend)
- VS Code (frontend)
- Postman (API testing)
- Git & GitHub (Version control)

---

## 🧩 **Features**

### 👤 Authentication & Authorization
- Secure registration and login using JWT tokens.
- Email verification with activation link.
- Role-based access control using Spring Security (Student, Recruiter, Admin).
- Account activation logic before login is allowed.

### 📄 User Profile Management
- Register as Student or Recruiter with dedicated APIs.
- Create, update, and fetch user profile details (education, experience, contact, etc.).
- Role-specific profile APIs:
 - /userprofile/registerstudprofile
 - /userprofile/registerrecruiterprofile

### 💼 Job Management
- Recruiters can create and manage job listings.
- Students can search and apply for jobs.
- Role-based access to job APIs.
- Separate endpoints for students and recruiters.

### 📄 File Upload & Download
- Upload profile documents like resumes, certificates (PDF, DOCX, etc.).
- Download any uploaded files securely.
- File name uniqueness and extension restrictions implemented.

### 💳 Payment Integration
- Integrated payment API for premium feature access (e.g., job highlight or resume boost).
- Payments handled with REST APIs and test mode logic.

### 💡 Subscription Management
- APIs to enable or disable premium subscription for users.
- Check if a user is paid or free using paidStatus logic.
- Role-based restrictions for premium-only features.

### 📊 Analytics & Insights
- Admins and recruiters can view analytics:
 - Registered users
 - Applications per job
 - Subscription counts, etc.
- Designed to be scalable for adding charts and visual data.

### 📬 Notification System
- Users receive email verification links upon registration.
- Notifications for successful registration and password errors.
- Custom mail templates with Gmail SMTP configuration.
- JWT-based token validation

---

## 🛠️ **Project Setup Guide**

### 🔁 Prerequisites
- Node.js & npm
- Java 17 or higher
- Maven
- MySQL Server

---

### 🖥️ Frontend Setup (React)

```bash
# Clone the frontend branch
git clone -b Profile-Management-(Job-Portal)-Front-end-in-react-js https://github.com/Niteshx1661/InternshipJobPortal.git

cd InternshipJobPortal
npm install

# Start the development server
npm run dev
```
#### 📝Note - ⚠️ Make sure your backend is running on http://localhost:8080

---

### 🖥️ Backend Setup (Spring Boot)

```bash
# Clone backend branch
git clone -b Profile-Management-(Job-Portal)-Back-End-in-Java-API-and-MySQL https://github.com/Niteshx1661/InternshipJobPortal.git

cd InternshipJobPortal

# Set up MySQL database
# Create a database named: zidio_db

# Configure your DB username & password in `application.properties`

# Build and run the project
mvn clean install
mvn spring-boot:run
```

---

### 📬 Email Verification Setup
- Configured using Gmail SMTP
- Update these lines in application.properties:
```properties
spring.mail.username=your_gmail@gmail.com
spring.mail.password=your_app_password
```
#### 📝Note - ⚠️Make sure to enable "App Passwords" and 2FA on your Gmail account

---

## 📁 **Project Structure**

```bash
InternshipJobPortal/
├── zidio-frontend/   # React Frontend
└── zidio-auth1/      # Spring Boot Backend
```

---

## 🌐 **API Endpoints**
### 🔐 Authentication APIs
 - POST /api/auth/register
 - POST /api/auth/login
 - GET /api/auth/verify?token=...
 - POST /api/auth/resend-token?email=... (for resending activation email)
 - GET /api/auth/roles/{email} (to fetch user role by email)

### 👤 Student APIs
 - POST /userprofile/registerstudprofile
 - GET /students/profile/{email}
 - PUT /students/profile/update/{email}
 - GET /students/all (Admin only)
 - DELETE /students/profile/delete/{email} (Admin/Student access)

### 👨‍💼 Recruiter APIs
 - POST /userprofile/registerrecruiterprofile
 - GET /recruiters/profile/{email}
 - PUT /recruiters/profile/update/{email}
 - GET /recruiters/all (Admin only)
 - DELETE /recruiters/profile/delete/{email} (Admin/Recruiter access)

### 💼 Job APIs
 - POST /api/jobs/create (Recruiter only)
 - PUT /api/jobs/update/{jobId}
 - GET /api/jobs/getall (Public access)
 - GET /api/jobs/{jobId} (Get job details)
 - DELETE /api/jobs/delete/{jobId} (Recruiter only)
 - GET /api/jobs/by-recruiter/{email} (Recruiter's posted jobs)

### 📄 File Upload & Download APIs
 - POST /api/files/upload
 - GET /api/files/download/{filename}
 - GET /api/files/all (List all uploaded files)
 - File type filtering and duplicate filename resolution implemented

### 💳 Payment APIs
 - POST /api/payment/initiate
 - GET /api/payment/history/{email} (User’s payment history)
 - Test mode payments are supported using dummy credentials

### 💡 Subscription APIs
 - POST /api/subscription/activate
 - GET /api/subscription/status/{email} (Returns: FREE / PAID)
 - Premium features restricted via role & subscription validation

### 📊 Analytics APIs
 - GET /api/analytics/user-counts (Students, Recruiters, Admins)
 - GET /api/analytics/job-counts
 - GET /api/analytics/subscription-summary (Paid vs Free)
 - GET /api/analytics/applications-per-job

---

## ✅ **Project Status**
✅ Feature-complete
✅ Tested with Postman & Frontend
✅ Fully working authentication with email verification

---

## 🤝 **Gratitude**
Special thanks to **Dr. Smruti Priya** Ma’am for exceptional guidance and mentorship throughout the internship.
Also thankful to the **Zidio Development** team for providing an opportunity to work on a real-world, production-grade project. This journey helped me understand how enterprise-level applications are planned, structured, and executed.

---

## 📎 **GitHub Branch Links**
- 🔗 [Frontend Branch](https://github.com/Niteshx1661/InternshipJobPortal/tree/Profile-Management-(Job-Portal)-Front-end-in-react-js)
- 🔗 [Backend Branch](https://github.com/Niteshx1661/InternshipJobPortal/tree/Profile-Management-(Job-Portal)-Back-End-in-Java-API-and-MySQL)

---

## 🧑‍💻**Developed By**
### **Nitesh Patil**
- 📧 [nitxpatil550@gmail.com](mailto:nitxpatil550@gmail.com)
- 🌐 [LinkedIn Profile](www.linkedin.com/in/nitx-patil)

---

## ⭐ Don’t forget to star the repo if you found it useful!


