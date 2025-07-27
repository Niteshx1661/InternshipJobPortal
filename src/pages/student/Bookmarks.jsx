import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, 
  BookmarkCheck, 
  MapPin, 
  Building, 
  Briefcase, 
  DollarSign,
  Clock,
  Search,
  Filter,
  Trash2,
  Eye
} from 'lucide-react';

const StudentBookmarks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [bookmarkedJobs, setBookmarkedJobs] = useState([
    {
      id: 1,
      title: 'Software Engineer Intern',
      company: 'Google',
      location: 'Mountain View, CA',
      type: 'Internship',
      salary: '$8,000/month',
      bookmarkedDate: '2024-01-20',
      posted: '2 days ago',
      description: 'Join our team to work on cutting-edge technology and make an impact on billions of users worldwide.',
      tags: ['Python', 'Java', 'Algorithms'],
      logo: '🔍'
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      type: 'Internship',
      salary: '$8,500/month',
      bookmarkedDate: '2024-01-18',
      posted: '3 days ago',
      description: 'Analyze user behavior data to improve content recommendations and user experience.',
      tags: ['Python', 'Machine Learning', 'Statistics'],
      logo: '🎬'
    },
    {
      id: 7,
      title: 'Frontend Developer',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$130,000/year',
      bookmarkedDate: '2024-01-15',
      posted: '1 week ago',
      description: 'Build beautiful and intuitive user interfaces for millions of travelers worldwide.',
      tags: ['React', 'TypeScript', 'CSS'],
      logo: '🏠'
    },
    {
      id: 9,
      title: 'Product Manager Intern',
      company: 'Stripe',
      location: 'Remote',
      type: 'Internship',
      salary: '$7,500/month',
      bookmarkedDate: '2024-01-12',
      posted: '5 days ago',
      description: 'Help shape the future of online payments and financial infrastructure.',
      tags: ['Product Strategy', 'Analytics', 'Communication'],
      logo: '💳'
    },
    {
      id: 11,
      title: 'Mobile Developer',
      company: 'Uber',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$140,000/year',
      bookmarkedDate: '2024-01-10',
      posted: '1 week ago',
      description: 'Develop mobile applications that connect millions of riders and drivers.',
      tags: ['React Native', 'iOS', 'Android'],
      logo: '🚗'
    }
  ]);

  const removeBookmark = (jobId) => {
    setBookmarkedJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const filteredJobs = bookmarkedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || job.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const groupedJobs = filteredJobs.reduce((acc, job) => {
    if (!acc[job.type]) {
      acc[job.type] = [];
    }
    acc[job.type].push(job);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookmarked Jobs</h1>
            <p className="text-gray-600 mt-1">
              Keep track of jobs you're interested in
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <BookmarkCheck className="h-6 w-6 text-yellow-500" />
            <span className="text-lg font-semibold text-gray-900">
              {bookmarkedJobs.length} saved
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
                placeholder="Search bookmarked jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="md:w-48">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="Internship">Internships</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookmarked Jobs */}
      {Object.keys(groupedJobs).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(groupedJobs).map(([type, jobs]) => (
            <div key={type} className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {type} ({jobs.length})
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="text-3xl">{job.logo}</div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                              <Link to={`/student/jobs/${job.id}`}>{job.title}</Link>
                            </h3>
                            
                            <div className="flex items-center space-x-4 mt-2 text-gray-600">
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-1" />
                                <span>{job.company}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                <span>{job.salary}</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 mt-2 line-clamp-2">{job.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mt-3">
                              {job.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>Posted {job.posted}</span>
                                </div>
                                <div className="flex items-center">
                                  <Bookmark className="h-4 w-4 mr-1" />
                                  <span>Saved {job.bookmarkedDate}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Link
                            to={`/student/jobs/${job.id}`}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="View Job"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => removeBookmark(job.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Remove Bookmark"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-100">
                        <Link
                          to={`/student/jobs/${job.id}`}
                          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          View Details
                        </Link>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
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
            {searchTerm || typeFilter ? 'No bookmarks found' : 'No bookmarked jobs yet'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || typeFilter 
              ? 'Try adjusting your search or filter criteria.'
              : 'Start bookmarking jobs you\'re interested in to keep track of them here.'
            }
          </p>
          <div className="flex justify-center space-x-3">
            {(searchTerm || typeFilter) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            )}
            <Link
              to="/student/jobs"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentBookmarks;