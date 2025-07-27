import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Save, 
  Plus, 
  Trash2, 
  Edit,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Code
} from 'lucide-react';

const StudentResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      website: 'johndoe.dev'
    },
    summary: 'Passionate computer science student with strong programming skills and experience in web development. Seeking internship opportunities to apply technical knowledge in a professional environment.',
    education: [
      {
        id: 1,
        institution: 'New York University',
        degree: 'Bachelor of Science in Computer Science',
        startDate: '2022',
        endDate: '2026',
        gpa: '3.8',
        relevant: 'Data Structures, Algorithms, Web Development, Database Systems'
      }
    ],
    experience: [
      {
        id: 1,
        title: 'Web Development Intern',
        company: 'Tech Startup Inc.',
        startDate: '2023-06',
        endDate: '2023-08',
        description: 'Developed responsive web applications using React and Node.js. Collaborated with design team to implement user interfaces. Improved application performance by 25%.'
      }
    ],
    projects: [
      {
        id: 1,
        name: 'E-commerce Platform',
        technologies: 'React, Node.js, MongoDB, Express',
        startDate: '2023-03',
        endDate: '2023-05',
        description: 'Built a full-stack e-commerce platform with user authentication, product catalog, and payment integration.',
        link: 'github.com/johndoe/ecommerce'
      }
    ],
    skills: {
      technical: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'HTML/CSS'],
      soft: ['Problem Solving', 'Team Collaboration', 'Communication', 'Time Management']
    },
    achievements: [
      {
        id: 1,
        title: 'Dean\'s List',
        organization: 'New York University',
        date: '2023',
        description: 'Achieved Dean\'s List recognition for academic excellence'
      }
    ]
  });

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  const handleInputChange = (section, field, value, index = null, subField = null) => {
    setResumeData(prev => {
      const newData = { ...prev };
      
      if (index !== null) {
        if (subField) {
          newData[section][index][subField] = value;
        } else {
          newData[section][index] = value;
        }
      } else if (field && typeof newData[section] === 'object' && !Array.isArray(newData[section])) {
        newData[section][field] = value;
      } else {
        newData[section] = value;
      }
      
      return newData;
    });
  };

  const addItem = (section) => {
    const newItem = {
      id: Date.now(),
      ...(section === 'education' && {
        institution: '',
        degree: '',
        startDate: '',
        endDate: '',
        gpa: '',
        relevant: ''
      }),
      ...(section === 'experience' && {
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: ''
      }),
      ...(section === 'projects' && {
        name: '',
        technologies: '',
        startDate: '',
        endDate: '',
        description: '',
        link: ''
      }),
      ...(section === 'achievements' && {
        title: '',
        organization: '',
        date: '',
        description: ''
      })
    };

    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={resumeData.personal.fullName}
            onChange={(e) => handleInputChange('personal', 'fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={resumeData.personal.email}
            onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={resumeData.personal.phone}
            onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={resumeData.personal.location}
            onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <input
            type="text"
            value={resumeData.personal.linkedin}
            onChange={(e) => handleInputChange('personal', 'linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
          <input
            type="text"
            value={resumeData.personal.github}
            onChange={(e) => handleInputChange('personal', 'github', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>
      <textarea
        value={resumeData.summary}
        onChange={(e) => handleInputChange('summary', null, e.target.value)}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write a brief summary of your background, skills, and career objectives..."
      />
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <button
          onClick={() => addItem('education')}
          className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Education
        </button>
      </div>
      
      {resumeData.education.map((edu, index) => (
        <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
            <button
              onClick={() => removeItem('education', edu.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="text"
                value={edu.startDate}
                onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="text"
                value={edu.endDate}
                onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Technical Skills</label>
        <input
          type="text"
          value={resumeData.skills.technical.join(', ')}
          onChange={(e) => handleInputChange('skills', 'technical', e.target.value.split(', '))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="JavaScript, Python, React, etc."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Soft Skills</label>
        <input
          type="text"
          value={resumeData.skills.soft.join(', ')}
          onChange={(e) => handleInputChange('skills', 'soft', e.target.value.split(', '))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Problem Solving, Communication, etc."
        />
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfo();
      case 'summary':
        return renderSummary();
      case 'education':
        return renderEducation();
      case 'skills':
        return renderSkills();
      default:
        return <div>Section under development</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
            <p className="text-gray-600 mt-1">Create and customize your professional resume</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Save className="h-4 w-4 mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-semibold text-gray-900 mb-4">Resume Sections</h2>
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {renderCurrentSection()}
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Preview</h2>
        <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 min-h-96">
          <div className="bg-white p-8 shadow-sm max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center border-b border-gray-200 pb-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{resumeData.personal.fullName}</h1>
              <div className="flex justify-center items-center space-x-4 mt-2 text-gray-600">
                <span className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {resumeData.personal.email}
                </span>
                <span className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {resumeData.personal.phone}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {resumeData.personal.location}
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Summary</h2>
              <p className="text-gray-700">{resumeData.summary}</p>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Education</h2>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                    </div>
                    <span className="text-gray-600">{edu.startDate} - {edu.endDate}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Skills</h2>
              <div className="mb-3">
                <h3 className="font-semibold text-gray-900 mb-2">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.technical.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResumeBuilder;