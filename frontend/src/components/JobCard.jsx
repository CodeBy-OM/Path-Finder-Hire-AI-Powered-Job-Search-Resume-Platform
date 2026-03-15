import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <Link
      to={`/jobs/${job._id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{job.company}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
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
              {new Date(job.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        {job.salary && (
          <div className="text-right">
            <p className="text-sm font-medium text-green-600">
              ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()}
            </p>
          </div>
        )}
      </div>
      <p className="mt-4 text-sm text-gray-600 line-clamp-2">{job.description}</p>
    </Link>
  );
};

export default JobCard;