const express = require("express");
const patientController = require("../controller/patientController.js");
const patientRouter = express.Router();
//have to replace every id here with patient_id
//get current patient's data
patientRouter.get("/:patient_id", patientController.getCurrData);




//add current patient's data
patientRouter.post("/:patient_id", patientController.addOneData);
module.exports = patientRouter;