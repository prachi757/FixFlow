const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const studentComplaintRoutes = require("./routes/studentComplaintRoutes");
const adminComplaintRoutes = require("./routes/adminComplaintRoutes");
const staffComplaintRoutes = require("./routes/staffComplaintRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();


// MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("FixFlow backend is running!");
});


// API ROUTES

// Authentication
app.use("/api/users", authRoutes);

// User Management
app.use("/api/users", userRoutes);

// Student Complaints
app.use("/api/student/complaints", studentComplaintRoutes);

// Admin Complaints
app.use("/api/admin/complaints", adminComplaintRoutes);

// Staff Complaints
app.use("/api/staff/complaints", staffComplaintRoutes);

// Notifications
app.use("/api/notifications", notificationRoutes);


// SERVER
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`FixFlow server running on port ${PORT}`);
  });
});