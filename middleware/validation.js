const { validationResult, matchedData } = require('express-validator');
validateForm = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        var errMsg = errs.mapped();
        var inputData = matchedData();
    }
    else{
        var inputData = matchedData();
    }
    next({req: inputData});
}