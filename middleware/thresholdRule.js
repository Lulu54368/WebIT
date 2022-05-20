const { check, sanitizeBody } = require("express-validator");
exports.form = [
  // check threshold
  check("upper_bound")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Please enter numbers"),
  check("lower_bound")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("Please enter numbers"),
];
