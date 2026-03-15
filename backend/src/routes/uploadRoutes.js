const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const User = require("../models/User");

// 🔐 TEMP AUTH (replace with JWT middleware later)
const auth = async (req, res, next) => {
  const user = await User.findOne(); // for testing
  req.user = { id: user._id };
  next();
};

// 📦 MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* =========================
   PROFILE PHOTO UPLOAD
========================= */
router.post(
  "/profile-photo",
  auth,
  upload.single("photo"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePhoto: `/uploads/${req.file.filename}` },
      { new: true }
    );

    res.json(user);
  }
);

/* =========================
   CV UPLOAD
========================= */
router.post("/cv", upload.single("cv"), async (req, res) => {
  try {
    const user = await User.findOne(); // temp auth

    user.resume = `/uploads/${req.file.filename}`;
    await user.save();

    // 🔥 RETURN FULL UPDATED USER
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "CV upload failed" });
  }
});



module.exports = router;
