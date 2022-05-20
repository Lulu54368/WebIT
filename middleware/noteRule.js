const { check, sanitizeBody } = require("express-validator");
exports.form = [
  // note
  check("note").trim().notEmpty().withMessage("Note cannot be empty"),
];
