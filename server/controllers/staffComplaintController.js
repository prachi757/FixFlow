const mongoose = require("mongoose");

const Complaint = require("../models/Complaint");
const User = require("../models/User");
const Notification = require("../models/Notification");


// GET STAFF DASHBOARD DATA
const getStaffDashboard = async (req, res) => {
  try {
    const staffId = req.user.id;

    const [
      totalAssigned,
      pendingComplaints,
      inProgressComplaints,
      resolvedComplaints,
      recentComplaints,
    ] = await Promise.all([
      Complaint.countDocuments({ assignedTo: staffId }),

      // Assigned complaints waiting for staff to start work
      Complaint.countDocuments({
        assignedTo: staffId,
        status: "Assigned",
      }),

      Complaint.countDocuments({
        assignedTo: staffId,
        status: "In Progress",
      }),

      Complaint.countDocuments({
        assignedTo: staffId,
        status: "Resolved",
      }),

      Complaint.find({ assignedTo: staffId })
        .populate("studentId", "name")
        .sort({ createdAt: -1 })
        .limit(3),
    ]);

    res.status(200).json({
      totalAssigned,
      pendingComplaints,
      inProgressComplaints,
      resolvedComplaints,
      recentComplaints,
    });

  } catch (error) {
    console.error("Staff dashboard error:", error);

    res.status(500).json({
      message: "Failed to fetch staff dashboard data",
    });
  }
};


// GET ALL COMPLAINTS ASSIGNED TO LOGGED-IN STAFF
const getAssignedComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      assignedTo: req.user.id,
    })
      .populate("studentId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);

  } catch (error) {
    console.error("Staff complaints error:", error);

    res.status(500).json({
      message: "Failed to fetch assigned complaints",
    });
  }
};


// GET ONE PARTICULAR COMPLAINT FOR STAFF
const getStaffComplaint = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid complaint ID",
      });
    }

    const complaint = await Complaint.findOne({
      _id: req.params.id,
      assignedTo: req.user.id,
    })
      .populate("studentId", "name collegeEmail")
      .populate("assignedTo", "name collegeEmail")
      .populate("history.updatedBy", "name role");

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found or not assigned to you",
      });
    }

    res.status(200).json(complaint);

  } catch (error) {
    console.error("Staff complaint error:", error);

    res.status(500).json({
      message: "Failed to fetch complaint",
    });
  }
};


// STAFF UPDATES COMPLAINT STATUS
const updateStaffComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid complaint ID",
      });
    }

    const complaint = await Complaint.findOne({
      _id: id,
      assignedTo: req.user.id,
    });

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found or not assigned to you",
      });
    }

    // START WORK: Assigned -> In Progress
    if (status === "In Progress") {
      if (complaint.status !== "Assigned") {
        return res.status(400).json({
          message: "Only assigned complaints can be started",
        });
      }

      complaint.status = "In Progress";

      complaint.history.push({
        status: "In Progress",
        message: "Work started by staff",
        updatedBy: req.user.id,
      });
    }


    // MARK AS RESOLVED: In Progress -> Resolved
    if (status === "Resolved") {
      if (complaint.status !== "In Progress") {
        return res.status(400).json({
          message: "Only in-progress complaints can be resolved",
        });
      }

      complaint.status = "Resolved";

      complaint.history.push({
        status: "Resolved",
        message: "Complaint marked as resolved by staff",
        updatedBy: req.user.id,
      });
    }

    await complaint.save();


    // WORK STARTED: NOTIFY STUDENT
    if (status === "In Progress") {
      await Notification.create({
        recipient: complaint.studentId,
        complaintId: complaint._id,
        title: "Work Started",
        message: `Maintenance staff has started working on your complaint "${complaint.description}" at ${complaint.location}.`,
        type: "started",
      });
    }


    // RESOLVED: NOTIFY STUDENT AND ADMIN
    if (status === "Resolved") {
      await Notification.create({
        recipient: complaint.studentId,
        complaintId: complaint._id,
        title: "Complaint Resolved",
        message: `Your complaint "${complaint.description}" at ${complaint.location} has been marked as resolved. Please review it.`,
        type: "resolved",
      });

      const admin = await User.findOne({ role: "admin" }).select("_id");

      if (admin) {
        await Notification.create({
          recipient: admin._id,
          complaintId: complaint._id,
          title: "Complaint Resolved",
          message: `The complaint "${complaint.description}" at ${complaint.location} has been marked as resolved by maintenance staff.`,
          type: "resolved",
        });
      }
    }

    await complaint.populate([
      { path: "studentId", select: "name collegeEmail" },
      { path: "assignedTo", select: "name collegeEmail" },
      { path: "history.updatedBy", select: "name role" },
    ]);

    res.status(200).json({
      message: "Complaint status updated successfully",
      complaint,
    });

  } catch (error) {
    console.error("Staff status update error:", error);

    res.status(500).json({
      message: "Failed to update complaint status",
    });
  }
};


module.exports = {
  getStaffDashboard,
  getAssignedComplaints,
  getStaffComplaint,
  updateStaffComplaint,
};