const express = require("express");
const router = express.Router();

const {
  getStaffDashboard,
  getAssignedComplaints,
  getStaffComplaint,
  updateStaffComplaint,
} = require("../controllers/staffComplaintController");

const {
  verifyToken,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Joi Validation
const {
  validateStaffComplaintUpdate,
} = require("../validations/complaintValidation");

// GET STAFF DASHBOARD DATA
router.get(
  "/",
  verifyToken,
  authorizeRoles("staff"),
  getStaffDashboard
);

// GET ALL COMPLAINTS ASSIGNED TO STAFF
router.get(
  "/all",
  verifyToken,
  authorizeRoles("staff"),
  getAssignedComplaints
);

// GET ONE PARTICULAR COMPLAINT
router.get(
  "/:id",
  verifyToken,
  authorizeRoles("staff"),
  getStaffComplaint
);

// UPDATE COMPLAINT STATUS
router.patch(
  "/:id",
  verifyToken,
  authorizeRoles("staff"),
  validateStaffComplaintUpdate,
  updateStaffComplaint
);

module.exports = router;