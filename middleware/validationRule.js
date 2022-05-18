const { check,sanitizeBody } = require('express-validator');
exports.form = [
    //data in patient dashboard
    check('value').trim()
    .notEmpty().isNumeric()
    .withMessage("Digit required!")
]