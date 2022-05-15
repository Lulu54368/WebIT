const express = require("express");
const patientController = require("../controller/patientController.js");
const patientRouter = express.Router();
const utility = require("./patientUtility.js");
const passport = require("passport");
const res = require("express/lib/response");

// Main page which requires login to access

// Login page (with failure message displayed upon login failure)
patientRouter.get("/login", (req, res) =>
  res.render("../views/layouts/login.hbs")
); // utility.unLoggedIn,
// Handle login
patientRouter.post(
  "/login",
  utility.unLoggedIn,
  passport.authenticate("patient-login", {
    //id should be here
    failureReqirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    console.log(req);
    const user = req.user;
    const link = "/patient/" + user._id.toString();
    res.redirect(link);
  }
);

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

//change patient's password
/* patientRouter.get("/:patient_id/password", (req, res, next) => {

    const form = '<h1>Change Password Page</h1><form method="post" action="">\
                    <br>Enter current password:<br><input type="password" name="currPassword">\
                    <br>Enter newPassword:<br><input type="text" name="newPassword">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
}) */

patientRouter.get("/:patient_id/changePwd", patientController.renderChangePwd);

patientRouter.post("/:patient_id/changePwd", patientController.changePassword);

// get current patient's history data that was entered
patientRouter.get(
  "/:patient_id/historyData",
  patientController.getPatientHistory
);

patientRouter.get(
  "/:patient_id/leaderboard",
  patientController.renderLeaderboard
);

// When you visit http://localhost:3000/register, you will see "Register Page"

// Handle logout
patientRouter.post("/logout", utility.isLoggedIn, patientController.logout);
module.exports = patientRouter;
