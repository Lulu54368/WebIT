const { check, sanitizeBody } = require("express-validator");
exports.form = [
  // support messages
  check("supportMessage")
    .trim()
    .notEmpty()
    .withMessage("support message should not be empty"),
];
