import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Users,
  Briefcase,
  TrendingUp,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart as RechartsLineChart, Line } from 'recharts';

const RecruiterCharts = () => {
  const [selectedChart, setSelectedChart] = useState('applications');
  const [timeRange, setTimeRange] = useState('month');

  // Mock data for different charts
  const applicationsData = [
    { name: 'Jan', applications: 45, interviews: 12, hires: 3 },
    { name: 'Feb', applications: 52, interviews: 15, hires: 4 },
    { name: 'Mar', applications: 38, interviews: 10, hires: 2 },
    { name: 'Apr', applications: 61, interviews: 18, hires: 5 },
    { name: 'May', applications: 49, interviews: 14, hires: 4 },
    { name: 'Jun', applications: 67, interviews: 20, hires: 6 }
  ];

  const jobTypeData = [
    { name: 'Internships', value: 45, color: '#3B82F6' },
    { name: 'Full-time', value: 30, color: '#10B981' },
    { name: 'Part-time', value: 15, color: '#F59E0B' },
    { name: 'Contract', value: 10, color: '#EF4444' }
  ];

  const universityData = [
    { name: 'Stanford', applications: 28 },
    { name: 'MIT', applications: 24 },
    { name: 'UC Berkeley', applications: 22 },
    { name: 'CMU', applications: 18 },
    { name: 'Caltech', applications: 15 },
    { name: 'Others', applications: 35 }
  ];

  const skillsData = [
    { name: 'JavaScript', demand: 85 },
    { name: 'Python', demand: 78 },
    { name: 'React', demand: 72 },
    { name: 'Java', demand: 65 },
    { name: 'Node.js', demand: 58 },
    { name: 'SQL', demand: 55 }
  ];

  const renderChart = () => {
    switch (selectedChart) {
      case 'applications':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={applicationsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#3B82F6" name="Applications" />
              <Bar dataKey="interviews" fill="#10B981" name="Interviews" />
              <Bar dataKey="hires" fill="#F59E0B" name="Hires" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'jobTypes':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Tooltip />
              <RechartsPieChart data={jobTypeData} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value">
                {jobTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </RechartsPieChart>
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      
      case 'universities':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={universityData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="applications" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'skills':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={skillsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="demand" stroke="#EF4444" strokeWidth={3} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  const getChartTitle = () => {
    switch (selectedChart) {
      case 'applications':
        return 'Application Funnel';
      case 'jobTypes':
        return 'Job Types Distribution';
      case 'universities':
        return 'Applications by University';
      case 'skills':
        return 'In-Demand Skills';
      default:
        return 'Chart';
    }
  };

  const getChartDescription = () => {
    switch (selectedChart) {
      case 'applications':
        return 'Track applications, interviews, and successful hires over time';
      case 'jobTypes':
        return 'Distribution of different job types you\'ve posted';
      case 'universities':
        return 'Number of applications received from different universities';
      case 'skills':
        return 'Most in-demand skills based on job requirements';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recruitment Analytics</h1>
            <p className="text-gray-600 mt-1">
              Analyze your recruitment performance and trends
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
              Export
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-blue-600">342</p>
                <p className="text-sm text-blue-800">Total Applications</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-green-600">89</p>
                <p className="text-sm text-green-800">Interviews Scheduled</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-purple-600">24</p>
                <p className="text-sm text-purple-800">Successful Hires</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">7.0%</p>
                <p className="text-sm text-yellow-800">Conversion Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setSelectedChart('applications')}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  selectedChart === 'applications'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="h-4 w-4 mr-3" />
                Application Funnel
              </button>
              
              <button
                onClick={() => setSelectedChart('jobTypes')}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  selectedChart === 'jobTypes'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <PieChart className="h-4 w-4 mr-3" />
                Job Types
              </button>
              
              <button
                onClick={() => setSelectedChart('universities')}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  selectedChart === 'universities'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Users className="h-4 w-4 mr-3" />
                Universities
              </button>
              
              <button
                onClick={() => setSelectedChart('skills')}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  selectedChart === 'skills'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <LineChart className="h-4 w-4 mr-3" />
                Skills Demand
              </button>
            </nav>
          </div>
        </div>

        {/* Chart Display */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{getChartTitle()}</h2>
                <p className="text-sm text-gray-600">{getChartDescription()}</p>
              </div>
              <button className="flex items-center px-3 py-1 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4 mr-1" />
                Export
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              {renderChart()}
            </div>

            {/* Chart Legend for Pie Chart */}
            {selectedChart === 'jobTypes' && (
              <div className="mt-4 flex justify-center">
                <div className="flex flex-wrap gap-4">
                  {jobTypeData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-medium text-gray-900 mb-2">Peak Application Period</h3>
            <p className="text-sm text-gray-600">
              April saw the highest number of applications (61), likely due to spring recruitment season.
            </p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-medium text-gray-900 mb-2">Top Performing Universities</h3>
            <p className="text-sm text-gray-600">
              Stanford and MIT candidates show the highest application rates and interview success.
            </p>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-medium text-gray-900 mb-2">In-Demand Skills</h3>
            <p className="text-sm text-gray-600">
              JavaScript and Python remain the most sought-after skills in your job postings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterCharts;