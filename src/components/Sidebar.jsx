import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../utils/roleHelpers';
import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  Bookmark,
  BarChart3,
  MessageSquare,
  Users,
  Settings,
  Upload,
  Shield,
  TrendingUp,
  PlusCircle,
  History,
  UserCheck,
  Flag,
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    switch (user?.role) {
      case ROLES.STUDENT:
        return [
          { path: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/student/profile', label: 'Profile', icon: User },
          { path: '/student/jobs', label: 'Browse Jobs', icon: Briefcase },
          { path: '/student/applications', label: 'Applications', icon: FileText },
          { path: '/student/bookmarks', label: 'Bookmarks', icon: Bookmark },
          { path: '/student/charts', label: 'Charts', icon: BarChart3 },
          { path: '/student/chart-history', label: 'Chart History', icon: History },
          { path: '/student/messages', label: 'Messages', icon: MessageSquare },
          { path: '/student/resume-builder', label: 'Resume Builder', icon: FileText },
        ];
      
      case ROLES.RECRUITER:
        return [
          { path: '/recruiter/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/recruiter/profile', label: 'Profile', icon: User },
          { path: '/recruiter/post-job', label: 'Post Job', icon: PlusCircle },
          { path: '/recruiter/jobs', label: 'My Jobs', icon: Briefcase },
          { path: '/recruiter/messages', label: 'Messages', icon: MessageSquare },
          { path: '/recruiter/bookmarks', label: 'Bookmarks', icon: Bookmark },
          { path: '/recruiter/charts', label: 'Charts', icon: BarChart3 },
        ];
      
      case ROLES.ADMIN:
        return [
          { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { path: '/admin/users', label: 'Users', icon: Users },
          { path: '/admin/jobs', label: 'Jobs', icon: Briefcase },
          { path: '/admin/content', label: 'Content', icon: Flag },
          { path: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
          { path: '/admin/uploads', label: 'Uploads', icon: Upload },
          { path: '/admin/settings', label: 'Settings', icon: Settings },
        ];
      
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg border-r border-gray-200">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;