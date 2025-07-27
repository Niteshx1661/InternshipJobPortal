import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Briefcase,
  Download,
  Calendar,
  Filter,
  Eye
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('users');

  // Mock data for charts
  const userGrowthData = [
    { month: 'Jan', students: 120, recruiters: 25, admins: 3 },
    { month: 'Feb', students: 180, recruiters: 35, admins: 3 },
    { month: 'Mar', students: 240, recruiters: 45, admins: 4 },
    { month: 'Apr', students: 320, recruiters: 60, admins: 4 },
    { month: 'May', students: 420, recruiters: 75, admins: 5 },
    { month: 'Jun', students: 520, recruiters: 90, admins: 5 }
  ];

  const jobApplicationData = [
    { month: 'Jan', applications: 450, jobs: 120 },
    { month: 'Feb', applications: 680, jobs: 150 },
    { month: 'Mar', applications: 920, jobs: 180 },
    { month: 'Apr', applications: 1200, jobs: 220 },
    { month: 'May', applications: 1450, jobs: 250 },
    { month: 'Jun', applications: 1680, jobs: 280 }
  ];

  const platformUsageData = [
    { name: 'Job Browsing', value: 35, color: '#3B82F6' },
    { name: 'Applications', value: 25, color: '#10B981' },
    { name: 'Profile Management', value: 20, color: '#F59E0B' },
    { name: 'Messaging', value: 12, color: '#EF4444' },
    { name: 'Chart Creation', value: 8, color: '#8B5CF6' }
  ];

  const topUniversities = [
    { name: 'Stanford University', students: 85, applications: 340 },
    { name: 'MIT', students: 72, applications: 298 },
    { name: 'UC Berkeley', students: 68, applications: 276 },
    { name: 'Harvard University', students: 61, applications: 245 },
    { name: 'Carnegie Mellon', students: 54, applications: 218 }
  ];

  const topCompanies = [
    { name: 'Google', jobs: 45, applications: 1250 },
    { name: 'Microsoft', jobs: 38, applications: 980 },
    { name: 'Amazon', jobs: 42, applications: 1180 },
    { name: 'Meta', jobs: 28, applications: 750 },
    { name: 'Apple', jobs: 25, applications: 680 }
  ];

  const platformStats = {
    totalUsers: 2847,
    totalJobs: 1456,
    totalApplications: 8934,
    successRate: 23.5,
    avgResponseTime: '2.3 days',
    activeUsers: 1892
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
            <p className="text-gray-600 mt-1">
              Comprehensive insights into platform performance and user behavior
            </p>
          </div>
          <div className="flex space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{platformStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-blue-800">Total Users</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-green-600">{platformStats.totalJobs.toLocaleString()}</p>
                <p className="text-sm text-green-800">Total Jobs</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-purple-600">{platformStats.totalApplications.toLocaleString()}</p>
                <p className="text-sm text-purple-800">Applications</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{platformStats.successRate}%</p>
                <p className="text-sm text-yellow-800">Success Rate</p>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-indigo-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-indigo-600">{platformStats.avgResponseTime}</p>
                <p className="text-sm text-indigo-800">Avg Response</p>
              </div>
            </div>
          </div>
          
          <div className="bg-pink-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-pink-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-pink-600">{platformStats.activeUsers.toLocaleString()}</p>
                <p className="text-sm text-pink-800">Active Users</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Growth Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#3B82F6" name="Students" />
              <Bar dataKey="recruiters" fill="#10B981" name="Recruiters" />
              <Bar dataKey="admins" fill="#8B5CF6" name="Admins" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Job Applications Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Applications vs Job Posts</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={jobApplicationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="applications" stroke="#EF4444" strokeWidth={3} name="Applications" />
              <Line type="monotone" dataKey="jobs" stroke="#3B82F6" strokeWidth={3} name="Job Posts" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Usage */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Usage</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={platformUsageData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {platformUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {platformUsageData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Universities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Universities</h2>
          <div className="space-y-3">
            {topUniversities.map((university, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{university.name}</h3>
                  <p className="text-sm text-gray-600">{university.students} students</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-blue-600">{university.applications}</p>
                  <p className="text-xs text-gray-500">applications</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Companies */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Companies</h2>
          <div className="space-y-3">
            {topCompanies.map((company, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-600">{company.jobs} jobs posted</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">{company.applications}</p>
                  <p className="text-xs text-gray-500">applications</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Metrics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Previous Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  New User Registrations
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  342
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  298
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  +14.8%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Job Applications
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1,680
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  1,450
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  +15.9%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Job Posts Created
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  280
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  250
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  +12.0%
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Average Session Duration
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  12.5 min
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  11.8 min
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  +5.9%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;