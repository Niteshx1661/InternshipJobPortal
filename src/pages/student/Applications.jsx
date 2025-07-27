import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar,
  Building,
  MapPin,
  Filter,
  Search,
  Eye,
  Download
} from 'lucide-react';

const StudentApplications = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const applications = [
    {
      id: 1,
      jobTitle: 'Software Engineer Intern',
      company: 'Google',
      location: 'Mountain View, CA',
      appliedDate: '2024-01-15',
      status: 'Under Review',
      statusColor: 'text-yellow-600 bg-yellow-100',
      lastUpdate: '2024-01-18',
      notes: 'Application submitted successfully. HR team reviewing.',
      jobId: 1
    },
    {
      id: 2,
      jobTitle: 'Product Manager Intern',
      company: 'Microsoft',
      location: 'Seattle, WA',
      appliedDate: '2024-01-12',
      status: 'Interview Scheduled',
      statusColor: 'text-blue-600 bg-blue-100',
      lastUpdate: '2024-01-20',
      notes: 'Phone interview scheduled for January 25th at 2:00 PM PST.',
      interviewDate: '2024-01-25',
      jobId: 2
    },
    {
      id: 3,
      jobTitle: 'Data Analyst Intern',
      company: 'Amazon',
      location: 'Seattle, WA',
      appliedDate: '2024-01-10',
      status: 'Accepted',
      statusColor: 'text-green-600 bg-green-100',
      lastUpdate: '2024-01-22',
      notes: 'Congratulations! Offer letter sent. Please respond by January 30th.',
      jobId: 3
    },
    {
      id: 4,
      jobTitle: 'UX Designer Intern',
      company: 'Meta',
      location: 'Menlo Park, CA',
      appliedDate: '2024-01-08',
      status: 'Rejected',
      statusColor: 'text-red-600 bg-red-100',
      lastUpdate: '2024-01-16',
      notes: 'Thank you for your interest. We decided to move forward with other candidates.',
      jobId: 4
    },
    {
      id: 5,
      jobTitle: 'Marketing Intern',
      company: 'Spotify',
      location: 'New York, NY',
      appliedDate: '2024-01-05',
      status: 'Application Sent',
      statusColor: 'text-gray-600 bg-gray-100',
      lastUpdate: '2024-01-05',
      notes: 'Application submitted. Waiting for initial review.',
      jobId: 5
    },
    {
      id: 6,
      jobTitle: 'Backend Developer',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      appliedDate: '2024-01-03',
      status: 'Technical Interview',
      statusColor: 'text-purple-600 bg-purple-100',
      lastUpdate: '2024-01-19',
      notes: 'Passed initial screening. Technical interview scheduled for January 28th.',
      interviewDate: '2024-01-28',
      jobId: 6
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Application Sent':
        return <FileText className="h-4 w-4" />;
      case 'Under Review':
        return <Clock className="h-4 w-4" />;
      case 'Interview Scheduled':
      case 'Technical Interview':
        return <Calendar className="h-4 w-4" />;
      case 'Accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = !statusFilter || app.status === statusFilter;
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Applications</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{applications.length}</p>
            <p className="text-sm text-blue-800">Total Applications</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{statusCounts['Under Review'] || 0}</p>
            <p className="text-sm text-yellow-800">Under Review</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{statusCounts['Accepted'] || 0}</p>
            <p className="text-sm text-green-800">Accepted</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {(statusCounts['Interview Scheduled'] || 0) + (statusCounts['Technical Interview'] || 0)}
            </p>
            <p className="text-sm text-purple-800">Interviews</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search applications..."
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
              <option value="Application Sent">Application Sent</option>
              <option value="Under Review">Under Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Technical Interview">Technical Interview</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div key={application.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {application.jobTitle}
                  </h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${application.statusColor}`}>
                    {getStatusIcon(application.status)}
                    <span className="ml-1">{application.status}</span>
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{application.company}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{application.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Applied {application.appliedDate}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">{application.notes}</p>
                
                {application.interviewDate && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-800">
                        Interview: {application.interviewDate}
                      </span>
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-gray-500">
                  Last updated: {application.lastUpdate}
                </p>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  to={`/student/jobs/${application.jobId}`}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="View Job"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <button
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  title="Download Application"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredApplications.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter 
              ? 'Try adjusting your search or filter criteria.'
              : 'You haven\'t applied to any jobs yet.'
            }
          </p>
          {!searchTerm && !statusFilter && (
            <Link
              to="/student/jobs"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Jobs
            </Link>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredApplications.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {filteredApplications.length} of {applications.length} applications
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

export default StudentApplications;