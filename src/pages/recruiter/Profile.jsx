import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Briefcase,
  Upload,
  Save,
  Edit,
  Globe,
  Users
} from 'lucide-react';

const RecruiterProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA',
    company: 'Google Inc.',
    position: 'Senior Technical Recruiter',
    department: 'Engineering',
    companySize: '100,000+',
    website: 'https://google.com',
    bio: 'Experienced technical recruiter with 8+ years in the tech industry. Passionate about connecting talented engineers with innovative companies. Specialized in full-stack development, data science, and product management roles.',
    experience: '8 years',
    specializations: ['Software Engineering', 'Data Science', 'Product Management', 'DevOps', 'Machine Learning'],
    industries: ['Technology', 'Fintech', 'Healthcare Tech', 'E-commerce']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSpecializationsChange = (e) => {
    const specializations = e.target.value.split(',').map(spec => spec.trim());
    setFormData(prev => ({
      ...prev,
      specializations
    }));
  };

  const handleIndustriesChange = (e) => {
    const industries = e.target.value.split(',').map(industry => industry.trim());
    setFormData(prev => ({
      ...prev,
      industries
    }));
  };

  const handleSave = () => {
    updateUser({ name: formData.name });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(prev => ({
      ...prev,
      name: user?.name || '',
      email: user?.email || ''
    }));
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Recruiter Profile</h1>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Picture & Basic Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="h-24 w-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                    <Upload className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-xl font-bold text-gray-900 text-center border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
              )}
              
              <p className="text-gray-600 mt-1">{formData.position}</p>
              <p className="text-sm text-gray-500">{formData.company}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <span className="text-gray-700">{formData.email}</span>
                )}
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <span className="text-gray-700">{formData.phone}</span>
                )}
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <span className="text-gray-700">{formData.location}</span>
                )}
              </div>
              
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-400 mr-3" />
                {isEditing ? (
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                    {formData.website}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Building className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-gray-700 font-medium">{formData.company}</p>
                  <p className="text-sm text-gray-500">{formData.department} Department</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-700">{formData.companySize} employees</span>
              </div>
              
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-700">{formData.experience} of experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Detailed Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Me</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us about your recruiting experience and expertise..."
              />
            ) : (
              <p className="text-gray-700">{formData.bio}</p>
            )}
          </div>

          {/* Specializations */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruiting Specializations</h3>
            {isEditing ? (
              <input
                type="text"
                value={formData.specializations.join(', ')}
                onChange={handleSpecializationsChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter specializations separated by commas"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Industries */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Experience</h3>
            {isEditing ? (
              <input
                type="text"
                value={formData.industries.join(', ')}
                onChange={handleIndustriesChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter industries separated by commas"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.industries.map((industry, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Recruitment Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recruitment Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">156</p>
                <p className="text-sm text-blue-800">Successful Hires</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">89%</p>
                <p className="text-sm text-green-800">Success Rate</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">24</p>
                <p className="text-sm text-purple-800">Active Jobs</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">18</p>
                <p className="text-sm text-yellow-800">Days Avg. Fill</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;