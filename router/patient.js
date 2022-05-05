const express = require("express");
const patientController = require("../controller/patientController.js");
const patientRouter = express.Router();
const utility = require('./patientUtility.js')
const passport = require('passport');
//have to replace every id here with patient_id
//get current patient's data
patientRouter.get("/:patient_id", patientController.getCurrData);

//add current patient's data
patientRouter.post("/:patient_id", patientController.addOneData);

/*// Main page which requires login to access
// Note use of authentication middleware here
router.get('/', isAuthenticated, (req, res) => {
    res.render('home', { title: 'Express', user: req.user })
})*/
// Login page (with failure message displayed upon login failure)
patientRouter.get('/login', utility.unLoggedIn, patientController.renderLogin)
// Handle login
patientRouter.post('/login',
    utility.unLoggedIn,
    passport.authenticate("patient-login", {
        successRedirect: '/patient/home', //id should be here
        failureReqirect: '/patient/login',
        failureFlash: true
    })

)
// Handle logout
patientRouter.post('/logout', utility.isLoggedIn, patientController.logout)
module.exports = patientRouter