const express = require("express");
const router = express.Router();

const {
  getAllComplaints,
  getAdminComplaint,
  updateAdminComplaint,
} = require("../controllers/adminComplaintController");

const {
  verifyToken,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Joi Validation
const {
  validateAdminComplaintUpdate,
} = require("../validations/complaintValidation");

// GET ALL COMPLAINTS
router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  getAllComplaints
);

// GET ONE PARTICULAR COMPLAINT
router.get(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  getAdminComplaint
);

// VERIFY, ASSIGN OR REJECT COMPLAINT
router.patch(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  validateAdminComplaintUpdate,
  updateAdminComplaint
);

module.exports = router;