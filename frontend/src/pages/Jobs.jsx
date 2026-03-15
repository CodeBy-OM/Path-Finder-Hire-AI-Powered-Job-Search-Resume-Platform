import { useEffect, useState } from "react";
import axios from "axios";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs")
      .then(res => setJobs(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>

      {jobs.map(job => (
        <div key={job._id} className="border p-4 mb-3 rounded">
          <h3 className="font-bold">{job.title}</h3>
          <p>{job.company} — {job.location}</p>
        </div>
      ))}
    </div>
  );
}
