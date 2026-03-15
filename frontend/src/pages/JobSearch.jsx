// frontend/src/pages/JobSearch.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from '../components/JobCard';
import { Search, Filter, Loader } from 'lucide-react';

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (location) params.location = location;
      if (type) params.type = type;

      const response = await axios.get('http://localhost:5000/api/jobs', { params });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Job Search</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title or Company
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="e.g. Software Engineer, Google"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. New York, NY"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Search className="h-4 w-4 mr-2" />
              Search Jobs
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {jobs.length} Jobs Found
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No jobs found. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearch;
