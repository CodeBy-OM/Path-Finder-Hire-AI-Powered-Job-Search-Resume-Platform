import { Link } from 'react-router-dom';
import { Search, Briefcase, Users, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Dream Job with AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Transform your recruitment journey with AI-powered placement solutions
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
            >
              <Search className="mr-2 h-5 w-5" />
              Start Job Search
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
              <Briefcase className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Thousands of Jobs</h3>
            <p className="text-gray-600">
              Access opportunities from top companies across industries
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Matching</h3>
            <p className="text-gray-600">
              Get matched with jobs that fit your skills and preferences
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
            <p className="text-gray-600">
              Tools and resources to advance your professional journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
