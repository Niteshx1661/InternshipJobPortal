import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';
import { ROLES } from '../utils/roleHelpers';

// Layouts
import StudentLayout from '../layouts/StudentLayout';
import RecruiterLayout from '../layouts/RecruiterLayout';
import AdminLayout from '../layouts/AdminLayout';

// Common Pages
import Home from '../pages/common/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';
import Unauthorized from '../pages/common/Unauthorized';
import NotFound from '../pages/common/NotFound';

// Student Pages
import StudentDashboard from '../pages/student/Dashboard';
import StudentProfile from '../pages/student/Profile';
import StudentJobs from '../pages/student/Jobs';
import StudentJobDetails from '../pages/student/JobDetails';
import StudentApplications from '../pages/student/Applications';
import StudentBookmarks from '../pages/student/Bookmarks';
import StudentCharts from '../pages/student/Charts';
import StudentChartHistory from '../pages/student/ChartHistory';
import StudentMessages from '../pages/student/Messages';
import StudentResumeBuilder from '../pages/student/ResumeBuilder';

// Recruiter Pages
import RecruiterDashboard from '../pages/recruiter/Dashboard';
import RecruiterProfile from '../pages/recruiter/Profile';
import RecruiterPostJob from '../pages/recruiter/PostJob';
import RecruiterJobs from '../pages/recruiter/Jobs';
import RecruiterJobDetails from '../pages/recruiter/JobDetails';
import RecruiterApplicants from '../pages/recruiter/Applicants';
import RecruiterMessages from '../pages/recruiter/Messages';
import RecruiterBookmarks from '../pages/recruiter/Bookmarks';
import RecruiterCharts from '../pages/recruiter/Charts';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminUserDetails from '../pages/admin/UserDetails';
import AdminJobs from '../pages/admin/Jobs';
import AdminContent from '../pages/admin/Content';
import AdminAnalytics from '../pages/admin/Analytics';
import AdminUploads from '../pages/admin/Uploads';
import AdminSettings from '../pages/admin/Settings';

const AppRouter = () => {
  const { isAuthenticated, user } = useAuth();

  const getDefaultRoute = () => {
    if (!isAuthenticated) return '/';
    
    switch (user?.role) {
      case ROLES.STUDENT:
        return '/student/dashboard';
      case ROLES.RECRUITER:
        return '/recruiter/dashboard';
      case ROLES.ADMIN:
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Student Routes */}
        <Route
          path="/student/*"
          element={
            <PrivateRoute requiredRole={ROLES.STUDENT}>
              <StudentLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="jobs" element={<StudentJobs />} />
          <Route path="jobs/:id" element={<StudentJobDetails />} />
          <Route path="applications" element={<StudentApplications />} />
          <Route path="bookmarks" element={<StudentBookmarks />} />
          <Route path="charts" element={<StudentCharts />} />
          <Route path="chart-history" element={<StudentChartHistory />} />
          <Route path="messages" element={<StudentMessages />} />
          <Route path="resume-builder" element={<StudentResumeBuilder />} />
        </Route>

        {/* Recruiter Routes */}
        <Route
          path="/recruiter/*"
          element={
            <PrivateRoute requiredRole={ROLES.RECRUITER}>
              <RecruiterLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="profile" element={<RecruiterProfile />} />
          <Route path="post-job" element={<RecruiterPostJob />} />
          <Route path="jobs" element={<RecruiterJobs />} />
          <Route path="jobs/:id" element={<RecruiterJobDetails />} />
          <Route path="applicants/:id" element={<RecruiterApplicants />} />
          <Route path="messages" element={<RecruiterMessages />} />
          <Route path="bookmarks" element={<RecruiterBookmarks />} />
          <Route path="charts" element={<RecruiterCharts />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute requiredRole={ROLES.ADMIN}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="user/:id" element={<AdminUserDetails />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="uploads" element={<AdminUploads />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Default redirect based on authentication and role */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;