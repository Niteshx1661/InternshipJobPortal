import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, ArrowLeft, Home } from 'lucide-react';

const Unauthorized = () => {
  const { user } = useAuth();

  const getDashboardLink = () => {
    switch (user?.role) {
      case 'STUDENT':
        return '/student/dashboard';
      case 'RECRUITER':
        return '/recruiter/dashboard';
      case 'ADMIN':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Shield className="h-24 w-24 text-red-500 mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-8">
            You don't have permission to access this page. This area is restricted to specific user roles.
          </p>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-red-200">
              <p className="text-sm text-gray-700">
                <strong>Current Role:</strong> {user?.role || 'Unknown'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Contact your administrator if you believe this is an error.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={getDashboardLink()}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;