const { check, sanitizeBody } = require("express-validator");
exports.form = [
  // change password
  check("currPassword")
    .trim()
    .notEmpty()
    .withMessage("Current password cannot be empty"),
  check("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New password cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),
];
