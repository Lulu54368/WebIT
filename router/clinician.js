const express = require("express");
const clinicianRouter = express.Router();
const clinicianController = require("../controller/clinicianController");

//Get a patient's data of a specified clinician
clinicianRouter.get("/:id/:patient_id", clinicianController.getOnePatient);
//Get all patients' data of a specified clinician
clinicianRouter.get("/:id", clinicianController.getAllPatients);
//Change whatever the patient need to input
clinicianRouter.post("/:id/:patient_id", clinicianController.changeInput);


//Phillips
//get all of patient's comment (id is clinincian id)
clinicianRouter.get("/:id//comments", clinicianController.getAllComments);

//get all of threshold 
clinicianRouter.get("/:id//threshold", clinicianController.getAllThreshold);

/*
//change threshold of a specified patient
clinicianRouter.post("/:id/:patient_id/threshold", clinicianController.modifyThreshold);
/*
//get all of support sentence
clinicianRouter.get("/:id/support", clinicianController.getSupportSentence)
//add support sentence
clinicianRouter.post("/:id/:patient_id/support", clinicianController.addSupportSentence);
*/
module.exports = clinicianRouter;