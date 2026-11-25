const Joi = require("joi");

// USER CREATION VALIDATION
const userSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
      "any.required": "Name is required",
    }),

  collegeEmail: Joi.string()
    .trim()
    .lowercase()
    .email()
    .max(100)
    .required()
    .messages({
      "string.empty": "College email is required",
      "string.email": "Please enter a valid email address",
      "string.max": "Email cannot exceed 100 characters",
      "any.required": "College email is required",
    }),

  password: Joi.string()
    .min(8)
    .max(64)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 64 characters",
      "any.required": "Password is required",
    }),

  role: Joi.string()
    .valid("student", "staff")
    .required()
    .messages({
      "any.only": "Role must be student or staff",
      "any.required": "Role is required",
    }),

  specialization: Joi.when("role", {
    is: "staff",
    then: Joi.string()
      .valid(
        "Electrical",
        "Plumbing",
        "Furniture",
        "Cleaning",
        "Infrastructure"
      )
      .required()
      .messages({
        "any.only": "Please select a valid specialization",
        "any.required": "Specialization is required for staff",
      }),

    otherwise: Joi.any()
      .valid(null, "")
      .optional(),
  }),
});

// VALIDATION MIDDLEWARE
const validateCreateUser = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body, {
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

module.exports = {
  validateCreateUser,
};