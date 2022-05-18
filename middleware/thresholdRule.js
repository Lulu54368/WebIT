const { check, sanitizeBody } = require("express-validator");
exports.form = [
  // check threshold
  check("value").trim().notEmpty().isNumeric().withMessage("numbers required!"),
];
