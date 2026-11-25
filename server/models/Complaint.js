const mongoose = require("mongoose");

const complaintStatuses = [
  "Pending",
  "Assigned",
  "In Progress",
  "Resolved",
  "Reopened",
  "Closed",
  "Rejected",
];

const complaintCategories = [
  "Electrical",
  "Plumbing",
  "Furniture",
  "Cleaning",
  "Infrastructure",
];

const complaintPriorities = ["Low", "Medium", "High"];

const complaintSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },

    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    photo: {
      type: String,
      trim: true,
      default: "",
    },

    aiCategory: {
      type: String,
      enum: complaintCategories,
      required: true,
    },

    aiPriority: {
      type: String,
      enum: complaintPriorities,
      required: true,
    },

    category: {
      type: String,
      enum: complaintCategories,
      required: true,
    },

    priority: {
      type: String,
      enum: complaintPriorities,
      required: true,
    },

    status: {
      type: String,
      enum: complaintStatuses,
      default: "Pending",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    history: [
      {
        status: {
          type: String,
          enum: complaintStatuses,
          required: true,
        },

        message: {
          type: String,
          required: true,
          trim: true,
          maxlength: 500,
        },

        updatedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);