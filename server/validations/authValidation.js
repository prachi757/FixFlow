const Joi = require("joi");

// LOGIN VALIDATION
const loginSchema = Joi.object({
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
});

// VALIDATION MIDDLEWARE
const validateLogin = (req, res, next) => {
  const { error, value } = loginSchema.validate(req.body, {
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
  validateLogin,
};