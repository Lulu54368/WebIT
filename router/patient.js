const express = require("express");
const patientController = require("../controller/patientController.js");
const patientRouter = express.Router();
const utility = require("./patientUtility.js");
const passport = require("passport");
const res = require("express/lib/response");

// Main page which requires login to access

// Login page (with failure message displayed upon login failure)
patientRouter.get("/login",utility.unLoggedIn, (req, res) =>
  res.render("../views/layouts/login.hbs", {flash: req.flash()})
);
// Handle login
patientRouter.post(
  "/login",
  utility.unLoggedIn,
  passport.authenticate("patient-login", {
    //id should be here
    failureReqirect: "/patient/login",
    failureFlash: true,
  }),
  (req, res, err) => {
    {
      console.log(req);
      const user = req.user;
      const link = "/patient/" + user._id.toString();
      res.redirect(link);
    }
    
  }
);
// Handle logout
patientRouter.get("/logout", utility.isLoggedIn, patientController.logout);


//get current patient's data
patientRouter.get("/:patient_id", utility.isLoggedIn, patientController.getCurrData);

//add current patient's data
patientRouter.post("/:patient_id", utility.isLoggedIn, patientController.addOneData);



patientRouter.get("/:patient_id/changePwd",utility.isLoggedIn, patientController.renderChangePwd);

patientRouter.post("/:patient_id/changePwd",utility.isLoggedIn, patientController.changePassword);

// get current patient's history data that was entered
patientRouter.get(
  "/:patient_id/historyData",utility.isLoggedIn,
  patientController.getPatientHistory
);

patientRouter.get(
  "/:patient_id/leaderboard",utility.isLoggedIn,
  patientController.renderLeaderboard
);

// When you visit http://localhost:3000/register, you will see "Register Page"


module.exports = patientRouter;
