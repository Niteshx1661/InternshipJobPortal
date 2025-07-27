// Sidebar.tsx

import { ROLES, getRoleDisplayName } from '@/utils/roleHelpers';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

type SidebarLink = {
  to: string;
  label: string;
};

export default function Sidebar() {
  const { user } = useAuth();

  if (!user || !user.role) return null;

  const getLinksForRole = (): SidebarLink[] => {
    switch (user.role) {
      case ROLES.STUDENT:
        return [
          { to: '/student/dashboard', label: 'Dashboard' },
          { to: '/student/applications', label: 'My Applications' },
          { to: '/student/profile', label: 'My Profile' },
        ];
      case ROLES.RECRUITER:
        return [
          { to: '/recruiter/dashboard', label: 'Dashboard' },
          { to: '/recruiter/post-job', label: 'Post Job' },
          { to: '/recruiter/applicants', label: 'Applicants' },
        ];
      case ROLES.ADMIN:
        return [
          { to: '/admin/dashboard', label: 'Admin Dashboard' },
          { to: '/admin/users', label: 'Manage Users' },
          { to: '/admin/jobs', label: 'Manage Jobs' },
        ];
      default:
        return [
          { to: '/', label: 'Home' },
          { to: '/help', label: 'Help' },
        ];
    }
  };

  const links = getLinksForRole();

  return (
    <aside className="bg-white shadow-md p-4 min-h-screen">
      <div className="mb-6 text-xl font-bold text-gray-700">
        {getRoleDisplayName(user.role)} Panel
      </div>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-gray-700 hover:text-blue-600 hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
