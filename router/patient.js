const express = require("express");
const patientController = require("../controller/patientController.js");
const patientRouter = express.Router();
const utility = require('./patientUtility.js')
const passport = require('passport');


// Main page which requires login to access

// Login page (with failure message displayed upon login failure)
patientRouter.get('/login', utility.unLoggedIn, patientController.renderLogin)
// Handle login
patientRouter.post('/login',
    utility.unLoggedIn,
    passport.authenticate("patient-login", {
        successRedirect: '/home', //id should be here
        failureReqirect: '/login',
        failureFlash: true
    })

)

/*/ POST - user submits the signup form -- signup a new user
customerRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/customer', // redirect to the homepage
    failureRedirect : '/customer/register', // redirect to signup page
    failureFlash : true // allow flash messages
}));*/
//have to replace every id here with patient_id
//get current patient's data
patientRouter.get("/:patient_id", patientController.getCurrData);

//add current patient's data
patientRouter.post("/:patient_id", patientController.addOneData);

// Handle logout
patientRouter.post('/logout', utility.isLoggedIn, patientController.logout)
module.exports = patientRouter