import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES, getRoleDisplayName } from '../../utils/roleHelpers';
import { Briefcase, Eye, EyeOff, AlertCircle, User, Building, Shield } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    major: '',
    graduationYear: '',
    company: '',
    position: '',
    companySize: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const { register, loading, error, clearError } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) clearError();
    if (localError) setLocalError('');
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({ ...prev, role }));
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setLocalError("Please fill all required fields");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    if (!role) {
      setLocalError("Please select a role before submitting.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    const baseData = { role, name, email, password };

    let roleData = {};
    if (role === ROLES.STUDENT) {
      roleData = {
        university: formData.university,
        major: formData.major,
        graduationYear: formData.graduationYear,
      };
    } else if (role === ROLES.RECRUITER) {
      roleData = {
        company: formData.company,
        position: formData.position,
        companySize: formData.companySize,
      };
    }

    try {
      const response = await register({ ...baseData, ...roleData });
      const redirectMap = {
        STUDENT: '/student/dashboard',
        RECRUITER: '/recruiter/dashboard',
        ADMIN: '/admin/dashboard',
      };
      navigate(redirectMap[response.user.role] || '/');
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  // ========== UI PARTS ==========

  const renderRoleSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Choose your role</h3>
        <p className="text-sm text-gray-600">Select how you'll be using ZIDIO Connect</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[ROLES.STUDENT, ROLES.RECRUITER, ROLES.ADMIN].map((role) => {
          const icons = {
            STUDENT: <User className="h-8 w-8 text-blue-600 mr-4" />,
            RECRUITER: <Building className="h-8 w-8 text-green-600 mr-4" />,
            ADMIN: <Shield className="h-8 w-8 text-purple-600 mr-4" />,
          };
          const descriptions = {
            STUDENT: 'Looking for internships and job opportunities',
            RECRUITER: 'Hiring talented students and professionals',
            ADMIN: 'Managing the platform and users',
          };
          const colors = {
            STUDENT: 'blue',
            RECRUITER: 'green',
            ADMIN: 'purple',
          };

          return (
            <button
              key={role}
              type="button"
              onClick={() => handleRoleSelect(role)}
              className={`flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-${colors[role]}-500 hover:bg-${colors[role]}-50 transition-colors`}
            >
              {icons[role]}
              <div className="text-left">
                <h4 className="font-medium text-gray-900">{getRoleDisplayName(role)}</h4>
                <p className="text-sm text-gray-600">{descriptions[role]}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderRegistrationForm = () => (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        <p className="text-sm text-blue-800">
          Registering as: <strong>{getRoleDisplayName(formData.role)}</strong>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="ml-2 text-blue-600 hover:text-blue-500 underline"
          >
            Change
          </button>
        </p>
      </div>

      {/* --- Input fields: Name, Email, Password, Confirm Password --- */}
      {[
        { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
        { id: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter your email' },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id}>
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            id={id}
            name={id}
            type={type}
            value={formData[id]}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={placeholder}
            required
          />
        </div>
      ))}

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
            className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <div className="mt-1 relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Role-specific fields */}
      {formData.role === ROLES.STUDENT && (
        <>
          {/* University, Major, Graduation Year */}
          {/* ... Keep same as before ... */}
        </>
      )}
      {formData.role === ROLES.RECRUITER && (
        <>
          {/* Company, Position, Company Size */}
          {/* ... Keep same as before ... */}
        </>
      )}

      {localError && (
        <div className="text-red-600 text-sm font-medium">{localError}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Creating account...
          </div>
        ) : 'Create Account'}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Briefcase className="h-12 w-12 text-blue-600 mx-auto" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
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

          {step === 1 ? renderRoleSelection() : renderRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
