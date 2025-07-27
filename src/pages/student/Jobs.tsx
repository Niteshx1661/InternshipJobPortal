import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  Filter,
  Bookmark,
  BookmarkCheck,
  Building,
  DollarSign,
  Calendar
} from 'lucide-react';

const StudentJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set([1, 3]));

  const jobs = [
    {
      id: 1,
      title: 'Software Engineer Intern',
      company: 'Google',
      location: 'Mountain View, CA',
      type: 'Internship',
      salary: '$8,000/month',
      posted: '2 days ago',
      description: 'Join our team to work on cutting-edge technology and make an impact on billions of users worldwide.',
      requirements: ['Computer Science or related field', 'Proficiency in Python or Java', 'Strong problem-solving skills'],
      logo: '🔍'
    },
    {
      id: 2,
      title: 'Product Manager Intern',
      company: 'Microsoft',
      location: 'Seattle, WA',
      type: 'Internship',
      salary: '$7,500/month',
      posted: '1 day ago',
      description: 'Work with cross-functional teams to define product strategy and drive product development.',
      requirements: ['Business or Engineering background', 'Analytical thinking', 'Communication skills'],
      logo: '🪟'
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      type: 'Internship',
      salary: '$8,500/month',
      posted: '3 days ago',
      description: 'Analyze user behavior data to improve content recommendations and user experience.',
      requirements: ['Statistics or Data Science background', 'Python/R proficiency', 'Machine Learning knowledge'],
      logo: '🎬'
    },
    {
      id: 4,
      title: 'UX Design Intern',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      type: 'Internship',
      salary: '$7,000/month',
      posted: '1 week ago',
      description: 'Design intuitive user experiences for millions of travelers around the world.',
      requirements: ['Design portfolio', 'Figma/Sketch proficiency', 'User research experience'],
      logo: '🏠'
    },
    {
      id: 5,
      title: 'Marketing Intern',
      company: 'Spotify',
      location: 'New York, NY',
      type: 'Internship',
      salary: '$6,500/month',
      posted: '4 days ago',
      description: 'Help develop marketing campaigns for music streaming platform with 400M+ users.',
      requirements: ['Marketing or Communications major', 'Social media experience', 'Creative thinking'],
      logo: '🎵'
    },
    {
      id: 6,
      title: 'Full Stack Developer',
      company: 'Stripe',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120,000/year',
      posted: '5 days ago',
      description: 'Build and maintain payment infrastructure used by millions of businesses worldwide.',
      requirements: ['3+ years experience', 'React/Node.js', 'Payment systems knowledge'],
      logo: '💳'
    }
  ];

  const toggleBookmark = (jobId) => {
    setBookmarkedJobs(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(jobId)) {
        newBookmarks.delete(jobId);
      } else {
        newBookmarks.add(jobId);
      }
      return newBookmarks;
    });
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !jobTypeFilter || job.type === jobTypeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Browse Jobs & Internships</h1>
        
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search jobs, companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <div className="relative">
              <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <select
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <p className="text-gray-600">
          Showing {filteredJobs.length} of {jobs.length} jobs
        </p>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{job.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                        <Link to={`/student/jobs/${job.id}`}>{job.title}</Link>
                      </h3>
                      <button
                        onClick={() => toggleBookmark(job.id)}
                        className="text-gray-400 hover:text-yellow-500 transition-colors"
                      >
                        {bookmarkedJobs.has(job.id) ? (
                          <BookmarkCheck className="h-6 w-6 text-yellow-500" />
                        ) : (
                          <Bookmark className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                    
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
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mt-3 line-clamp-2">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.requirements.slice(0, 3).map((req, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Posted {job.posted}</span>
                      </div>
                      
                      <div className="flex space-x-3">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filteredJobs.length > 0 && (
        <div className="text-center">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Load More Jobs
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find more opportunities.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setLocationFilter('');
              setJobTypeFilter('');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentJobs;