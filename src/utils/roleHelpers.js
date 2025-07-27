export const ROLES = {
  STUDENT: 'STUDENT',
  RECRUITER: 'RECRUITER',
  ADMIN: 'ADMIN',
};

export const hasRole = (userRole, requiredRole) => {
  return userRole === requiredRole;
};

export const hasAnyRole = (userRole, requiredRoles) => {
  return requiredRoles.includes(userRole);
};

export const getRoleDisplayName = (role) => {
  const roleNames = {
    [ROLES.STUDENT]: 'Student',
    [ROLES.RECRUITER]: 'Recruiter',
    [ROLES.ADMIN]: 'Administrator',
  };
  return roleNames[role] || role;
};

export const getRoleColor = (role) => {
  const roleColors = {
    [ROLES.STUDENT]: 'bg-blue-100 text-blue-800',
    [ROLES.RECRUITER]: 'bg-green-100 text-green-800',
    [ROLES.ADMIN]: 'bg-purple-100 text-purple-800',
  };
  return roleColors[role] || 'bg-gray-100 text-gray-800';
};