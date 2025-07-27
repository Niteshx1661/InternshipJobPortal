import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  Clock
} from 'lucide-react';

const RecruiterJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const jobs = [
    {
      id: 1,
      title: 'Software Engineer Intern',
      location: 'Mountain View, CA',
      type: 'Internship',
      salary: '$8,000/month',
      posted: '2024-01-15',
      deadline: '2024-02-15',
      status: 'Active',
      applications: 45,
      views: 234,
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: 2,
      title: 'Product Manager Intern',
      location: 'Seattle, WA',
      type: 'Internship',
      salary: '$7,500/month',
      posted: '2024-01-12',
      deadline: '2024-02-12',
      status: 'Active',
      applications: 32,
      views: 189,
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: 3,
      title: 'Data Analyst Intern',
      location: 'Remote',
      type: 'Internship',
      salary: '$6,500/month',
      posted: '2024-01-10',
      deadline: '2024-02-10',
      status: 'Paused',
      applications: 28,
      views: 156,
      statusColor: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 4,
      title: 'UX Designer Intern',
      location: 'San Francisco, CA',
      type: 'Internship',
      salary: '$7,000/month',
      posted: '2024-01-08',
      deadline: '2024-02-08',
      status: 'Closed',
      applications: 67,
      views: 312,
      statusColor: 'text-red-600 bg-red-100'
    },
    {
      id: 5,
      title: 'Marketing Intern',
      location: 'New York, NY',
      type: 'Internship',
      salary: '$6,000/month',
      posted: '2024-01-05',
      deadline: '2024-02-05',
      status: 'Draft',
      applications: 0,
      views: 0,
      statusColor: 'text-gray-600 bg-gray-100'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const totalApplications = jobs.reduce((sum, job) => sum + job.applications, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Job Posts</h1>
            <p className="text-gray-600 mt-1">Manage your job postings and track applications</p>
          </div>
          <Link
            to="/recruiter/post-job"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{jobs.length}</p>
            <p className="text-sm text-blue-800">Total Jobs</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{statusCounts['Active'] || 0}</p>
            <p className="text-sm text-green-800">Active Jobs</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{totalApplications}</p>
            <p className="text-sm text-purple-800">Total Applications</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{statusCounts['Draft'] || 0}</p>
            <p className="text-sm text-yellow-800">Draft Jobs</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Closed">Closed</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${job.statusColor}`}>
                    {job.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-gray-600 mb-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-1" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{job.salary}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Posted {job.posted}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Deadline {job.deadline}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{job.applications} applications</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{job.views} views</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  to={`/recruiter/jobs/${job.id}`}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="View Job"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <button
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  title="Edit Job"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete Job"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <div className="flex space-x-3">
                {job.status === 'Active' && (
                  <button className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm hover:bg-yellow-200 transition-colors">
                    Pause
                  </button>
                )}
                {job.status === 'Paused' && (
                  <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200 transition-colors">
                    Activate
                  </button>
                )}
                {job.status === 'Draft' && (
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200 transition-colors">
                    Publish
                  </button>
                )}
              </div>
              
              <div className="flex space-x-3">
                <Link
                  to={`/recruiter/jobs/${job.id}`}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View Details
                </Link>
                {job.applications > 0 && (
                  <Link
                    to={`/recruiter/applicants/${job.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Applications ({job.applications})
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter 
              ? 'Try adjusting your search or filter criteria.'
              : 'You haven\'t posted any jobs yet.'
            }
          </p>
          {!searchTerm && !statusFilter && (
            <Link
              to="/recruiter/post-job"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post Your First Job
            </Link>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredJobs.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterJobs;