const { check, sanitizeBody } = require("express-validator");
exports.form = [
  // register patient
  check("email")
    .trim()
    .notEmpty()
    .withMessage("e-mail cannot be empty")
    .isEmail()
    .withMessage("Please enter valid email"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),

  check("name").trim().notEmpty().withMessage("First name cannot be empty"),

  

 

  

  check("year")
    .trim()
    .isInt({ min: 1900, max: 2022 })
    .withMessage("Year should be an integer within 1900-2022"),
];
