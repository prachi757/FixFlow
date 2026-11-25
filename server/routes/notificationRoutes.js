const express = require("express");
const router = express.Router();

const {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} = require("../controllers/notificationController");

const { verifyToken } = require("../middleware/authMiddleware");


// GET ALL NOTIFICATIONS
router.get(
  "/",
  verifyToken,
  getNotifications
);


// MARK ALL NOTIFICATIONS AS READ
router.patch(
  "/read-all",
  verifyToken,
  markAllNotificationsRead
);


// MARK ONE NOTIFICATION AS READ
router.patch(
  "/:id/read",
  verifyToken,
  markNotificationRead
);


module.exports = router;