const mongoose = require("mongoose");

const Notification = require("../models/Notification");


// GET NOTIFICATIONS FOR LOGGED-IN USER
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
    })
      .populate("complaintId", "description status")
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);

  } catch (error) {
    console.error("Fetch notifications error:", error);

    res.status(500).json({
      message: "Failed to fetch notifications",
    });
  }
};


// MARK ALL NOTIFICATIONS AS READ
const markAllNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        recipient: req.user.id,
        isRead: false,
      },
      { isRead: true }
    );

    res.status(200).json({
      message: "All notifications marked as read",
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update notifications",
    });
  }
};


// MARK ONE NOTIFICATION AS READ
const markNotificationRead = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid notification ID",
      });
    }

    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        recipient: req.user.id,
      },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.status(200).json({
      message: "Notification marked as read",
      notification,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update notification",
    });
  }
};


module.exports = {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
};