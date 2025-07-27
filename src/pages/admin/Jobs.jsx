import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  MapPin,
  Building,
  DollarSign,
  Calendar,
  Users
} from 'lucide-react';

const AdminJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const jobs = [
    {
      id: 1,
      title: 'Software Engineer Intern',
      company: 'Google',
      recruiter: 'Sarah Johnson',
      location: 'Mountain View, CA',
      type: 'Internship',
      salary: '$8,000/month',
      posted: '2024-01-15',
      deadline: '2024-02-15',
      status: 'Active',
      applications: 45,
      views: 234,
      flagged: false,
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: 2,
      title: 'Product Manager Intern',
      company: 'Microsoft',
      recruiter: 'Michael Chen',
      location: 'Seattle, WA',
      type: 'Internship',
      salary: '$7,500/month',
      posted: '2024-01-12',
      deadline: '2024-02-12',
      status: 'Under Review',
      applications: 32,
      views: 189,
      flagged: true,
      statusColor: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'Netflix',
      recruiter: 'Emily Davis',
      location: 'Los Gatos, CA',
      type: 'Internship',
      salary: '$8,500/month',
      posted: '2024-01-10',
      deadline: '2024-02-10',
      status: 'Active',
      applications: 28,
      views: 156,
      flagged: false,
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: 4,
      title: 'UX Designer Intern',
      company: 'Airbnb',
      recruiter: 'David Wilson',
      location: 'San Francisco, CA',
      type: 'Internship',
      salary: '$7,000/month',
      posted: '2024-01-08',
      deadline: '2024-02-08',
      status: 'Rejected',
      applications: 67,
      views: 312,
      flagged: false,
      statusColor: 'text-red-600 bg-red-100'
    },
    {
      id: 5,
      title: 'Marketing Intern',
      company: 'Spotify',
      recruiter: 'Lisa Rodriguez',
      location: 'New York, NY',
      type: 'Internship',
      salary: '$6,000/month',
      posted: '2024-01-05',
      deadline: '2024-02-05',
      status: 'Draft',
      applications: 0,
      views: 0,
      flagged: false,
      statusColor: 'text-gray-600 bg-gray-100'
    },
    {
      id: 6,
      title: 'Full Stack Developer',
      company: 'Stripe',
      recruiter: 'James Thompson',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120,000/year',
      posted: '2024-01-03',
      deadline: '2024-02-03',
      status: 'Active',
      applications: 89,
      views: 445,
      flagged: false,
      statusColor: 'text-green-600 bg-green-100'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.recruiter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || job.status === statusFilter;
    const matchesType = !typeFilter || job.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleJobAction = (jobId, action) => {
    console.log(`Performing ${action} on job ${jobId}`);
  };

  const jobStats = {
    total: jobs.length,
    active: jobs.filter(j => j.status === 'Active').length,
    pending: jobs.filter(j => j.status === 'Under Review').length,
    flagged: jobs.filter(j => j.flagged).length,
    applications: jobs.reduce((sum, job) => sum + job.applications, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
            <p className="text-gray-600 mt-1">Monitor and moderate job postings across the platform</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            Export Jobs
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{jobStats.total}</p>
            <p className="text-sm text-blue-800">Total Jobs</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{jobStats.active}</p>
            <p className="text-sm text-green-800">Active Jobs</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{jobStats.pending}</p>
            <p className="text-sm text-yellow-800">Under Review</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{jobStats.flagged}</p>
            <p className="text-sm text-red-800">Flagged</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{jobStats.applications}</p>
            <p className="text-sm text-purple-800">Applications</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
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
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Under Review">Under Review</option>
              <option value="Rejected">Rejected</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="Internship">Internships</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recruiter
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metrics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-sm font-medium text-gray-900">{job.title}</h3>
                          {job.flagged && (
                            <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <div className="flex items-center">
                            <Building className="h-3 w-3 mr-1" />
                            <span>{job.company}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-3 w-3 mr-1" />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>Posted {job.posted}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Deadline {job.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{job.recruiter}</div>
                    <div className="text-sm text-gray-500">{job.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${job.statusColor}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{job.applications} applications</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{job.views} views</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      <button
                        className="text-green-600 hover:text-green-900"
                        title="Edit Job"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      {job.status === 'Under Review' && (
                        <>
                          <button
                            onClick={() => handleJobAction(job.id, 'approve')}
                            className="text-green-600 hover:text-green-900"
                            title="Approve Job"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleJobAction(job.id, 'reject')}
                            className="text-red-600 hover:text-red-900"
                            title="Reject Job"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => handleJobAction(job.id, 'delete')}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Job"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
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

export default AdminJobs;