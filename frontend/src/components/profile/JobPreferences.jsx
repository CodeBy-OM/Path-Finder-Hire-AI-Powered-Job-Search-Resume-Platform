import { useState } from "react";
import axios from "axios";

const JobPreferenceSection = ({ profile, setProfile }) => {
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    role: profile?.jobPreferences?.role || "",
    location: profile?.jobPreferences?.location || "",
    jobType: profile?.jobPreferences?.jobType || "",
  });

  const savePreferences = async () => {
    const res = await axios.put(
      "http://localhost:5000/api/user/job-preferences",
      form
    );

    // 🔥 THIS LINE FIXES EVERYTHING
    setProfile(res.data);

    setEditing(false);
  };

  if (!editing) {
    return (
      <div className="bg-white p-6 rounded-xl">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Job Preferences</h2>
          <button
            className="text-blue-600"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        </div>

        <p><b>Role:</b> {profile?.jobPreferences?.role || "-"}</p>
        <p><b>Location:</b> {profile?.jobPreferences?.location || "-"}</p>
        <p><b>Job Type:</b> {profile?.jobPreferences?.jobType || "-"}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl space-y-3">
      <h2 className="text-xl font-semibold">Job Preferences</h2>

      <input
            className="input"
            placeholder="Preferred Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <input
            className="input"
            placeholder="Preferred Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <input
            className="input"
            placeholder="Job Type (Full-time, Remote, etc.)"
            value={form.jobType}
            onChange={(e) => setForm({ ...form, jobType: e.target.value })}
          />
      <div className="flex gap-3">
        <button
          onClick={savePreferences}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>

        <button
          onClick={() => setEditing(false)}
          className="text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default JobPreferenceSection;

