const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", require("./src/routes/aiRoutes"));

app.use("/uploads", express.static("uploads"));
app.use("/api/upload", require("./src/routes/uploadRoutes"));
app.use("/api/jobs", require("./src/routes/JobRoutes"));

app.use(
  "/api/auth",
  require(path.join(__dirname, "src", "routes", "authRoutes.js"))
);
app.use("/api/user", require("./src/routes/userRoutes"));
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
