import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (!isAuthenticated) return '/';
    
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Search className="h-24 w-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Suggestions:</strong>
              </p>
              <ul className="text-sm text-gray-600 text-left space-y-1">
                <li>• Check the URL for typos</li>
                <li>• Use the navigation menu</li>
                <li>• Go back to the previous page</li>
                <li>• Visit the homepage</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={getDashboardLink()}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                {isAuthenticated ? 'Go to Dashboard' : 'Go Home'}
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

export default NotFound;