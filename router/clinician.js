const express = require("express");
const clinicianRouter = express.Router();
const clinicianController = require("../controller/clinicianController");

//Get all patients' data of a specified clinician
clinicianRouter.get("/:clinician_id", clinicianController.getAllPatients);

clinicianRouter.get("/:clinician_id/register", clinicianController.renderRegister);

clinicianRouter.get("/:clinician_id/register",clinicianController.addOnePatient);

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

// get all comments for a certain patient once clicked their name
clinicianRouter.get(
  "/:clinician_id/:patient_id/comments",
  clinicianController.getOnesComments
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
