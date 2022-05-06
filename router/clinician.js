
const express = require("express");
const clinicianRouter = express.Router();
const clinicianController = require("../controller/clinicianController");

//Get all patients' data of a specified clinician
clinicianRouter.get("/:clinician_id", clinicianController.getAllPatients);

//add a patient
clinicianRouter.post("/:clinician_id", clinicianController.addOnePatient);

//get all of patient's comment (id is clinincian id)
clinicianRouter.get("/:clinician_id/comments", clinicianController.getAllComments);

//get all of threshold 
clinicianRouter.get("/:clinician_id/threshold", clinicianController.getAllThreshold);

//get all of support sentence
clinicianRouter.get("/:clinician_id/support", clinicianController.getSupportSentence)

//Get one patient's data of a specified clinician
clinicianRouter.get("/:clinician_id/:patient_id", clinicianController.getOnePatient);

//Add fields the patient need to input
clinicianRouter.post("/:clinician_id/:patient_id/add", clinicianController.addInput);

//Delete fields the patient doesn't need to input
clinicianRouter.post("/:clinician_id/:patient_id/delete", clinicianController.deleteInput);

//change threshold of a specified patient
clinicianRouter.post("/:clinician_id/:patient_id/threshold", clinicianController.modifyThreshold);

//add support sentence
clinicianRouter.post("/:clinician_id/:patient_id/support", clinicianController.addSupportSentence);

module.exports = clinicianRouter;
