import React, { useState } from 'react';
import { 
  Upload, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Download,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  Trash2,
  Eye
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart as RechartsLineChart, Line } from 'recharts';

const StudentCharts = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [chartType, setChartType] = useState('bar');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');

  // Mock data for demonstration
  const mockData = [
    { name: 'Jan', value: 400, sales: 240 },
    { name: 'Feb', value: 300, sales: 139 },
    { name: 'Mar', value: 200, sales: 980 },
    { name: 'Apr', value: 278, sales: 390 },
    { name: 'May', value: 189, sales: 480 },
    { name: 'Jun', value: 239, sales: 380 }
  ];

  const pieData = [
    { name: 'Technology', value: 35, color: '#3B82F6' },
    { name: 'Finance', value: 25, color: '#10B981' },
    { name: 'Healthcare', value: 20, color: '#F59E0B' },
    { name: 'Education', value: 15, color: '#EF4444' },
    { name: 'Other', value: 5, color: '#8B5CF6' }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
          file.type === 'application/vnd.ms-excel' ||
          file.name.endsWith('.csv')) {
        setUploadedFile(file);
        setError('');
        processFile(file);
      } else {
        setError('Please upload a valid Excel (.xlsx, .xls) or CSV file');
        setUploadedFile(null);
      }
    }
  };

  const processFile = async (file) => {
    setIsProcessing(true);
    
    // Mock processing delay
    setTimeout(() => {
      setChartData(mockData);
      setIsProcessing(false);
    }, 2000);
  };

  const downloadChart = () => {
    // Mock download functionality
    const element = document.createElement('a');
    const file = new Blob(['Mock chart data'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `chart-${Date.now()}.png`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderChart = () => {
    if (!chartData) return null;

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Tooltip />
              <RechartsPieChart data={pieData} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </RechartsPieChart>
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Charts from Excel</h1>
        <p className="text-gray-600">
          Upload your Excel or CSV files to generate interactive charts and visualizations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-1 space-y-6">
          {/* File Upload */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload File</h2>
            
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">Excel (.xlsx, .xls) or CSV files</p>
              </label>
            </div>

            {uploadedFile && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">{uploadedFile.name}</p>
                    <p className="text-sm text-green-600">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setUploadedFile(null);
                      setChartData(null);
                      setError('');
                    }}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-2"></div>
                  <p className="text-sm text-blue-800">Processing your file...</p>
                </div>
              </div>
            )}
          </div>

          {/* Chart Type Selection */}
          {chartData && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Chart Type</h2>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="chartType"
                    value="bar"
                    checked={chartType === 'bar'}
                    onChange={(e) => setChartType(e.target.value)}
                    className="mr-3"
                  />
                  <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                  <span>Bar Chart</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="chartType"
                    value="line"
                    checked={chartType === 'line'}
                    onChange={(e) => setChartType(e.target.value)}
                    className="mr-3"
                  />
                  <LineChart className="h-5 w-5 text-green-600 mr-2" />
                  <span>Line Chart</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="chartType"
                    value="pie"
                    checked={chartType === 'pie'}
                    onChange={(e) => setChartType(e.target.value)}
                    className="mr-3"
                  />
                  <PieChart className="h-5 w-5 text-purple-600 mr-2" />
                  <span>Pie Chart</span>
                </label>
              </div>
            </div>
          )}

          {/* Chart Actions */}
          {chartData && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={downloadChart}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Chart
                </button>
                
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="h-4 w-4 mr-2" />
                  Save to History
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Chart Display */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Chart Preview</h2>
              {chartData && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Chart Type:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                    {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
                  </span>
                </div>
              )}
            </div>

            {chartData ? (
              <div className="border border-gray-200 rounded-lg p-4">
                {renderChart()}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Chart Generated</h3>
                <p className="text-gray-600">
                  Upload an Excel or CSV file to generate your chart visualization.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
          <div className="flex items-start">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
            <div>
              <p className="font-medium">Upload Your File</p>
              <p>Select an Excel (.xlsx, .xls) or CSV file containing your data.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
            <div>
              <p className="font-medium">Choose Chart Type</p>
              <p>Select from bar, line, or pie chart based on your data visualization needs.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
            <div>
              <p className="font-medium">Download & Save</p>
              <p>Download your chart or save it to your history for future reference.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCharts;