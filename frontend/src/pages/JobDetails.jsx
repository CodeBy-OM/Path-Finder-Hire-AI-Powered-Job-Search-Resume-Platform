import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { MapPin, Briefcase, Clock, DollarSign, Building } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [showApplyForm, setShowApplyForm] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setApplying(true);
    try {
      await axios.post('http://localhost:5000/api/applications', {
        job: id,
        coverLetter,
      });
      alert('Application submitted successfully!');
      setShowApplyForm(false);
      setCoverLetter('');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!job) {
    return <div className="text-center py-12">Job not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <div className="flex items-center text-lg text-gray-600 mb-4">
            <Building className="h-5 w-5 mr-2" />
            {job.company}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {job.location}
            </span>
            <span className="flex items-center">
              <Briefcase className="h-4 w-4 mr-1" />
              {job.type}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Posted {new Date(job.createdAt).toLocaleDateString()}
            </span>
            {job.salary && (
              <span className="flex items-center text-green-600 font-medium">
                <DollarSign className="h-4 w-4 mr-1" />
                ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        {job.requirements && job.requirements.length > 0 && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t border-gray-200 pt-6">
          {!showApplyForm ? (
            <button
              onClick={() => setShowApplyForm(true)}
              className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Apply Now
            </button>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us why you're a great fit for this role..."
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={applying}
                  className="flex-1 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowApplyForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
