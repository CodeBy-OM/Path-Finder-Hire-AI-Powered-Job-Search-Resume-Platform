import { useState } from "react";
import axios from "axios";

const SkillsSection = ({ profile, setProfile }) => {
  const [skill, setSkill] = useState("");

  const addSkill = async () => {
    if (!skill.trim()) return;

    const updatedSkills = [...(profile.skills || []), skill.trim()];

    const res = await axios.put(
      "http://localhost:5000/api/user/skills",
      { skills: updatedSkills }
    );

    setProfile(res.data);
    setSkill("");
  };

  const removeSkill = async (removeIndex) => {
    const updatedSkills = profile.skills.filter(
      (_, i) => i !== removeIndex
    );

    const res = await axios.put(
      "http://localhost:5000/api/user/skills",
      { skills: updatedSkills }
    );

    setProfile(res.data);
  };

  return (
    <div className="bg-white p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Skills</h2>

      {/* SKILL CHIPS */}
      <div className="flex flex-wrap gap-2 mb-4">
        {profile?.skills?.length > 0 ? (
          profile.skills.map((s, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {s}
              <button
                onClick={() => removeSkill(i)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))
        ) : (
          <p className="text-gray-500">No skills added</p>
        )}
      </div>

      {/* ADD SKILL */}
      <div className="flex gap-2">
        <input
          className="border p-2 rounded w-full"
          placeholder="Add skill (e.g. React)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button
          onClick={addSkill}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default SkillsSection;
