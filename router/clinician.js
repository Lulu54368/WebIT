const express = require("express");
const clinicianRouter = express.Router();
const clinicianController = require("../controller/clinicianController");
const utility = require("./clinicianUtility.js");
const passport = require("passport");

// Handle login
clinicianRouter.post(
  "/login",
  utility.unLoggedIn,
  passport.authenticate("clinician-login", {
    //id should be here
    failureReqirect: "/clinician/login",
    failureFlash: true,
  }),
  (req, res, err) => {
    {
      console.log(req);
      const user = req.user;
      const link = "/clinician/" + user._id.toString();
      res.redirect(link);
    }
  }
);

clinicianRouter.get("/login", utility.unLoggedIn, (req, res) =>
  res.render("../views/layouts/login_clinician.hbs", { flash: req.flash() })
);

/* clinicianRouter.get("/login", utility.unLoggedIn, (req, res, next) => {
  const form =
    '<h1>Login</h1><form method="post" action="">\
                  <br>Enter email<br><input type="email" name="email">\
                  <br>Enter password<br><input type="password" name="password">\
                  <br><br><input type="submit" value="Submit"></form>';

  //res.send(form);
  res.render("../views/layouts/login");
}); */
clinicianRouter.get("/logout", utility.isLoggedIn, clinicianController.logout);

clinicianRouter.get("/aboutDiabetes", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("../views/about/about_diabetes_login_clinician.hbs");
  } else {
    res.render("../views/about/about_diabetes_clinician.hbs");
  }
});

clinicianRouter.get("/aboutWebsite", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("../views/about/about_website_login_clinician.hbs");
  } else {
    res.render("../views/about/about_website_clinician.hbs");
  }
});

clinicianRouter.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/clinician/login", // redirect to the homepage
    failureRedirect: "/clinician/signup", // redirect to signup page
    failureFlash: true, // should be true here
  }),
  (req, res, err) => {
    {
      console.log("hello");

      const link = "/clinician/login";
      res.redirect(link);
    }
  }
);

clinicianRouter.get("/signup", utility.unLoggedIn, (req, res, next) => {
  const form =
    '<h1>Signup</h1><form method="post" action="">\
                  <br>Enter email<br><input type="email" name="email">\
                  <br>Enter firstname<br><input type="text" name="firstname">\
                  <br>Enter lastname<br><input type="text" name="lastname">\
                  <br>Enter password<br><input type="password" name="password">\
                  <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
});

//Get all patients' data of a specified clinician
clinicianRouter.get(
  "/:clinician_id",
  utility.isLoggedIn,
  clinicianController.getAllPatients
);

clinicianRouter.get(
  "/:clinician_id/register",
  utility.isLoggedIn,
  clinicianController.renderRegister
);

//have to replace every id here with clinician_id

//Change whatever the patient need to input

//add a patient
clinicianRouter.post(
  "/:clinician_id/register",
  utility.isLoggedIn,
  clinicianController.addOnePatient
);

//get all of patient's comment (id is clinincian id)
clinicianRouter.get(
  "/:clinician_id/comments",
  utility.isLoggedIn,
  clinicianController.getAllComments
);

//get all of support sentence
clinicianRouter.get(
  "/:clinician_id/support",
  utility.isLoggedIn,
  clinicianController.getSupportSentence
);

//add support sentence
clinicianRouter.post(
  "/:clinician_id/support",
  utility.isLoggedIn,
  clinicianController.addSupportSentence
);
//get all of threshold
clinicianRouter.get(
  "/:clinician_id/threshold",
  utility.isLoggedIn,
  clinicianController.getAllThreshold
);
//change threshold of a specified patient
clinicianRouter.post(
  "/:clinician_id/threshold/",
  utility.isLoggedIn,
  clinicianController.modifyThreshold
);

// get all clinical notes for a certain patient once clicked their name
clinicianRouter.get(
  "/:clinician_id/:patient_id/notes",
  utility.isLoggedIn,
  clinicianController.getOnePatientAllNotes
);

// get all comments for a certain patient once clicked their name
clinicianRouter.get(
  "/:clinician_id/:patient_id/comments",
  utility.isLoggedIn,
  clinicianController.getOnesComments
);

// Add a clinical note for a certain patient
clinicianRouter.post(
  "/:clinician_id/:patient_id/addnote",
  utility.isLoggedIn,
  clinicianController.addOnePatientNote
);

//Add fields the patient need to input
clinicianRouter.post(
  "/:clinician_id/:patient_id/input",
  utility.isLoggedIn,
  clinicianController.modifyInput
);

/*//Delete fields the patient doesn't need to input
clinicianRouter.post(
  "/:clinician_id/delete/:patient_id/",
  clinicianController.deleteInput
);*/

//add support sentence
clinicianRouter.post(
  "/:clinician_id/:patient_id/support",
  utility.isLoggedIn,
  clinicianController.addSupportSentence
);

//Get one patient's data of a specified clinician
clinicianRouter.get(
  "/:clinician_id/:patient_id",
  utility.isLoggedIn,
  clinicianController.getOnePatient
);

module.exports = clinicianRouter;
