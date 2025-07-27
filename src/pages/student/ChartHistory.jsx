import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Download, 
  Eye, 
  Trash2,
  Calendar,
  FileSpreadsheet,
  Search,
  Filter
} from 'lucide-react';

const StudentChartHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const chartHistory = [
    {
      id: 1,
      title: 'Sales Performance Q1 2024',
      type: 'bar',
      createdDate: '2024-01-20',
      fileName: 'sales_data_q1.xlsx',
      fileSize: '2.3 MB',
      description: 'Quarterly sales performance analysis with regional breakdown',
      thumbnail: '📊'
    },
    {
      id: 2,
      title: 'Market Share Analysis',
      type: 'pie',
      createdDate: '2024-01-18',
      fileName: 'market_analysis.csv',
      fileSize: '1.8 MB',
      description: 'Market share distribution across different product categories',
      thumbnail: '🥧'
    },
    {
      id: 3,
      title: 'Revenue Trend 2023',
      type: 'line',
      createdDate: '2024-01-15',
      fileName: 'revenue_trend.xlsx',
      fileSize: '3.1 MB',
      description: 'Monthly revenue trends and growth patterns throughout 2023',
      thumbnail: '📈'
    },
    {
      id: 4,
      title: 'Employee Performance Metrics',
      type: 'bar',
      createdDate: '2024-01-12',
      fileName: 'employee_metrics.xlsx',
      fileSize: '1.5 MB',
      description: 'Performance evaluation metrics across different departments',
      thumbnail: '👥'
    },
    {
      id: 5,
      title: 'Customer Satisfaction Survey',
      type: 'pie',
      createdDate: '2024-01-10',
      fileName: 'customer_survey.csv',
      fileSize: '900 KB',
      description: 'Customer satisfaction ratings and feedback analysis',
      thumbnail: '😊'
    },
    {
      id: 6,
      title: 'Website Traffic Analytics',
      type: 'line',
      createdDate: '2024-01-08',
      fileName: 'web_analytics.xlsx',
      fileSize: '2.7 MB',
      description: 'Website traffic patterns and user engagement metrics',
      thumbnail: '🌐'
    }
  ];

  const getChartIcon = (type) => {
    switch (type) {
      case 'bar':
        return <BarChart3 className="h-5 w-5 text-blue-600" />;
      case 'line':
        return <LineChart className="h-5 w-5 text-green-600" />;
      case 'pie':
        return <PieChart className="h-5 w-5 text-purple-600" />;
      default:
        return <BarChart3 className="h-5 w-5 text-gray-600" />;
    }
  };

  const getChartTypeLabel = (type) => {
    switch (type) {
      case 'bar':
        return 'Bar Chart';
      case 'line':
        return 'Line Chart';
      case 'pie':
        return 'Pie Chart';
      default:
        return 'Chart';
    }
  };

  const filteredCharts = chartHistory.filter(chart => {
    const matchesSearch = chart.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chart.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || chart.type === typeFilter;
    const matchesDate = !dateFilter || chart.createdDate.startsWith(dateFilter);
    return matchesSearch && matchesType && matchesDate;
  });

  const handleDownload = (chart) => {
    // Mock download functionality
    console.log(`Downloading chart: ${chart.title}`);
  };

  const handleView = (chart) => {
    // Mock view functionality
    console.log(`Viewing chart: ${chart.title}`);
  };

  const handleDelete = (chartId) => {
    // Mock delete functionality
    console.log(`Deleting chart with ID: ${chartId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chart History</h1>
            <p className="text-gray-600 mt-1">
              View and manage your previously created charts
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">
              {chartHistory.length} charts
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search charts..."
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
              <option value="">All Chart Types</option>
              <option value="bar">Bar Charts</option>
              <option value="line">Line Charts</option>
              <option value="pie">Pie Charts</option>
            </select>
          </div>
          
          <div>
            <input
              type="month"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      {filteredCharts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharts.map((chart) => (
            <div key={chart.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              {/* Chart Thumbnail */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg mb-4">
                  <span className="text-4xl">{chart.thumbnail}</span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">{chart.title}</h3>
                  <div className="flex items-center space-x-1">
                    {getChartIcon(chart.type)}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{chart.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {chart.createdDate}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {getChartTypeLabel(chart.type)}
                  </span>
                </div>
              </div>
              
              {/* Chart Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <FileSpreadsheet className="h-4 w-4 mr-1" />
                    <span className="truncate">{chart.fileName}</span>
                  </div>
                  <span className="text-xs text-gray-500">{chart.fileSize}</span>
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(chart)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="View Chart"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDownload(chart)}
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      title="Download Chart"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(chart.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Chart"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleView(chart)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || typeFilter || dateFilter ? 'No charts found' : 'No chart history yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || typeFilter || dateFilter 
              ? 'Try adjusting your search or filter criteria.'
              : 'Create your first chart to see it appear in your history.'
            }
          </p>
          <div className="flex justify-center space-x-3">
            {(searchTerm || typeFilter || dateFilter) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('');
                  setDateFilter('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            )}
            <a
              href="/student/charts"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Chart
            </a>
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredCharts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {filteredCharts.length} of {chartHistory.length} charts
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

export default StudentChartHistory;