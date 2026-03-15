import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    designation: user?.designation || "",
    location: user?.location || "",
  });
console.log("SAVE CLICKED", form);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(form);
    navigate("/profile");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
      <input
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <input
        placeholder="Designation (e.g. Full Stack Developer)"
        value={form.designation}
        onChange={(e) => setForm({ ...form, designation: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <input
        placeholder="Location (e.g. Ghaziabad)"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <button
      type="submit"   
    className="bg-blue-600 text-white px-4 py-2 rounded"
     >
        Save Profile
      </button>
    </form>
  );
};

export default EditProfile;
