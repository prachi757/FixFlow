const bcrypt = require("bcryptjs");
const User = require("../models/User");

// GET ALL USERS (ADMIN)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ["student", "staff"] },
    });

    res.status(200).json({
      users,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};


// CREATE NEW USER (ADMIN)
const createUser = async (req, res) => {
  try {
    const {
      name,
      collegeEmail,
      password,
      role,
      specialization,
    } = req.body;

    // Check duplicate email
    const existingUser = await User.findOne({
      collegeEmail: collegeEmail.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      collegeEmail: collegeEmail.toLowerCase().trim(),
      password: hashedPassword,
      role,
      specialization: role === "staff" ? specialization : null,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        collegeEmail: user.collegeEmail,
        role: user.role,
        specialization: user.specialization,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};


module.exports = {
  getAllUsers,
  createUser,
};