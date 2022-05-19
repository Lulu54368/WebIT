const { check, sanitizeBody } = require("express-validator");
exports.form = [
  // register patient
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

  check("name").trim().notEmpty().withMessage("first name should not be empty"),

  check("last_name")
    .trim()
    .notEmpty()
    .withMessage("last name should not be empty"),

  check("screen_name")
    .trim()
    .notEmpty()
    .withMessage("screen name should not be empty"),

  check("bio").trim().notEmpty().withMessage("bio should not be empty"),

  check("year")
    .trim()
    .isInt({ min: 1900, max: 2022 })
    .withMessage("year should be an integer within 1900-2022"),
];
