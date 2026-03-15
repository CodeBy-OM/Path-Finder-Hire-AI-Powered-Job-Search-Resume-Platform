import { useState } from "react";
import axios from "axios";

const ProjectSection = ({ profile, setProfile }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
  });

  const addProject = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/user/projects",
      form
    );
    setProfile(res.data);
    setShowForm(false);
    setForm({ title: "", description: "", link: "" });
  };

  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          + Add
        </button>
      </div>

      {profile?.projects?.length === 0 && (
        <p className="text-gray-500">No projects added yet</p>
      )}

      {profile?.projects?.map((project) => (
        <div key={project._id} className="border p-4 rounded mb-3">
          <h3 className="font-semibold">{project.title}</h3>
          <p className="text-sm text-gray-600">{project.description}</p>
        </div>
      ))}

      {showForm && (
        <div className="space-y-2 mt-4">
          <input
            placeholder="Project Title"
            className="input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="input"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button
            onClick={addProject}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Save Project
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
