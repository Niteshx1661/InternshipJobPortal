import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Briefcase,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  FileText,
  Settings
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12% this month',
      icon: Users,
      color: 'bg-blue-500',
      changeColor: 'text-green-600'
    },
    {
      title: 'Active Jobs',
      value: '156',
      change: '+8 this week',
      icon: Briefcase,
      color: 'bg-green-500',
      changeColor: 'text-green-600'
    },
    {
      title: 'Platform Growth',
      value: '23%',
      change: '+5% from last month',
      icon: TrendingUp,
      color: 'bg-purple-500',
      changeColor: 'text-green-600'
    },
    {
      title: 'Security Issues',
      value: '3',
      change: '-2 resolved today',
      icon: Shield,
      color: 'bg-red-500',
      changeColor: 'text-green-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      message: 'New student registered: Sarah Johnson',
      timestamp: '5 minutes ago',
      icon: Users,
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      type: 'job_posted',
      message: 'Google posted a new Software Engineer position',
      timestamp: '15 minutes ago',
      icon: Briefcase,
      iconColor: 'text-green-600'
    },
    {
      id: 3,
      type: 'content_flagged',
      message: 'Job post flagged for review by automated system',
      timestamp: '1 hour ago',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600'
    },
    {
      id: 4,
      type: 'user_verified',
      message: 'Recruiter account verified: Microsoft HR Team',
      timestamp: '2 hours ago',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    },
    {
      id: 5,
      type: 'system_update',
      message: 'System maintenance completed successfully',
      timestamp: '3 hours ago',
      icon: Settings,
      iconColor: 'text-purple-600'
    }
  ];

  const pendingActions = [
    {
      id: 1,
      title: 'Review Flagged Content',
      description: '5 job posts require manual review',
      priority: 'high',
      link: '/admin/content'
    },
    {
      id: 2,
      title: 'User Verification',
      description: '12 recruiter accounts pending verification',
      priority: 'medium',
      link: '/admin/users'
    },
    {
      id: 3,
      title: 'System Updates',
      description: 'Security patches available for installation',
      priority: 'high',
      link: '/admin/settings'
    },
    {
      id: 4,
      title: 'Analytics Review',
      description: 'Weekly performance report ready',
      priority: 'low',
      link: '/admin/analytics'
    }
  ];

  const systemHealth = [
    { name: 'API Response Time', value: '245ms', status: 'good' },
    { name: 'Database Performance', value: '98.5%', status: 'good' },
    { name: 'Server Uptime', value: '99.9%', status: 'excellent' },
    { name: 'Error Rate', value: '0.02%', status: 'good' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
              Here's an overview of the ZIDIO Connect platform.
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              to="/admin/analytics"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Link>
            <Link
              to="/admin/settings"
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Settings
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
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              <Link
                to="/admin/analytics"
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full bg-gray-100`}>
                      <Icon className={`h-4 w-4 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Pending Actions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingActions.map((action) => (
                <div key={action.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(action.priority)}`}>
                          {action.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <Link
                      to={action.link}
                      className="ml-4 bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {systemHealth.map((metric, index) => (
            <div key={index} className="text-center">
              <p className="text-sm text-gray-600 mb-1">{metric.name}</p>
              <p className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                {metric.value}
              </p>
              <p className={`text-xs ${getStatusColor(metric.status)} capitalize`}>
                {metric.status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/users"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Manage Users</h3>
              <p className="text-sm text-gray-600">View and moderate user accounts</p>
            </div>
          </Link>
          
          <Link
            to="/admin/jobs"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
          >
            <Briefcase className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Review Jobs</h3>
              <p className="text-sm text-gray-600">Moderate job postings</p>
            </div>
          </Link>
          
          <Link
            to="/admin/content"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
          >
            <FileText className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Content Review</h3>
              <p className="text-sm text-gray-600">Review flagged content</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;