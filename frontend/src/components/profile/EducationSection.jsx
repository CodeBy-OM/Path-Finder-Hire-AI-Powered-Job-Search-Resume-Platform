import { useState } from "react";
import axios from "axios";

const emptyForm = {
  degree: "",
  college: "",
  field: "",
  startDate: "",
  endDate: "",
  cgpa: "",
};

const EducationSection = ({ profile, setProfile }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const openAddForm = () => {
    setEditingEdu(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (edu) => {
    setEditingEdu(edu);
    setForm(edu);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      const res = editingEdu
        ? await axios.put(
            `http://localhost:5000/api/user/education/${editingEdu._id}`,
            form
          )
        : await axios.post(
            "http://localhost:5000/api/user/education",
            form
          );

      setProfile(res.data); // UPDATED USER PROFILE
      setShowForm(false);
    } catch (err) {
      alert("Failed to save education");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this education?")) return;

    const res = await axios.delete(
      `http://localhost:5000/api/user/education/${id}`
    );
    setProfile(res.data);
  };

  return (
    <div className="bg-white border rounded-xl p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Education : {profile.education?.length || 0}
        </h2>
        <button
          onClick={openAddForm}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add
        </button>
      </div>

      {/* EDUCATION LIST */}
      {profile.education?.map((edu) => (
        <div
          key={edu._id}
          className="border rounded-lg p-4 mb-4 relative"
        >
          <h3 className="font-semibold">{edu.degree}</h3>
          <p className="text-blue-600">{edu.college}</p>
          <p>{edu.field}</p>
          <p>
            {edu.startDate} – {edu.endDate}
          </p>
          <p>CGPA: {edu.cgpa}</p>

          {/* ACTIONS */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => openEditForm(edu)}
              className="text-blue-600"
            >
              ✏️
            </button>
            <button
              onClick={() => handleDelete(edu._id)}
              className="text-red-600"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingEdu ? "Edit Education" : "Add Education"}
            </h3>

            {[
              ["degree", "Degree"],
              ["college", "College"],
              ["field", "Field"],
              ["startDate", "Start Date"],
              ["endDate", "End Date"],
              ["cgpa", "CGPA"],
            ].map(([key, label]) => (
              <input
                key={key}
                placeholder={label}
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                className="w-full border p-2 rounded mb-2"
              />
            ))}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationSection;
