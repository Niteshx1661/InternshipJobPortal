import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Briefcase,
  GraduationCap,
  Building,
  Star,
  MessageSquare,
  Download
} from 'lucide-react';

const AdminUserDetails = () => {
  const { id } = useParams();
  const [userStatus, setUserStatus] = useState('Active');

  // Mock user data - in real app, fetch based on ID
  const user = {
    id: parseInt(id),
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    role: 'STUDENT',
    status: userStatus,
    joinDate: '2024-01-15',
    lastLogin: '2024-01-22',
    verified: true,
    flagged: false,
    avatar: '👩‍🎓',
    // Student specific data
    university: 'Stanford University',
    major: 'Computer Science',
    graduationYear: '2025',
    gpa: '3.9',
    applications: 12,
    // Additional data
    profileViews: 45,
    resumeUploaded: true,
    skills: ['JavaScript', 'React', 'Python', 'Machine Learning'],
    bio: 'Passionate computer science student with experience in web development and data analysis. Looking for internship opportunities to apply my skills in a real-world environment.'
  };

  const handleStatusChange = (newStatus) => {
    setUserStatus(newStatus);
    console.log(`Changing user status to: ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100';
      case 'Suspended':
        return 'text-red-600 bg-red-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'STUDENT':
        return 'text-blue-600 bg-blue-100';
      case 'RECRUITER':
        return 'text-green-600 bg-green-100';
      case 'ADMIN':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const activityLog = [
    {
      id: 1,
      action: 'Profile Updated',
      timestamp: '2024-01-22 10:30 AM',
      details: 'Updated skills and bio section'
    },
    {
      id: 2,
      action: 'Job Application',
      timestamp: '2024-01-21 2:15 PM',
      details: 'Applied to Software Engineer Intern at Google'
    },
    {
      id: 3,
      action: 'Resume Upload',
      timestamp: '2024-01-20 4:45 PM',
      details: 'Uploaded new resume document'
    },
    {
      id: 4,
      action: 'Login',
      timestamp: '2024-01-20 9:00 AM',
      details: 'Logged in from San Francisco, CA'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div>
        <Link
          to="/admin/users"
          className="inline-flex items-center text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Users
        </Link>
      </div>

      {/* User Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl">
              {user.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
                {user.verified && (
                  <CheckCircle className="h-5 w-5 text-green-500" title="Verified" />
                )}
                {user.flagged && (
                  <AlertTriangle className="h-5 w-5 text-red-500" title="Flagged" />
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{user.location}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Joined {user.joinDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Last login {user.lastLogin}</span>
                  </div>
                  {user.university && (
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      <span>{user.university}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </button>
            
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Edit className="h-5 w-5 text-gray-400" />
            </button>
            
            {user.status === 'Active' ? (
              <button
                onClick={() => handleStatusChange('Suspended')}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Ban className="h-4 w-4 mr-2" />
                Suspend User
              </button>
            ) : user.status === 'Suspended' ? (
              <button
                onClick={() => handleStatusChange('Active')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Activate User
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Profile */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
            
            {user.role === 'STUDENT' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">University</label>
                    <p className="text-gray-900">{user.university}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Major</label>
                    <p className="text-gray-900">{user.major}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                    <p className="text-gray-900">{user.graduationYear}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">GPA</label>
                    <p className="text-gray-900">{user.gpa}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <p className="text-gray-700">{user.bio}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {activityLog.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{activity.action}</h3>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h3>
            <div className="space-y-4">
              {user.role === 'STUDENT' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applications:</span>
                    <span className="font-medium text-gray-900">{user.applications}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profile Views:</span>
                    <span className="font-medium text-gray-900">{user.profileViews}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resume:</span>
                    <span className={`font-medium ${user.resumeUploaded ? 'text-green-600' : 'text-red-600'}`}>
                      {user.resumeUploaded ? 'Uploaded' : 'Not Uploaded'}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </button>
              
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </button>
              
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
              
              {!user.flagged ? (
                <button className="w-full flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Flag User
                </button>
              ) : (
                <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Remove Flag
                </button>
              )}
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Email Verified:</span>
                <span className={`font-medium ${user.verified ? 'text-green-600' : 'text-red-600'}`}>
                  {user.verified ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">2FA Enabled:</span>
                <span className="font-medium text-red-600">No</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Login Attempts:</span>
                <span className="font-medium text-gray-900">0 failed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetails;