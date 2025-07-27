import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Briefcase,
  FileText,
  Bookmark,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Applications Sent',
      value: '12',
      change: '+3 this week',
      icon: FileText,
      color: 'bg-blue-500',
      changeColor: 'text-green-600'
    },
    {
      title: 'Job Bookmarks',
      value: '8',
      change: '+2 new',
      icon: Bookmark,
      color: 'bg-yellow-500',
      changeColor: 'text-green-600'
    },
    {
      title: 'Profile Views',
      value: '45',
      change: '+12 this month',
      icon: Users,
      color: 'bg-green-500',
      changeColor: 'text-green-600'
    },
    {
      title: 'Response Rate',
      value: '25%',
      change: '+5% improvement',
      icon: TrendingUp,
      color: 'bg-purple-500',
      changeColor: 'text-green-600'
    }
  ];

  const recentApplications = [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineer Intern',
      status: 'Under Review',
      appliedDate: '2024-01-15',
      statusColor: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Product Manager Intern',
      status: 'Interview Scheduled',
      appliedDate: '2024-01-12',
      statusColor: 'text-blue-600 bg-blue-100'
    },
    {
      id: 3,
      company: 'Amazon',
      position: 'Data Analyst Intern',
      status: 'Accepted',
      appliedDate: '2024-01-10',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: 4,
      company: 'Meta',
      position: 'UX Designer Intern',
      status: 'Rejected',
      appliedDate: '2024-01-08',
      statusColor: 'text-red-600 bg-red-100'
    }
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'Spotify',
      location: 'New York, NY',
      type: 'Internship',
      posted: '2 days ago',
      match: '95%'
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'Netflix',
      location: 'Los Angeles, CA',
      type: 'Internship',
      posted: '1 week ago',
      match: '88%'
    },
    {
      id: 3,
      title: 'Marketing Intern',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      type: 'Internship',
      posted: '3 days ago',
      match: '82%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your job search today.
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              to="/student/jobs"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Browse Jobs
            </Link>
            <Link
              to="/student/profile"
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm ${stat.changeColor}`}>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
              <Link
                to="/student/applications"
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{application.position}</h3>
                    <p className="text-sm text-gray-600">{application.company}</p>
                    <p className="text-xs text-gray-500 mt-1">Applied {application.appliedDate}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${application.statusColor}`}>
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
              <Link
                to="/student/jobs"
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <p className="text-xs text-gray-500 mt-1">{job.location} • {job.type}</p>
                      <p className="text-xs text-gray-500">{job.posted}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600">{job.match} match</span>
                      <Link
                        to={`/student/jobs/${job.id}`}
                        className="block mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/student/charts"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Upload Data</h3>
              <p className="text-sm text-gray-600">Create charts from Excel files</p>
            </div>
          </Link>
          
          <Link
            to="/student/resume-builder"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
          >
            <FileText className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Resume Builder</h3>
              <p className="text-sm text-gray-600">Create or update your resume</p>
            </div>
          </Link>
          
          <Link
            to="/student/messages"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
          >
            <Users className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Messages</h3>
              <p className="text-sm text-gray-600">Connect with recruiters</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;