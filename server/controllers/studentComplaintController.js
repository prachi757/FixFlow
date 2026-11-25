const mongoose = require("mongoose");

const Complaint = require("../models/Complaint");
const User = require("../models/User");
const Notification = require("../models/Notification");

const ai = require("../config/gemini");


// STUDENT SUBMITS COMPLAINT
const submitComplaint = async (req, res) => {
  try {
    const { description, location } = req.body;
    const photo = req.file ? req.file.path : "";

    // Generate category and priority using Gemini AI
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `
        Analyze this college maintenance complaint:

        "${description}"

        Return only JSON in this format:
        {
          "category": "Electrical",
          "priority": "Medium"
        }

        Category must be one of:
        Electrical, Plumbing, Furniture, Cleaning, Infrastructure.

        Priority must be one of:
        Low, Medium, High.
      `,
    });

    const aiResult = JSON.parse(response.text);

    const validCategories = [
      "Electrical",
      "Plumbing",
      "Furniture",
      "Cleaning",
      "Infrastructure",
    ];

    const validPriorities = ["Low", "Medium", "High"];

    // Validate Gemini AI response
    if (
      !validCategories.includes(aiResult.category) ||
      !validPriorities.includes(aiResult.priority)
    ) {
      return res.status(500).json({
        message: "AI returned invalid category or priority",
      });
    }

    const studentId = req.user.id;

    // Create complaint
    const complaint = new Complaint({
      studentId,
      description,
      location,
      photo,
      aiCategory: aiResult.category,
      aiPriority: aiResult.priority,
      category: aiResult.category,
      priority: aiResult.priority,

      history: [
        {
          status: "Pending",
          message: "Complaint submitted successfully",
          updatedBy: studentId,
        },
      ],
    });

    await complaint.save();

    // Notify admin
    const admin = await User.findOne({ role: "admin" }).select("_id");

    if (admin) {
      await Notification.create({
        recipient: admin._id,
        complaintId: complaint._id,
        title: "New Complaint Submitted",
        message: `New complaint: ${complaint.description}. Location: ${complaint.location}. Please review it.`,
        type: "new",
      });
    }

    return res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });

  } catch (error) {
    console.error("Complaint error:", error);

    res.status(500).json({
      message: "Failed to submit complaint",
    });
  }
};


// GET ONE PARTICULAR COMPLAINT FOR STUDENT
const getStudentComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid complaint ID",
      });
    }

    const complaint = await Complaint.findOne({
      _id: id,
      studentId: req.user.id,
    })
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
    console.error("Student complaint error:", error);

    res.status(500).json({
      message: "Failed to fetch complaint",
    });
  }
};


// STUDENT CLOSES OR REOPENS A RESOLVED COMPLAINT
const updateStudentComplaint = async (req, res) => {
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
      studentId: req.user.id,
    });

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    // Only resolved complaints can be closed or reopened
    if (complaint.status !== "Resolved") {
      return res.status(400).json({
        message: "Only resolved complaints can be closed or reopened",
      });
    }

    complaint.status = status;

    // Reopened complaint will go back to admin for reassignment
    if (status === "Reopened") {
      complaint.assignedTo = null;
    }

    complaint.history.push({
      status,
      message:
        status === "Closed"
          ? "Student confirmed that the issue has been resolved"
          : "Student reopened the complaint because the issue is not fixed",
      updatedBy: req.user.id,
    });

    await complaint.save();

    // REOPENED NOTIFICATION: ONLY ADMIN
    if (status === "Reopened") {
      const admin = await User.findOne({ role: "admin" }).select("_id");

      if (admin) {
        await Notification.create({
          recipient: admin._id,
          complaintId: complaint._id,
          title: "Complaint Reopened",
          message: `The student reopened this complaint: ${complaint.description}. Location: ${complaint.location}. Please review and reassign it.`,
          type: "reopened",
        });
      }
    }

    // CLOSED NOTIFICATION: ADMIN + ASSIGNED STAFF
    if (status === "Closed") {
      const admin = await User.findOne({ role: "admin" }).select("_id");

      if (admin) {
        await Notification.create({
          recipient: admin._id,
          complaintId: complaint._id,
          title: "Complaint Closed",
          message: `The student closed this complaint: ${complaint.description}. Location: ${complaint.location}.`,
          type: "closed",
        });
      }

      if (complaint.assignedTo) {
        await Notification.create({
          recipient: complaint.assignedTo,
          complaintId: complaint._id,
          title: "Complaint Closed",
          message: `The student closed your assigned complaint: ${complaint.description}. Location: ${complaint.location}.`,
          type: "closed",
        });
      }
    }

    await complaint.populate([
      { path: "studentId", select: "name collegeEmail" },
      { path: "assignedTo", select: "name collegeEmail" },
      { path: "history.updatedBy", select: "name role" },
    ]);

    res.status(200).json({
      message: `Complaint ${status.toLowerCase()} successfully`,
      complaint,
    });

  } catch (error) {
    console.error("Student complaint update error:", error);

    res.status(500).json({
      message: "Failed to update complaint",
    });
  }
};


// GET STUDENT DASHBOARD DATA
const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    const [
      totalComplaints,
      pendingComplaints,
      inProgressComplaints,
      resolvedComplaints,
      recentComplaints,
    ] = await Promise.all([
      Complaint.countDocuments({ studentId }),

      // Pending + Assigned complaints
      Complaint.countDocuments({
        studentId,
        status: { $in: ["Pending", "Assigned"] },
      }),

      Complaint.countDocuments({
        studentId,
        status: "In Progress",
      }),

      Complaint.countDocuments({
        studentId,
        status: "Resolved",
      }),

      Complaint.find({ studentId })
        .sort({ createdAt: -1 })
        .limit(3)
        .select("description location status createdAt"),
    ]);

    res.status(200).json({
      totalComplaints,
      pendingComplaints,
      inProgressComplaints,
      resolvedComplaints,
      recentComplaints,
    });

  } catch (error) {
    console.error("Fetch complaints error:", error);

    res.status(500).json({
      message: "Failed to fetch complaints",
    });
  }
};


module.exports = {
  submitComplaint,
  getStudentComplaint,
  updateStudentComplaint,
  getStudentDashboard,
};