const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { collegeEmail, password } = req.body;

    const user = await User.findOne({
      collegeEmail: collegeEmail.toLowerCase().trim(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
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
      message: "Login failed",
      error: error.message,
    });
  }
};


// GET LOGGED-IN USER
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
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
      message: "Failed to fetch user",
      error: error.message,
    });
  }
};


// LOGOUT USER
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Logout successful",
    });

  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
      error: error.message,
    });
  }
};


module.exports = {
  loginUser,
  getCurrentUser,
  logoutUser,
};