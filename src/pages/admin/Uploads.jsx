import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  BarChart3,
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
  Calendar,
  User,
  Building
} from 'lucide-react';

const AdminUploads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('');

  const uploads = [
    {
      id: 1,
      fileName: 'sales_data_q1_2024.xlsx',
      originalName: 'Q1 Sales Performance Analysis',
      fileSize: '2.3 MB',
      fileType: 'Excel',
      uploadedBy: 'Sarah Johnson',
      userType: 'Student',
      userCompany: 'Stanford University',
      uploadDate: '2024-01-20',
      chartType: 'Bar Chart',
      status: 'Processed',
      downloads: 12,
      views: 45
    },
    {
      id: 2,
      fileName: 'market_analysis.csv',
      originalName: 'Market Share Distribution',
      fileSize: '1.8 MB',
      fileType: 'CSV',
      uploadedBy: 'Michael Chen',
      userType: 'Recruiter',
      userCompany: 'Google Inc.',
      uploadDate: '2024-01-19',
      chartType: 'Pie Chart',
      status: 'Processed',
      downloads: 8,
      views: 32
    },
    {
      id: 3,
      fileName: 'revenue_trends.xlsx',
      originalName: 'Revenue Trend Analysis 2023',
      fileSize: '3.1 MB',
      fileType: 'Excel',
      uploadedBy: 'Emily Davis',
      userType: 'Student',
      userCompany: 'MIT',
      uploadDate: '2024-01-18',
      chartType: 'Line Chart',
      status: 'Processing',
      downloads: 0,
      views: 15
    },
    {
      id: 4,
      fileName: 'employee_metrics.xlsx',
      originalName: 'Employee Performance Metrics',
      fileSize: '1.5 MB',
      fileType: 'Excel',
      uploadedBy: 'David Wilson',
      userType: 'Recruiter',
      userCompany: 'Microsoft Corp.',
      uploadDate: '2024-01-17',
      chartType: 'Bar Chart',
      status: 'Failed',
      downloads: 0,
      views: 8
    },
    {
      id: 5,
      fileName: 'customer_survey.csv',
      originalName: 'Customer Satisfaction Survey Results',
      fileSize: '900 KB',
      fileType: 'CSV',
      uploadedBy: 'Lisa Rodriguez',
      userType: 'Student',
      userCompany: 'UCLA',
      uploadDate: '2024-01-16',
      chartType: 'Pie Chart',
      status: 'Processed',
      downloads: 25,
      views: 78
    },
    {
      id: 6,
      fileName: 'web_analytics.xlsx',
      originalName: 'Website Traffic Analytics',
      fileSize: '2.7 MB',
      fileType: 'Excel',
      uploadedBy: 'James Thompson',
      userType: 'Admin',
      userCompany: 'ZIDIO Connect',
      uploadDate: '2024-01-15',
      chartType: 'Line Chart',
      status: 'Processed',
      downloads: 18,
      views: 56
    }
  ];

  const filteredUploads = uploads.filter(upload => {
    const matchesSearch = upload.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         upload.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         upload.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUserType = !userTypeFilter || upload.userType === userTypeFilter;
    const matchesFileType = !fileTypeFilter || upload.fileType === fileTypeFilter;
    return matchesSearch && matchesUserType && matchesFileType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processed':
        return 'text-green-600 bg-green-100';
      case 'Processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'Failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getUserTypeColor = (userType) => {
    switch (userType) {
      case 'Student':
        return 'text-blue-600 bg-blue-100';
      case 'Recruiter':
        return 'text-green-600 bg-green-100';
      case 'Admin':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleFileAction = (fileId, action) => {
    console.log(`Performing ${action} on file ${fileId}`);
  };

  const uploadStats = {
    total: uploads.length,
    processed: uploads.filter(u => u.status === 'Processed').length,
    processing: uploads.filter(u => u.status === 'Processing').length,
    failed: uploads.filter(u => u.status === 'Failed').length,
    totalSize: uploads.reduce((sum, upload) => {
      const size = parseFloat(upload.fileSize);
      const unit = upload.fileSize.includes('MB') ? 1 : 0.001;
      return sum + (size * unit);
    }, 0).toFixed(1)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">File Uploads Management</h1>
            <p className="text-gray-600 mt-1">Monitor and manage all file uploads and chart generations</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{uploadStats.total}</p>
            <p className="text-sm text-blue-800">Total Uploads</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{uploadStats.processed}</p>
            <p className="text-sm text-green-800">Processed</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{uploadStats.processing}</p>
            <p className="text-sm text-yellow-800">Processing</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{uploadStats.failed}</p>
            <p className="text-sm text-red-800">Failed</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{uploadStats.totalSize} MB</p>
            <p className="text-sm text-purple-800">Total Size</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search uploads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <select
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All User Types</option>
              <option value="Student">Students</option>
              <option value="Recruiter">Recruiters</option>
              <option value="Admin">Admins</option>
            </select>
          </div>
          
          <div>
            <select
              value={fileTypeFilter}
              onChange={(e) => setFileTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All File Types</option>
              <option value="Excel">Excel Files</option>
              <option value="CSV">CSV Files</option>
            </select>
          </div>
        </div>
      </div>

      {/* Uploads List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Analytics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUploads.map((upload) => (
                <tr key={upload.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-start">
                      <FileSpreadsheet className="h-8 w-8 text-green-600 mr-3 mt-1" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{upload.originalName}</h3>
                        <p className="text-sm text-gray-500">{upload.fileName}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span>{upload.fileSize}</span>
                          <span>{upload.fileType}</span>
                          <span className="flex items-center">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            {upload.chartType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{upload.uploadedBy}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUserTypeColor(upload.userType)}`}>
                          {upload.userType}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Building className="h-3 w-3 mr-1" />
                        <span>{upload.userCompany}</span>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{upload.uploadDate}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(upload.status)}`}>
                      {upload.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{upload.views} views</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        <span>{upload.downloads} downloads</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleFileAction(upload.id, 'view')}
                        className="text-blue-600 hover:text-blue-900"
                        title="View File"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleFileAction(upload.id, 'download')}
                        className="text-green-600 hover:text-green-900"
                        title="Download File"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleFileAction(upload.id, 'delete')}
                        className="text-red-600 hover:text-red-900"
                        title="Delete File"
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
      {filteredUploads.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No uploads found</h3>
          <p className="text-gray-600">
            {searchTerm || userTypeFilter || fileTypeFilter 
              ? 'Try adjusting your search or filter criteria.'
              : 'No files have been uploaded yet.'
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredUploads.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {filteredUploads.length} of {uploads.length} uploads
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

export default AdminUploads;