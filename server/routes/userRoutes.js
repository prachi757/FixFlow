const express = require("express");
const router = express.Router();

const {getAllUsers,createUser,} = require("../controllers/userController");

const {verifyToken,authorizeRoles,} = require("../middleware/authMiddleware");

// Joi Validation
const {validateCreateUser,} = require("../validations/userValidation");

// GET ALL USERS (ADMIN ONLY)
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  getAllUsers
);

// CREATE NEW USER (ADMIN ONLY)
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  validateCreateUser,
  createUser
);

module.exports = router;