
const express = require("express");
const clinicianRouter = express.Router();
const clinicianController = require("../controller/clinicianController");


//have to replace every id here with clinician_id
//Get one patient's data of a specified clinician
clinicianRouter.get("/:clinician_id/:patient_id", clinicianController.getOnePatient);
//Get all patients' data of a specified clinician
clinicianRouter.get("/:clinician_id", clinicianController.getAllPatients);
//Change whatever the patient need to input
clinicianRouter.post("/:clinician_id/:patient_id", clinicianController.changeInput);

//add a patient
clinicianRouter.post("/:clinician_id", clinicianController.addOnePatient);

//Phillips
//get all of patient's comment (id is clinincian id)
clinicianRouter.get("/:clinician_id//comments", clinicianController.getAllComments);

//get all of threshold 
clinicianRouter.get("/:clinician_id//threshold", clinicianController.getAllThreshold);

//change threshold of a specified patient
clinicianRouter.post("/:clinician_id/:patient_id/threshold", clinicianController.modifyThreshold);

//get all of support sentence
clinicianRouter.get("/:clinician_id//support", clinicianController.getSupportSentence)

//add support sentence
clinicianRouter.post("/:clinician_id/:patient_id/support", clinicianController.addSupportSentence);

module.exports = clinicianRouter;
