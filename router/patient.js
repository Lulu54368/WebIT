const express = require("express");
const patientController = require("../controller/patientController.js");
const patientRouter = express.Router();
const utility = require("./patientUtility.js");
const passport = require("passport");
const validationRule = require("../middleware/validationRule.js");
const changePwdRule = require("../middleware/changePwdRule.js");

// Main page which requires login to access

// Login page (with failure message displayed upon login failure)
patientRouter.get("/login", utility.unLoggedIn, (req, res) =>
  res.render("../views/layouts/login.hbs", { flash: req.flash() })
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
patientRouter.get("/aboutDiabetes", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("../views/about/about_diabetes_login.hbs");
  } else {
    res.render("../views/about/about_diabetes.hbs");
  }
});

patientRouter.get("/aboutWebsite", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("../views/about/about_website_login.hbs");
  } else {
    res.render("../views/about/about_website.hbs");
  }
});

//get current patient's data
patientRouter.get(
  "/:patient_id",
  utility.isLoggedIn,
  patientController.getCurrData
);

patientRouter.post(
  "/:patient_id",
  validationRule.form,
  utility.isLoggedIn,
  patientController.addOneData
);

patientRouter.get(
  "/:patient_id/changePwd",
  utility.isLoggedIn,
  patientController.renderChangePwd
);

patientRouter.post(
  "/:patient_id/changePwd",
  changePwdRule.form,
  utility.isLoggedIn,
  patientController.changePassword
);

// get current patient's history data that was entered
patientRouter.get(
  "/:patient_id/historyData",
  utility.isLoggedIn,
  patientController.getPatientHistory
);

patientRouter.get(
  "/:patient_id/leaderboard",
  utility.isLoggedIn,
  patientController.renderLeaderboard
);

// When you visit http://localhost:3000/register, you will see "Register Page"

module.exports = patientRouter;
