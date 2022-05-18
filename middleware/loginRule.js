const { check, sanitizeBody } = require("express-validator");
exports.form = [
  // login
  check("email")
    .trim()
    .notEmpty()
    .withMessage("e-mail should not be empty")
    .isEmail()
    .withMessage("Please enter valid email"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("password should not be empty"),
];
