const mongoose = require("mongoose");

const userRoles = ["admin", "student", "staff"];

const staffSpecializations = [
  "Electrical",
  "Plumbing",
  "Furniture",
  "Cleaning",
  "Infrastructure",
];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    collegeEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 100,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 64,
      select: false,
    },

    role: {
      type: String,
      enum: userRoles,
      required: true,
    },

    specialization: {
      type: String,
      enum: staffSpecializations,
      default: null,
      required: function () {
        return this.role === "staff";
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);