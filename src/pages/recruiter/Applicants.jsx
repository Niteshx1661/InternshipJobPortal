import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  GraduationCap,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

const RecruiterApplicants = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const applicants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      university: 'Stanford University',
      major: 'Computer Science',
      gpa: '3.9',
      graduationYear: '2025',
      appliedDate: '2024-01-20',
      status: 'Under Review',
      statusColor: 'text-yellow-600 bg-yellow-100',
      experience: '2 years',
      skills: ['JavaScript', 'React', 'Python', 'SQL'],
      resumeUrl: '#',
      coverLetter: 'I am excited to apply for the Software Engineer Intern position...',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      location: 'Seattle, WA',
      university: 'University of Washington',
      major: 'Software Engineering',
      gpa: '3.7',
      graduationYear: '2025',
      appliedDate: '2024-01-19',
      status: 'Shortlisted',
      statusColor: 'text-green-600 bg-green-100',
      experience: '1.5 years',
      skills: ['Java', 'Spring', 'Docker', 'AWS'],
      resumeUrl: '#',
      coverLetter: 'With my strong background in software development...',
      rating: 4.2
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 345-6789',
      location: 'Boston, MA',
      university: 'MIT',
      major: 'Computer Science',
      gpa: '3.8',
      graduationYear: '2024',
      appliedDate: '2024-01-18',
      status: 'Interview Scheduled',
      statusColor: 'text-blue-600 bg-blue-100',
      experience: '3 years',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis'],
      resumeUrl: '#',
      coverLetter: 'I am passionate about leveraging technology to solve complex problems...',
      rating: 4.8
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      university: 'UT Austin',
      major: 'Computer Engineering',
      gpa: '3.6',
      graduationYear: '2025',
      appliedDate: '2024-01-17',
      status: 'Rejected',
      statusColor: 'text-red-600 bg-red-100',
      experience: '1 year',
      skills: ['C++', 'Embedded Systems', 'IoT', 'Hardware'],
      resumeUrl: '#',
      coverLetter: 'My experience in embedded systems and hardware development...',
      rating: 3.5
    },
    {
      id: 5,
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@email.com',
      phone: '+1 (555) 567-8901',
      location: 'Los Angeles, CA',
      university: 'UCLA',
      major: 'Computer Science',
      gpa: '3.9',
      graduationYear: '2024',
      appliedDate: '2024-01-16',
      status: 'New',
      statusColor: 'text-gray-600 bg-gray-100',
      experience: '2.5 years',
      skills: ['JavaScript', 'Node.js', 'MongoDB', 'GraphQL'],
      resumeUrl: '#',
      coverLetter: 'I am thrilled to submit my application for the Software Engineer position...',
      rating: 4.3
    }
  ];

  const jobTitle = 'Software Engineer Intern';

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = !statusFilter || applicant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedApplicants = [...filteredApplicants].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      case 'gpa':
        return parseFloat(b.gpa) - parseFloat(a.gpa);
      case 'date':
      default:
        return new Date(b.appliedDate) - new Date(a.appliedDate);
    }
  });

  const statusCounts = applicants.reduce((acc, applicant) => {
    acc[applicant.status] = (acc[applicant.status] || 0) + 1;
    return acc;
  }, {});

  const handleStatusChange = (applicantId, newStatus) => {
    console.log(`Changing status for applicant ${applicantId} to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
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

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applicants for {jobTitle}</h1>
            <p className="text-gray-600 mt-1">Review and manage job applications</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{applicants.length}</p>
            <p className="text-sm text-blue-800">Total Applications</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-gray-600">{statusCounts['New'] || 0}</p>
            <p className="text-sm text-gray-800">New</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{statusCounts['Under Review'] || 0}</p>
            <p className="text-sm text-yellow-800">Under Review</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{statusCounts['Shortlisted'] || 0}</p>
            <p className="text-sm text-green-800">Shortlisted</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{statusCounts['Interview Scheduled'] || 0}</p>
            <p className="text-sm text-purple-800">Interviews</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="rating">Sort by Rating</option>
              <option value="gpa">Sort by GPA</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applicants List */}
      <div className="space-y-4">
        {sortedApplicants.map((applicant) => (
          <div key={applicant.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {applicant.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{applicant.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${applicant.statusColor}`}>
                      {applicant.status}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{applicant.rating}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{applicant.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{applicant.phone}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{applicant.location}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        <span>{applicant.university}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span>{applicant.major} • GPA: {applicant.gpa}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span>Graduating {applicant.graduationYear} • {applicant.experience} experience</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {applicant.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-700 line-clamp-2">{applicant.coverLetter}</p>
                  
                  <p className="text-xs text-gray-500 mt-2">Applied on {applicant.appliedDate}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="View Profile"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <a
                  href={applicant.resumeUrl}
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  title="Download Resume"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <div className="flex space-x-2">
                {applicant.status === 'New' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(applicant.id, 'Under Review')}
                      className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm hover:bg-yellow-200 transition-colors"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => handleStatusChange(applicant.id, 'Rejected')}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
                
                {applicant.status === 'Under Review' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(applicant.id, 'Shortlisted')}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200 transition-colors"
                    >
                      Shortlist
                    </button>
                    <button
                      onClick={() => handleStatusChange(applicant.id, 'Rejected')}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200 transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}
                
                {applicant.status === 'Shortlisted' && (
                  <button
                    onClick={() => handleStatusChange(applicant.id, 'Interview Scheduled')}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200 transition-colors"
                  >
                    Schedule Interview
                  </button>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  View Profile
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {sortedApplicants.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No applicants found</h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter 
              ? 'Try adjusting your search or filter criteria.'
              : 'No applications have been received for this job yet.'
            }
          </p>
        </div>
      )}

      {/* Pagination */}
      {sortedApplicants.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing {sortedApplicants.length} of {applicants.length} applicants
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterApplicants;