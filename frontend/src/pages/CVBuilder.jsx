import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CVBuilder = () => {
  const { user } = useAuth();
  const [cv, setCV] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCV = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/ai/cv",
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCV(res.data.cv);
    } catch (err) {
      console.error("CV generation error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      generateCV();
    }
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">ATS CV Preview</h1>

      {loading ? (
        <p>Generating CV...</p>
      ) : (
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
          {cv}
        </pre>
      )}
    </div>
  );
};

export default CVBuilder;
