import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Briefcase,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  MessageSquare
} from 'lucide-react';

const RecruiterDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Active Job Posts',
      value: '8',
      change: '+2 this month',
      icon: Briefcase,
      color: 'bg-blue-500',
      changeColor: 'text-green-600'
    },
    {
      title: 'Total Applications',
      value: '156',
      change: '+24 this week',
      icon: Users,
      color: 'bg-green-500',
      changeColor: 'text-green-600'
    },
    {
      title: 'Profile Views',
      value: '89',
      change: '+15 this month',
      icon: Eye,
      color: 'bg-purple-500',
      changeColor: 'text-green-600'
    },
    {
      title: 'Response Rate',
      value: '78%',
      change: '+8% improvement',
      icon: TrendingUp,
      color: 'bg-yellow-500',
      changeColor: 'text-green-600'
    }
  ];

  const recentApplications = [
    {
      id: 1,
      candidate: 'Sarah Johnson',
      position: 'Software Engineer Intern',
      appliedDate: '2024-01-20',
      status: 'Under Review',
      statusColor: 'text-yellow-600 bg-yellow-100',
      experience: '2 years',
      university: 'MIT'
    },
    {
      id: 2,
      candidate: 'Michael Chen',
      position: 'Product Manager Intern',
      appliedDate: '2024-01-19',
      status: 'Interview Scheduled',
      statusColor: 'text-blue-600 bg-blue-100',
      experience: '1 year',
      university: 'Stanford'
    },
    {
      id: 3,
      candidate: 'Emily Davis',
      position: 'Data Analyst Intern',
      appliedDate: '2024-01-18',
      status: 'Shortlisted',
      statusColor: 'text-green-600 bg-green-100',
      experience: '1.5 years',
      university: 'UC Berkeley'
    },
    {
      id: 4,
      candidate: 'David Wilson',
      position: 'UX Designer Intern',
      appliedDate: '2024-01-17',
      status: 'Rejected',
      statusColor: 'text-red-600 bg-red-100',
      experience: '6 months',
      university: 'NYU'
    }
  ];

  const activeJobs = [
    {
      id: 1,
      title: 'Software Engineer Intern',
      applications: 45,
      posted: '2024-01-15',
      deadline: '2024-02-15',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Product Manager Intern',
      applications: 32,
      posted: '2024-01-12',
      deadline: '2024-02-12',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Data Analyst Intern',
      applications: 28,
      posted: '2024-01-10',
      deadline: '2024-02-10',
      status: 'Active'
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
              Here's an overview of your recruitment activities.
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              to="/recruiter/post-job"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Link>
            <Link
              to="/recruiter/jobs"
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Manage Jobs
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
                to="/recruiter/jobs"
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
                    <h3 className="font-medium text-gray-900">{application.candidate}</h3>
                    <p className="text-sm text-gray-600">{application.position}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-xs text-gray-500">{application.university}</p>
                      <p className="text-xs text-gray-500">{application.experience} experience</p>
                      <p className="text-xs text-gray-500">Applied {application.appliedDate}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${application.statusColor}`}>
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Job Posts */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Active Job Posts</h2>
              <Link
                to="/recruiter/jobs"
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.applications} applications</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-xs text-gray-500">Posted {job.posted}</p>
                        <p className="text-xs text-gray-500">Deadline {job.deadline}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600">{job.status}</span>
                      <Link
                        to={`/recruiter/jobs/${job.id}`}
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
            to="/recruiter/post-job"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Plus className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Post New Job</h3>
              <p className="text-sm text-gray-600">Create a new job posting</p>
            </div>
          </Link>
          
          <Link
            to="/recruiter/messages"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
          >
            <MessageSquare className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Messages</h3>
              <p className="text-sm text-gray-600">Connect with candidates</p>
            </div>
          </Link>
          
          <Link
            to="/recruiter/charts"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
          >
            <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600">View recruitment metrics</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;