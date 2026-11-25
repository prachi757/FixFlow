const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      role: "admin"
    });

    if (existingAdmin) {
      console.log("Admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD,10);
    const admin = new User({
        name: process.env.ADMIN_NAME,
        collegeEmail: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin"
    });

    await admin.save();

    console.log("Admin created successfully!");
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();