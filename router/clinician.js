const express = require("express");
const clinicianRouter = express.Router();
const clinicianController = require("../controller/clinicianController");
const utility = require("./clinicianUtility.js")
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

clinicianRouter.get("/login", utility.unLoggedIn,
    (req, res, next) => {

      const form = '<h1>Login</h1><form method="post" action="">\
                  <br>Enter email<br><input type="email" name="currPassword">\
                  <br>Enter password<br><input type="password" name="newPassword">\
                  <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
  }
);

clinicianRouter.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/clinician/login', // redirect to the homepage
  failureRedirect : '/signup', // redirect to signup page
  failureFlash : false // should be true here 
}));

clinicianRouter.get("/signup", utility.unLoggedIn,
    (req, res, next) => {

      const form = '<h1>Signup</h1><form method="post" action="">\
                  <br>Enter email<br><input type="email" name="email">\
                  <br>Enter firstname<br><input type="text" name="firstname">\
                  <br>Enter lastname<br><input type="text" name="lastname">\
                  <br>Enter password<br><input type="password" name="password">\
                  <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
  }
);
//Get all patients' data of a specified clinician
clinicianRouter.get("/:clinician_id", clinicianController.getAllPatients);

clinicianRouter.get("/:clinician_id/register", clinicianController.renderRegister);



//have to replace every id here with clinician_id

//Change whatever the patient need to input

//add a patient
clinicianRouter.post(
  "/:clinician_id/register",
  clinicianController.addOnePatient
);

//get all of patient's comment (id is clinincian id)
clinicianRouter.get(
  "/:clinician_id/comments",
  clinicianController.getAllComments
);

//get all of support sentence
clinicianRouter.get(
  "/:clinician_id/support",
  clinicianController.getSupportSentence
);

//add support sentence
clinicianRouter.post(
  "/:clinician_id/support",
  clinicianController.addSupportSentence
);
//get all of threshold
clinicianRouter.get(
  "/:clinician_id/threshold",
  clinicianController.getAllThreshold
);
//change threshold of a specified patient
clinicianRouter.post(
  "/:clinician_id/threshold/",
  clinicianController.modifyThreshold
);

// get all clinical notes for a certain patient once clicked their name
clinicianRouter.get(
  "/:clinician_id/:patient_id/notes", 
  clinicianController.getOnePatientAllNotes
);

// Add a clinical note for a certain patient
clinicianRouter.post(
  "/:clinician_id/:patient_id/addnote", 
  clinicianController.addOnePatientNote
)

//Add fields the patient need to input
clinicianRouter.post(
  "/:clinician_id/:patient_id/input",
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
  clinicianController.addSupportSentence
);

//Get one patient's data of a specified clinician
clinicianRouter.get(
  "/:clinician_id/:patient_id",
  clinicianController.getOnePatient
);


module.exports = clinicianRouter;
