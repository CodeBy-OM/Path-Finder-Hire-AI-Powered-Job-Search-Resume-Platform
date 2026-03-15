import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useState } from "react";

const CVSection = () => {
  const { user, updateUserLocal } = useAuth();
  const [uploading, setUploading] = useState(false);

  const handleCvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("cv", file);

    try {
      setUploading(true);

      const token = localStorage.getItem("token"); // ✅ REQUIRED

      const res = await axios.post(
        "http://localhost:5000/api/upload/cv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // 🔥 FIX
          },
        }
      );

      // ✅ update UI instantly
      updateUserLocal(res.data);

      alert("CV uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("CV upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* VIEW CV */}
      {user?.resume && (
        <a
          href={`http://localhost:5000${user.resume}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block border py-2 rounded-md hover:bg-gray-50"
        >
          📄 View Uploaded CV
        </a>
      )}

      {/* DRAG & DROP */}
      <label className="block border-dashed border-2 p-4 rounded-md text-sm text-gray-500 cursor-pointer hover:bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          ⬆️
          <p>{uploading ? "Uploading..." : "Drag & drop your CV"}</p>
          <p className="text-xs">or click to browse (PDF, DOC, DOCX)</p>
        </div>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          hidden
          onChange={handleCvUpload}
        />
      </label>
    </div>
  );
};

export default CVSection;
