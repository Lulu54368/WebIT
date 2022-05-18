const { check, sanitizeBody } = require("express-validator");
exports.form = [
  // clinician notes & support messages
  check("c_note").trim().notEmpty().withMessage("note should not be empty"),

  check("supportMessage")
    .trim()
    .notEmpty()
    .withMessage("support message should not be empty"),
];
