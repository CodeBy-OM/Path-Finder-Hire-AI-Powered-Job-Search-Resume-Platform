const router = require("express").Router();
const User = require("../models/User");

/* TEMP AUTH */
const auth = async (req, res, next) => {
  const user = await User.findOne();
  if (!user) return res.status(401).json({ error: "No user found" });
  req.user = { id: user._id };
  next();
};

/* GET PROFILE */
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

/* UPDATE BASIC PROFILE (name, designation, location) */
router.put("/me", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    req.body,
    { new: true }
  );
  res.json(user);
});

/* EDUCATION */
router.post("/education", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.education.push(req.body);
  await user.save();
  res.json(user);
});

router.put("/education/:eduId", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const edu = user.education.id(req.params.eduId);
  if (!edu) return res.status(404).json({ error: "Education not found" });
  Object.assign(edu, req.body);
  await user.save();
  res.json(user);
});

router.delete("/education/:eduId", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.education = user.education.filter(
    e => e._id.toString() !== req.params.eduId
  );
  await user.save();
  res.json(user);
});

/* EXPERIENCE */
router.post("/experience", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.experience.push(req.body);
  await user.save();
  res.json(user);
});

router.put("/experience/:id", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const exp = user.experience.id(req.params.id);
  if (!exp) return res.status(404).json({ error: "Not found" });
  Object.assign(exp, req.body);
  await user.save();
  res.json(user);
});

router.delete("/experience/:id", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.experience = user.experience.filter(
    e => e._id.toString() !== req.params.id
  );
  await user.save();
  res.json(user);
});

/* PROJECTS */
router.post("/projects", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.projects.push(req.body);
  await user.save();
  res.json(user);
});

router.put("/projects/:id", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const project = user.projects.id(req.params.id);
  Object.assign(project, req.body);
  await user.save();
  res.json(user);
});

router.delete("/projects/:id", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.projects = user.projects.filter(
    p => p._id.toString() !== req.params.id
  );
  await user.save();
  res.json(user);
});

/* SKILLS */
router.put("/skills", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { skills: req.body.skills },
    { new: true }
  );
  res.json(user);
});

/* JOB PREFERENCES */
router.put("/job-preferences", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  user.jobPreferences = {
    role: req.body.role,
    location: req.body.location,
    jobType: req.body.jobType,
  };

  await user.save();
  res.json(user);
});


module.exports = router;
