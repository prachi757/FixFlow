const mongoose = require("mongoose");

const Complaint = require("../models/Complaint");
const User = require("../models/User");
const Notification = require("../models/Notification");

// GET ALL COMPLAINTS FOR ADMIN
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("studentId", "name collegeEmail")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);

  } catch (error) {
    console.error("Fetch complaints error:", error);

    res.status(500).json({
      message: "Failed to fetch complaints",
    });
  }
};

// GET ONE PARTICULAR COMPLAINT FOR ADMIN
const getAdminComplaint = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid complaint ID",
      });
    }

    const complaint = await Complaint.findById(req.params.id)
      .populate("studentId", "name collegeEmail")
      .populate("assignedTo", "name collegeEmail")
      .populate("history.updatedBy", "name role");

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json(complaint);

  } catch (error) {
    console.error("Fetch complaint error:", error);

    res.status(500).json({
      message: "Failed to fetch complaint",
    });
  }
};

// VERIFY COMPLAINT, ASSIGN STAFF OR REJECT COMPLAINT
const updateAdminComplaint = async (req, res) => {
  try {
    const { category, priority, assignedTo, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid complaint ID",
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    // CHECK WHETHER COMPLAINT IS ALREADY PROCESSED
    if (
      !["Pending", "Reopened"].includes(complaint.status) ||
      complaint.assignedTo
    ) {
      return res.status(400).json({
        message: "This complaint has already been processed",
      });
    }

    // REJECT COMPLAINT
    if (status === "Rejected") {
      complaint.status = "Rejected";

      complaint.history.push({
        status: "Rejected",
        message: "Complaint rejected by administrator",
        updatedBy: req.user.id,
      });

      await complaint.save();

      await Notification.create({
        recipient: complaint.studentId,
        complaintId: complaint._id,
        title: "Complaint Rejected",
        message: `Your complaint "${complaint.description}" at ${complaint.location} has been rejected by the administrator.`,
        type: "rejected",
      });

      return res.status(200).json({
        message: "Complaint rejected successfully",
        complaint,
      });
    }

    // VERIFY AND ASSIGN STAFF
    const staff = await User.findOne({
      _id: assignedTo,
      role: "staff",
    });

    if (!staff) {
      return res.status(404).json({
        message: "Staff member not found",
      });
    }

    complaint.category = category;
    complaint.priority = priority;
    complaint.assignedTo = staff._id;
    complaint.status = "Assigned";

    complaint.history.push({
      status: "Assigned",
      message: `Complaint assigned to ${staff.name}`,
      updatedBy: req.user.id,
    });

    await complaint.save();

    // NOTIFY STUDENT
    await Notification.create({
      recipient: complaint.studentId,
      complaintId: complaint._id,
      title: "Complaint Assigned",
      message: `Your complaint "${complaint.description}" at ${complaint.location} has been assigned to maintenance staff.`,
      type: "assigned",
    });

    // NOTIFY STAFF
    await Notification.create({
      recipient: staff._id,
      complaintId: complaint._id,
      title: "New Complaint Assigned",
      message: `A complaint "${complaint.description}" at ${complaint.location} has been assigned to you.`,
      type: "assigned",
    });

    res.status(200).json({
      message: "Complaint verified and staff assigned successfully",
      complaint,
    });

  } catch (error) {
    console.error("Complaint action error:", error);

    res.status(500).json({
      message: "Failed to process complaint",
    });
  }
};

module.exports = {
  getAllComplaints,
  getAdminComplaint,
  updateAdminComplaint,
};