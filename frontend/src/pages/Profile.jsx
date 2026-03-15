import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import ProfileSidebar from "../components/profile/ProfileSidebar";
import EducationSection from "../components/profile/EducationSection";
import ExperienceSection from "../components/profile/ExperienceSection";
import ProjectSection from "../components/profile/ProjectSection";
import SkillsSection from "../components/profile/SkillsSection";
import JobPreferences from "../components/profile/JobPreferences";

const tabs = [
  "education",
  "experience",
  "project",
  "skills",
  "job-preferences",
];

const Profile = () => {
  const { user, fetchProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("education");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      await fetchProfile();
    };
    loadProfile();
  }, []);

  useEffect(() => {
    setProfile(user);
  }, [user]);

  if (!profile) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
      
      {/* LEFT SIDEBAR */}
      <div className="col-span-12 md:col-span-4">
        <ProfileSidebar />
      </div>

      {/* RIGHT CONTENT */}
      <div className="col-span-12 md:col-span-8">

        {/* TABS */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium border
                ${activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
                }`}
            >
              {tab.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        {activeTab === "education" && (
          <EducationSection profile={profile} setProfile={setProfile} />
        )}

        {activeTab === "experience" && (
          <ExperienceSection profile={profile} setProfile={setProfile} />
        )}

        {activeTab === "project" && (
          <ProjectSection profile={profile} setProfile={setProfile} />
        )}

        {activeTab === "skills" && (
          <SkillsSection profile={profile} setProfile={setProfile} />
        )}

        {activeTab === "job-preferences" && (
          <JobPreferences profile={profile} setProfile={setProfile} />
        )}
      </div>
    </div>
  );
};

export default Profile;
