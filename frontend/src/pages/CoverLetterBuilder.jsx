import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CoverLetterBuilder = () => {
  const { user } = useAuth();
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const generateLetter = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/ai/cover-letter",
        user
      );
      setLetter(res.data.letter);
    } catch (err) {
      console.error("Cover letter error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateLetter();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">AI Cover Letter Preview</h1>

      {loading ? (
        <p>Generating cover letter...</p>
      ) : (
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
          {letter}
        </pre>
      )}
    </div>
  );
};

export default CoverLetterBuilder;
