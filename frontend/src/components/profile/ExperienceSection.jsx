import { useState } from "react";
import axios from "axios";

const ExperienceSection = ({ profile, setProfile }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    role: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const addExperience = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/user/experience",
      form
    );
    setProfile(res.data);
    setShowForm(false);
    setForm({
      role: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          + Add
        </button>
      </div>

      {/* EXISTING EXPERIENCE */}
      {profile?.experience?.length === 0 && (
        <p className="text-gray-500">No experience added yet</p>
      )}

      {profile?.experience?.map((exp) => (
        <div key={exp._id} className="border p-4 rounded mb-3">
          <h3 className="font-semibold">{exp.role}</h3>
          <p>{exp.company}</p>
          <p className="text-sm text-gray-500">{exp.location}</p>
        </div>
      ))}

      {/* ADD FORM */}
      {showForm && (
        <div className="border p-4 rounded mt-4 space-y-2">
          <input
            placeholder="Role"
            className="input"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <input
            placeholder="Company"
            className="input"
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <input
            placeholder="Location"
            className="input"
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <button onClick={addExperience} className="bg-blue-600 text-white px-4 py-1 rounded">
            Save Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;
