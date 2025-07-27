import React, { useState } from 'react';
import { 
  Bookmark, 
  BookmarkCheck, 
  Search, 
  Filter,
  Eye,
  Mail,
  Star,
  GraduationCap,
  MapPin,
  Briefcase,
  Trash2
} from 'lucide-react';

const RecruiterBookmarks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [bookmarkedCandidates, setBookmarkedCandidates] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      location: 'San Francisco, CA',
      university: 'Stanford University',
      major: 'Computer Science',
      graduationYear: '2025',
      gpa: '3.9',
      bookmarkedDate: '2024-01-20',
      skills: ['JavaScript', 'React', 'Python', 'Machine Learning'],
      experience: '2 years',
      rating: 4.8,
      appliedJobs: ['Software Engineer Intern', 'Frontend Developer'],
      avatar: '👩‍💻'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      location: 'Seattle, WA',
      university: 'University of Washington',
      major: 'Software Engineering',
      graduationYear: '2024',
      gpa: '3.7',
      bookmarkedDate: '2024-01-18',
      skills: ['Java', 'Spring Boot', 'Docker', 'AWS', 'Microservices'],
      experience: '1.5 years',
      rating: 4.5,
      appliedJobs: ['Backend Developer', 'DevOps Engineer'],
      avatar: '👨‍💼'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      location: 'Boston, MA',
      university: 'MIT',
      major: 'Computer Science',
      graduationYear: '2024',
      gpa: '3.8',
      bookmarkedDate: '2024-01-15',
      skills: ['Python', 'TensorFlow', 'Data Analysis', 'SQL', 'R'],
      experience: '3 years',
      rating: 4.9,
      appliedJobs: ['Data Science Intern', 'ML Engineer'],
      avatar: '👩‍🔬'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      location: 'Austin, TX',
      university: 'UT Austin',
      major: 'Computer Engineering',
      graduationYear: '2025',
      gpa: '3.6',
      bookmarkedDate: '2024-01-12',
      skills: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'MongoDB'],
      experience: '1 year',
      rating: 4.3,
      appliedJobs: ['Full Stack Developer', 'Frontend Engineer'],
      avatar: '👨‍🎓'
    },
    {
      id: 5,
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@email.com',
      location: 'Los Angeles, CA',
      university: 'UCLA',
      major: 'Computer Science',
      graduationYear: '2024',
      gpa: '3.9',
      bookmarkedDate: '2024-01-10',
      skills: ['UI/UX Design', 'Figma', 'React', 'CSS', 'JavaScript'],
      experience: '2.5 years',
      rating: 4.6,
      appliedJobs: ['UX Designer', 'Frontend Developer'],
      avatar: '👩‍🎨'
    }
  ]);

  const removeBookmark = (candidateId) => {
    setBookmarkedCandidates(prev => prev.filter(candidate => candidate.id !== candidateId));
  };

  const filteredCandidates = bookmarkedCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.major.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !skillFilter || candidate.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
    return matchesSearch && matchesSkill;
  });

  const allSkills = [...new Set(bookmarkedCandidates.flatMap(candidate => candidate.skills))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookmarked Candidates</h1>
            <p className="text-gray-600 mt-1">
              Keep track of promising candidates for future opportunities
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <BookmarkCheck className="h-6 w-6 text-yellow-500" />
            <span className="text-lg font-semibold text-gray-900">
              {bookmarkedCandidates.length} saved
            </span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="md:w-64">
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              {/* Card Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-xl">
                      {candidate.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm text-gray-600">{candidate.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeBookmark(candidate.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span>{candidate.university}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>{candidate.major} • GPA: {candidate.gpa}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{candidate.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        +{candidate.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Applied Jobs</h4>
                  <div className="space-y-1">
                    {candidate.appliedJobs.map((job, index) => (
                      <p key={index} className="text-xs text-gray-600">• {job}</p>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{candidate.experience} experience</span>
                  <span>Graduating {candidate.graduationYear}</span>
                </div>
                
                <p className="text-xs text-gray-500 mb-4">
                  Bookmarked on {candidate.bookmarkedDate}
                </p>
              </div>
              
              {/* Card Footer */}
              <div className="px-6 pb-6">
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Profile
                  </button>
                  <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Mail className="h-4 w-4 mr-1" />
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || skillFilter ? 'No candidates found' : 'No bookmarked candidates yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || skillFilter 
              ? 'Try adjusting your search or filter criteria.'
              : 'Start bookmarking promising candidates to keep track of them for future opportunities.'
            }
          </p>
          <div className="flex justify-center space-x-3">
            {(searchTerm || skillFilter) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSkillFilter('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            )}
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Browse Candidates
            </button>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      {filteredCandidates.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{filteredCandidates.length}</p>
              <p className="text-sm text-gray-600">Total Bookmarked</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {(filteredCandidates.reduce((sum, c) => sum + c.rating, 0) / filteredCandidates.length).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {new Set(filteredCandidates.flatMap(c => c.skills)).size}
              </p>
              <p className="text-sm text-gray-600">Unique Skills</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {new Set(filteredCandidates.map(c => c.university)).size}
              </p>
              <p className="text-sm text-gray-600">Universities</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterBookmarks;