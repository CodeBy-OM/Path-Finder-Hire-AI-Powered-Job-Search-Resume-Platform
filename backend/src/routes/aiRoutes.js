const router = require("express").Router();

router.post("/cv", async (req, res) => {
  const profile = req.body;

  // 🔥 MOCK ATS CV (Always works)
  const cv = `
${profile.name}
${profile.email}
${profile.location}

PROFESSIONAL SUMMARY
Highly motivated ${profile.designation || "professional"} with experience in ${
    (profile.skills || []).slice(0, 3).join(", ")
  }.

SKILLS
${(profile.skills || []).join(", ")}

EXPERIENCE
${(profile.experience || []).map(e =>
  `${e.role} at ${e.company}`
).join("\n")}

EDUCATION
${(profile.education || []).map(e =>
  `${e.degree} - ${e.institute}`
).join("\n")}

PROJECTS
${(profile.projects || []).map(p =>
  `${p.title}: ${p.description}`
).join("\n")}
`;

  res.json({ cv });
});
// MOCK AI COVER LETTER
router.post("/cover-letter", async (req, res) => {
  try {
    const profile = req.body;

    const letter = `
Dear Hiring Manager,

I am writing to express my interest in the ${profile.jobPreferences?.role || "open"} position.

I am a ${profile.designation || "motivated professional"} based in ${
      profile.location || "your location"
    }, with hands-on experience in ${
      (profile.skills || []).slice(0, 4).join(", ") || "modern technologies"
    }.

Through my academic and professional journey, I have worked on projects such as:
${
  (profile.projects || []).length > 0
    ? profile.projects.map(p => `- ${p.title}`).join("\n")
    : "- Personal and academic projects"
}

I am confident that my skills, learning mindset, and passion for building impactful solutions make me a strong fit for your team.

Thank you for considering my application. I would welcome the opportunity to discuss how I can contribute to your organization.

Sincerely,  
${profile.name || "Your Name"}
`;

    res.json({ letter });

  } catch (err) {
    console.error("Mock Cover Letter error:", err);
    res.status(500).json({ error: "Mock Cover Letter generation failed" });
  }
});
// MOCK APPLICATION WIZARD
router.post("/wizard", async (req, res) => {
  try {
    const profile = req.body;

    const response = {
      suggestedRole:
        profile.jobPreferences?.role ||
        profile.designation ||
        "Software Developer",

      profileStrength: "Strong",

      skillMatch: (profile.skills?.length || 0) >= 5 ? "High" : "Medium",

      missingSkills:
        (profile.skills?.length || 0) < 5
          ? ["System Design", "Testing", "CI/CD"]
          : [],

      cvStatus: "ATS Ready",

      suggestions: [
        "Add measurable achievements in experience",
        "Mention tech stack in projects",
        "Include certifications if available",
      ],

      optimizedSummary: `
${profile.designation || "Professional"} with hands-on experience in ${
        (profile.skills || []).slice(0, 4).join(", ")
      }. Passionate about building scalable and impactful solutions.
`,

      coverLetterTip:
        "Highlight your most recent project and align it with job requirements.",
    };

    res.json(response);
  } catch (err) {
    console.error("Wizard error:", err);
    res.status(500).json({ error: "Application Wizard failed" });
  }
});

module.exports = router;
