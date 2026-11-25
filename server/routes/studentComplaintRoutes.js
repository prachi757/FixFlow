const express = require("express");
const router = express.Router();

const {
  submitComplaint,
  getStudentComplaint,
  updateStudentComplaint,
  getStudentDashboard,
} = require("../controllers/studentComplaintController");

const {
  verifyToken,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const upload = require("../uploads/upload");

// Joi Validation
const {
  validateSubmitComplaint,
  validateStudentComplaintUpdate,
} = require("../validations/complaintValidation");

// STUDENT SUBMITS COMPLAINT
router.post(
  "/",
  verifyToken,
  authorizeRoles("student"),
  upload.single("photo"),
  validateSubmitComplaint,
  submitComplaint
);

// GET STUDENT DASHBOARD DATA
router.get(
  "/",
  verifyToken,
  authorizeRoles("student"),
  getStudentDashboard
);

// GET ONE PARTICULAR COMPLAINT
router.get(
  "/:id",
  verifyToken,
  authorizeRoles("student"),
  getStudentComplaint
);

// STUDENT CLOSES OR REOPENS COMPLAINT
router.patch(
  "/:id",
  verifyToken,
  authorizeRoles("student"),
  validateStudentComplaintUpdate,
  updateStudentComplaint
);

module.exports = router;