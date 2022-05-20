const { check, sanitizeBody } = require("express-validator");
exports.form = [
  // support messages
  check("message")
    .trim()
    .notEmpty()
    .withMessage("Support message cannot be empty"),
];
