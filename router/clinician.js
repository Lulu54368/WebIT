const express = require("express");
const clinicianRouter = express.Router();
const clinicianController = require("../controller/clinicianController")
//Get a patient's data of a specified clinician
clinicianRouter.get("/:id/:patient_id", clinicianController.getOnePatient);
//Get all patients' data of a specified clinician
clinicianRouter.get("/:id", clinicianController.getAllPatients);
//Change whatever the patient need to input
clinicianRouter.post("/:id/:patient_id", clinicianController.changeInput);
module.exports = clinicianRouter;