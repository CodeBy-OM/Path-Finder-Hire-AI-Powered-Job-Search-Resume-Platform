import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import CVSection from "./CVSection";

const ProfileSidebar = () => {
  const { user, fetchProfile } = useAuth();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  // 🔹 PROFILE PHOTO UPLOAD
const handlePhotoUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("photo", file);

  try {
    setUploading(true);

    await axios.post(
      "http://localhost:5000/api/upload/profile-photo",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    await fetchProfile(); // ✅ refresh user
  } catch (err) {
    console.error(err);
    alert("Photo upload failed");
  } finally {
    setUploading(false);
  }
};


  return (
    <div className="bg-white border rounded-xl p-6 text-center space-y-5">

      {/* PROFILE PHOTO */}
      <div className="flex flex-col items-center">
        <img
          src={
            user?.profilePhoto
              ? `http://localhost:5000${user.profilePhoto}`
              : "https://via.placeholder.com/120"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />

        <label className="mt-2 text-sm text-blue-600 cursor-pointer">
          {uploading ? "Uploading..." : "Change Photo"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handlePhotoUpload}
          />
        </label>
      </div>

      {/* USER INFO */}
      <div>
        <h2 className="text-xl font-semibold">{user?.name}</h2>
        <p className="text-sm text-gray-500">{user?.email}</p>

        {user?.designation && (
          <p className="text-sm mt-1">{user.designation}</p>
        )}
        {user?.location && (
          <p className="text-sm text-gray-500">{user.location}</p>
        )}
      </div>

      {/* EDIT PROFILE */}
      <button
        onClick={() => navigate("/profile/edit")}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Edit Profile
      </button>

      {/* 🔥 CV SECTION (Drag & Drop + View CV) */}
      <CVSection />
    </div>
  );
};

export default ProfileSidebar;
