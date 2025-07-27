import React, { useState } from 'react';
import { 
  Flag, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MessageSquare,
  FileText,
  User,
  Calendar,
  Building
} from 'lucide-react';

const AdminContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const flaggedContent = [
    {
      id: 1,
      type: 'Job Post',
      title: 'Software Engineer Intern',
      company: 'TechCorp Inc.',
      reporter: 'Anonymous',
      reason: 'Misleading job description',
      flaggedDate: '2024-01-20',
      status: 'Under Review',
      statusColor: 'text-yellow-600 bg-yellow-100',
      content: 'Looking for a software engineer intern to work on exciting projects...',
      severity: 'Medium'
    },
    {
      id: 2,
      type: 'User Profile',
      title: 'John Doe - Student Profile',
      company: 'N/A',
      reporter: 'Sarah Johnson',
      reason: 'Inappropriate profile content',
      flaggedDate: '2024-01-19',
      status: 'Resolved',
      statusColor: 'text-green-600 bg-green-100',
      content: 'Profile contains inappropriate language and unprofessional content...',
      severity: 'High'
    },
    {
      id: 3,
      type: 'Message',
      title: 'Recruiter-Student Communication',
      company: 'Global Tech Solutions',
      reporter: 'Emily Davis',
      reason: 'Spam/Harassment',
      flaggedDate: '2024-01-18',
      status: 'Under Review',
      statusColor: 'text-yellow-600 bg-yellow-100',
      content: 'Repeated unsolicited messages from recruiter...',
      severity: 'High'
    },
    {
      id: 4,
      type: 'Job Post',
      title: 'Marketing Intern Position',
      company: 'StartupXYZ',
      reporter: 'Michael Chen',
      reason: 'Discriminatory language',
      flaggedDate: '2024-01-17',
      status: 'Action Taken',
      statusColor: 'text-blue-600 bg-blue-100',
      content: 'Job posting contains potentially discriminatory requirements...',
      severity: 'High'
    },
    {
      id: 5,
      type: 'User Profile',
      title: 'Lisa Rodriguez - Recruiter Profile',
      company: 'InnovateCorp',
      reporter: 'David Wilson',
      reason: 'Fake credentials',
      flaggedDate: '2024-01-16',
      status: 'Dismissed',
      statusColor: 'text-gray-600 bg-gray-100',
      content: 'Recruiter profile may contain false information about credentials...',
      severity: 'Medium'
    }
  ];

  const filteredContent = flaggedContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || item.type === typeFilter;
    const matchesStatus = !statusFilter || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleContentAction = (contentId, action) => {
    console.log(`Performing ${action} on content ${contentId}`);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Job Post':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'User Profile':
        return <User className="h-4 w-4 text-green-600" />;
      case 'Message':
        return <MessageSquare className="h-4 w-4 text-purple-600" />;
      default:
        return <Flag className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High':
        return 'text-red-600 bg-red-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const contentStats = {
    total: flaggedContent.length,
    pending: flaggedContent.filter(c => c.status === 'Under Review').length,
    resolved: flaggedContent.filter(c => c.status === 'Resolved').length,
    actionTaken: flaggedContent.filter(c => c.status === 'Action Taken').length,
    dismissed: flaggedContent.filter(c => c.status === 'Dismissed').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Content Moderation</h1>
            <p className="text-gray-600 mt-1">Review and moderate flagged content across the platform</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Flag className="h-4 w-4 mr-2" />
            Export Reports
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{contentStats.total}</p>
            <p className="text-sm text-red-800">Total Flagged</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{contentStats.pending}</p>
            <p className="text-sm text-yellow-800">Under Review</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{contentStats.resolved}</p>
            <p className="text-sm text-green-800">Resolved</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{contentStats.actionTaken}</p>
            <p className="text-sm text-blue-800">Action Taken</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-gray-600">{contentStats.dismissed}</p>
            <p className="text-sm text-gray-800">Dismissed</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search flagged content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="Job Post">Job Posts</option>
              <option value="User Profile">User Profiles</option>
              <option value="Message">Messages</option>
            </select>
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="Under Review">Under Review</option>
              <option value="Resolved">Resolved</option>
              <option value="Action Taken">Action Taken</option>
              <option value="Dismissed">Dismissed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Flagged Content List */}
      <div className="space-y-4">
        {filteredContent.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {getTypeIcon(item.type)}
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${item.statusColor}`}>
                    {item.status}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(item.severity)}`}>
                    {item.severity}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 text-sm text-gray-600">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Flag className="h-4 w-4 mr-2" />
                      <span><strong>Type:</strong> {item.type}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span><strong>Reporter:</strong> {item.reporter}</span>
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span><strong>Reason:</strong> {item.reason}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {item.company !== 'N/A' && (
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        <span><strong>Company:</strong> {item.company}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span><strong>Flagged:</strong> {item.flaggedDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-700"><strong>Content Preview:</strong></p>
                  <p className="text-sm text-gray-600 mt-1">{item.content}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="View Full Content"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Severity: <span className={`font-medium ${item.severity === 'High' ? 'text-red-600' : item.severity === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                  {item.severity}
                </span>
              </div>
              
              {item.status === 'Under Review' && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleContentAction(item.id, 'dismiss')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => handleContentAction(item.id, 'takeAction')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Take Action
                  </button>
                  <button
                    onClick={() => handleContentAction(item.id, 'resolve')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark Resolved
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredContent.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Flag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No flagged content found</h3>
          <p className="text-gray-600">
            {searchTerm || typeFilter || statusFilter 
              ? 'Try adjusting your search or filter criteria.'
              : 'No content has been flagged for review.'
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredContent.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {filteredContent.length} of {flaggedContent.length} flagged items
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

export default AdminContent;