const Joi = require("joi");

// COMPLAINT CATEGORIES
const complaintCategories = [
  "Electrical",
  "Plumbing",
  "Furniture",
  "Cleaning",
  "Infrastructure",
];

// COMPLAINT PRIORITIES
const complaintPriorities = ["Low", "Medium", "High"];

// 1. STUDENT SUBMITS COMPLAINT
const submitComplaintSchema = Joi.object({
  description: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .required(),

  location: Joi.string()
    .trim()
    .max(200)
    .required(),
});

// 2. STUDENT CLOSES OR REOPENS COMPLAINT
const studentComplaintUpdateSchema = Joi.object({
  status: Joi.string()
    .valid("Closed", "Reopened")
    .required(),
});

// 3. ADMIN VERIFIES, ASSIGNS OR REJECTS COMPLAINT
const adminComplaintUpdateSchema = Joi.object({
  status: Joi.string()
    .valid("Rejected")
    .optional(),

  category: Joi.string()
    .valid(...complaintCategories)
    .when("status", {
      is: "Rejected",
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),

  priority: Joi.string()
    .valid(...complaintPriorities)
    .when("status", {
      is: "Rejected",
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),

  assignedTo: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .when("status", {
      is: "Rejected",
      then: Joi.optional(),
      otherwise: Joi.required(),
    })
    .messages({
      "string.pattern.base": "Please select a valid staff member",
    }),
});

// 4. STAFF UPDATES COMPLAINT STATUS
const staffComplaintUpdateSchema = Joi.object({
  status: Joi.string()
    .valid("In Progress", "Resolved")
    .required(),
});

// COMMON VALIDATION FUNCTION
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        errors: error.details.map((detail) => detail.message),
      });
    }

    req.body = value;
    next();
  };
};

// EXPORT VALIDATION MIDDLEWARES
module.exports = {
  validateSubmitComplaint: validateRequest(submitComplaintSchema),

  validateStudentComplaintUpdate: validateRequest(
    studentComplaintUpdateSchema
  ),

  validateAdminComplaintUpdate: validateRequest(
    adminComplaintUpdateSchema
  ),

  validateStaffComplaintUpdate: validateRequest(
    staffComplaintUpdateSchema
  ),
};