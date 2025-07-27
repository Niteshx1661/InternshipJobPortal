import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Calendar,
  Users,
  Eye,
  Edit,
  Pause,
  Play,
  Trash2,
  Share2
} from 'lucide-react';

const RecruiterJobDetails = () => {
  const { id } = useParams();
  const [jobStatus, setJobStatus] = useState('Active');

  // Mock job data - in real app, fetch based on ID
  const job = {
    id: parseInt(id),
    title: 'Software Engineer Intern',
    company: 'Google Inc.',
    location: 'Mountain View, CA',
    type: 'Internship',
    workMode: 'On-site',
    salary: '$8,000/month',
    posted: '2024-01-15',
    deadline: '2024-02-15',
    status: jobStatus,
    applications: 45,
    views: 234,
    description: `Join our team to work on cutting-edge technology and make an impact on billions of users worldwide. As a Software Engineer Intern at Google, you'll work alongside experienced engineers on real projects that affect millions of users.

You'll have the opportunity to work on various aspects of our technology stack, from frontend user interfaces to backend distributed systems. This internship provides hands-on experience with large-scale systems and the chance to contribute to products used by billions of people.`,
    requirements: [
      'Currently pursuing a Bachelor\'s or Master\'s degree in Computer Science or related field',
      'Proficiency in one or more programming languages (Python, Java, C++, JavaScript)',
      'Strong problem-solving and analytical skills',
      'Experience with data structures and algorithms',
      'Excellent communication and teamwork skills',
      'Previous internship or project experience preferred'
    ],
    responsibilities: [
      'Design and implement software solutions for complex problems',
      'Collaborate with cross-functional teams including product managers and designers',
      'Write clean, efficient, and well-documented code',
      'Participate in code reviews and technical discussions',
      'Contribute to the full software development lifecycle',
      'Learn and apply Google\'s engineering best practices'
    ],
    benefits: [
      'Competitive monthly stipend',
      'Housing assistance or corporate housing',
      'Free meals and snacks',
      'Access to Google\'s learning and development resources',
      'Mentorship from senior engineers',
      'Networking opportunities with other interns',
      'Potential for full-time offer upon graduation'
    ],
    skills: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'Git'],
    department: 'Engineering',
    contactEmail: 'recruiting@google.com'
  };

  const handleStatusChange = (newStatus) => {
    setJobStatus(newStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100';
      case 'Paused':
        return 'text-yellow-600 bg-yellow-100';
      case 'Closed':
        return 'text-red-600 bg-red-100';
      case 'Draft':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <div>
        <Link
          to="/recruiter/jobs"
          className="inline-flex items-center text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>
      </div>

      {/* Job Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                {job.status}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mt-2 text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                <span>{job.type} • {job.workMode}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="font-medium">{job.salary}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>Posted {job.posted}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Deadline: {job.deadline}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{job.applications} applications</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{job.views} views</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="h-5 w-5 text-gray-400" />
            </button>
            
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Edit className="h-5 w-5 text-gray-400" />
            </button>
            
            {job.status === 'Active' ? (
              <button
                onClick={() => handleStatusChange('Paused')}
                className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause Job
              </button>
            ) : job.status === 'Paused' ? (
              <button
                onClick={() => handleStatusChange('Active')}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="h-4 w-4 mr-2" />
                Activate Job
              </button>
            ) : null}
            
            <button className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{job.applications}</p>
              <p className="text-sm text-gray-600">Applications</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <Eye className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{job.views}</p>
              <p className="text-sm text-gray-600">Views</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-lg font-bold text-gray-900">15</p>
              <p className="text-sm text-gray-600">Days Left</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-lg font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Days Active</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Description */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>
            <div className="prose prose-gray max-w-none">
              {job.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Responsibilities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Responsibilities</h2>
            <ul className="space-y-2">
              {job.responsibilities.map((resp, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-2 w-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to={`/recruiter/applicants/${job.id}`}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Users className="h-4 w-4 mr-2" />
                View Applications ({job.applications})
              </Link>
              
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="h-4 w-4 mr-2" />
                Edit Job Post
              </button>
              
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="h-4 w-4 mr-2" />
                Share Job
              </button>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Department:</span>
                <span className="text-gray-900">{job.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Job Type:</span>
                <span className="text-gray-900">{job.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Work Mode:</span>
                <span className="text-gray-900">{job.workMode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact:</span>
                <span className="text-gray-900">{job.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Required Skills */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Application Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Job Posted</p>
                  <p className="text-xs text-gray-500">{job.posted}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Application Deadline</p>
                  <p className="text-xs text-gray-500">{job.deadline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobDetails;