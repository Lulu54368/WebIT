const { check, sanitizeBody } = require("express-validator");
exports.form = [
  // note
  check("note").trim().notEmpty().withMessage("note should not be empty"),
];
