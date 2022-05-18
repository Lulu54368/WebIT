const { check, sanitizeBody } = require("express-validator");
exports.form = [
  // change password
  check("currPassword")
    .trim()
    .notEmpty()
    .withMessage("current password should not be empty"),
  check("newPassword")
    .trim()
    .notEmpty()
    .withMessage("new password should not be empty"),
];
