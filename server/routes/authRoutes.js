const express = require("express");
const router = express.Router();

const {
  loginUser,
  getCurrentUser,
  logoutUser,
} = require("../controllers/authController");

const { verifyToken } = require("../middleware/authMiddleware");

// Joi Validation
const { validateLogin } = require("../validations/authValidation");

// LOGIN
router.post("/login", validateLogin, loginUser);

// GET LOGGED-IN USER
router.get("/me", verifyToken, getCurrentUser);

// LOGOUT
router.post("/logout", logoutUser);

module.exports = router;