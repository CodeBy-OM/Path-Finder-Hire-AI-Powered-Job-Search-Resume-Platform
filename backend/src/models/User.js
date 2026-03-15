const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  degree: String,
  college: String,
  field: String,
  startDate: String,
  endDate: String,
  cgpa: String,
});

const ExperienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  location: String,
  startDate: String,
  endDate: String,
  description: String,
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String],
  link: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  designation: String,
  location: String,
  profilePhoto: String,

  education: [Object],
  experience: [ExperienceSchema],
  projects: [ProjectSchema],
  skills: [String],

  jobPreferences: {
    role: String,
    location: String,
    type: String,
  },
  cv: {
  type: String, 
},

});

module.exports = mongoose.model("User", UserSchema);
