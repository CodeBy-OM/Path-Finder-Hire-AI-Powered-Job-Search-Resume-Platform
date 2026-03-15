import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FileText, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/applications/my-applications');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'reviewed':
        return <Eye className="h-5 w-5 text-blue-500" />;
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const stats = {
    all: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    reviewed: applications.filter((a) => a.status === 'reviewed').length,
    accepted: applications.filter((a) => a.status === 'accepted').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MY APPLICATIONS</h1>
        <p className="text-gray-600">Track your career journey</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`p-4 rounded-lg border-2 transition-all ${
            filter === 'all'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-bold text-gray-900">{stats.all}</div>
          <div className="text-sm text-gray-600">Applied Jobs</div>
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`p-4 rounded-lg border-2 transition-all ${
            filter === 'pending'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </button>
        <button
          onClick={() => setFilter('reviewed')}
          className={`p-4 rounded-lg border-2 transition-all ${
            filter === 'reviewed'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-bold text-gray-900">{stats.reviewed}</div>
          <div className="text-sm text-gray-600">Reviewed</div>
        </button>
        <button
          onClick={() => setFilter('accepted')}
          className={`p-4 rounded-lg border-2 transition-all ${
            filter === 'accepted'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-bold text-gray-900">{stats.accepted}</div>
          <div className="text-sm text-gray-600">Accepted</div>
        </button>
        <button
          onClick={() => setFilter('rejected')}
          className={`p-4 rounded-lg border-2 transition-all ${
            filter === 'rejected'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-bold text-gray-900">{stats.rejected}</div>
          <div className="text-sm text-gray-600">Rejected</div>
        </button>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-lg shadow-sm">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all'
                ? "You haven't applied to any jobs yet."
                : `No applications with status "${filter}".`}
            </p>
            <Link
              to="/jobs"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <div key={application._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link
                      to={`/jobs/${application.job._id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                    >
                      {application.job.title}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">{application.job.company}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <span>{application.job.location}</span>
                      <span>•</span>
                      <span>{application.job.type}</span>
                      <span>•</span>
                      <span>Applied {new Date(application.appliedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(application.status)}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          application.status
                        )}`}
                      >
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                {application.coverLetter && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700 line-clamp-3">{application.coverLetter}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;