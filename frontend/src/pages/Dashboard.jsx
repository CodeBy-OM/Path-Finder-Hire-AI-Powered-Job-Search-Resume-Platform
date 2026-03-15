import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FileText, Briefcase, Settings, CheckCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Path Finder Hire Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.name}! Here's your job application progress.
        </p>
      </div>

      {/* Profile Status */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Profile Complete</h3>
              <p className="text-sm text-gray-600">Your profile is 100% ready to go 🎉</p>
            </div>
          </div>
          <Link
            to="/profile"
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            View Profile
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-600 mt-1">Applied Jobs</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-600 mt-1">Saved Jobs</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-600 mt-1">Viewed Jobs</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-600 mt-1">Visited Links</div>
          </div>
        </div>
      </div>

      {/* AI Tools */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Tools</h2>
        <p className="text-gray-600 mb-6">
          Smart tools powered by AI to speed up your job search.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">AI CV Generator</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Generate an ATS-friendly CV tailored to your skills, experience, and job role.
            </p>
            <button
  onClick={() => navigate("/cv-builder")}
  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
>
  Generate CV
</button>

          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">AI Cover Letter</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Create job-specific cover letters in seconds using AI-powered insights.
            </p>
            <button
  onClick={() => navigate("/cover-letter")}
  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
>
  Generate Cover Letter
</button>

          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Application Wizard</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Auto-optimize your CV and cover letter for a specific job in one click.
            </p>
            <button
  onClick={() => navigate("/application-wizard")}
  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
>
  Start Application
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;