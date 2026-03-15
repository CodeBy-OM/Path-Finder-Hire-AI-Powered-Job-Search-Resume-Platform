import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";

const tabs = [
  { id: "education", label: "Education" },
  { id: "project", label: "Project" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "job", label: "Job Preferences" },
];

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <>
      {/* TAB BAR */}
      <div className="flex gap-4 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === "education" && <EducationSection />}
      {activeTab === "skills" && <SkillsSection />}
    </>
  );
};

export default ProfileTabs;
