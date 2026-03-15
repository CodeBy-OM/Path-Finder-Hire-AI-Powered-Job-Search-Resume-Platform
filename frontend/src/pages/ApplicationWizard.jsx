import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ApplicationWizard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const runWizard = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/wizard",
        user
      );
      setData(res.data);
    } catch (err) {
      console.error("Wizard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runWizard();
  }, []);

  if (loading) {
    return <p className="p-6">Running application wizard...</p>;
  }

  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Application Wizard</h1>

      <div className="bg-green-100 p-4 rounded">
        <b>Suggested Role:</b> {data.suggestedRole}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <p><b>Profile Strength:</b> {data.profileStrength}</p>
        <p><b>Skill Match:</b> {data.skillMatch}</p>
        <p><b>CV Status:</b> {data.cvStatus}</p>
      </div>

      {data.missingSkills.length > 0 && (
        <div className="bg-yellow-100 p-4 rounded">
          <b>Suggested Skills to Add:</b>
          <ul className="list-disc ml-5">
            {data.missingSkills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white p-4 rounded shadow">
        <b>Optimized Profile Summary</b>
        <p className="mt-2">{data.optimizedSummary}</p>
      </div>

      <div className="bg-blue-50 p-4 rounded">
        <b>Cover Letter Tip</b>
        <p>{data.coverLetterTip}</p>
      </div>
    </div>
  );
};

export default ApplicationWizard;
