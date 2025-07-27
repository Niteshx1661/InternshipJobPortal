import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Building,
  Calendar,
  Bookmark,
  BookmarkCheck,
  Share2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  deadline: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  companyInfo: {
    size: string;
    industry: string;
    founded: string;
    website: string;
  };
  logo: string;
};

const StudentJobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Mock job data - in real app, fetch based on ID
  const job: Job = {
    id: id ? parseInt(id) : 0,
    title: 'Software Engineer Intern',
    company: 'Google',
    location: 'Mountain View, CA',
    type: 'Internship',
    salary: '$8,000/month',
    posted: '2 days ago',
    deadline: '2024-02-15',
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
    companyInfo: {
      size: '100,000+ employees',
      industry: 'Technology',
      founded: '1998',
      website: 'https://google.com'
    },
    logo: '🔍'
  };

  const handleApply = () => {
    setShowApplicationModal(true);
  };

  const submitApplication = () => {
    setHasApplied(true);
    setShowApplicationModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <div>
        <Link
          to="/student/jobs"
          className="inline-flex items-center text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>
      </div>

      {/* Job Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="text-5xl">{job.logo}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <div className="flex items-center space-x-4 mt-2 text-gray-600">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{job.type}</span>
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
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-yellow-500" />
              ) : (
                <Bookmark className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="h-5 w-5 text-gray-400" />
            </button>
            
            {hasApplied ? (
              <div className="flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                <CheckCircle className="h-4 w-4 mr-2" />
                Applied
              </div>
            ) : (
              <button
                onClick={handleApply}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </button>
            )}
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
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
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
                  <div className="h-2 w-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h2>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Industry:</span>
                <span className="text-gray-900">{job.companyInfo.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Company Size:</span>
                <span className="text-gray-900">{job.companyInfo.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Founded:</span>
                <span className="text-gray-900">{job.companyInfo.founded}</span>
              </div>
            </div>
            <a
              href={job.companyInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-blue-600 hover:text-blue-500"
            >
              Visit Company Website →
            </a>
          </div>

          {/* Application Deadline */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Application Deadline</p>
                <p className="text-sm text-yellow-700">{job.deadline}</p>
              </div>
            </div>
          </div>

          {/* Similar Jobs */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
            <div className="space-y-3">
              {[
                { title: 'Frontend Developer Intern', company: 'Facebook', match: '92%' },
                { title: 'Backend Engineer Intern', company: 'Amazon', match: '88%' },
                { title: 'Full Stack Developer', company: 'Netflix', match: '85%' }
              ].map((similarJob, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors">
                  <h4 className="font-medium text-gray-900 text-sm">{similarJob.title}</h4>
                  <p className="text-sm text-gray-600">{similarJob.company}</p>
                  <span className="text-xs text-green-600 font-medium">{similarJob.match} match</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for {job.title}</h3>
            <p className="text-gray-600 mb-4">
              You're about to apply for this position at {job.company}. Make sure your profile is up to date.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowApplicationModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitApplication}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentJobDetails;