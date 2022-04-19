const express = require("express");
const patientController = require("../controller/patientController.js");
const patientRouter = express.Router();
//have to replace every id here with patient_id
//get current patient's data
patientRouter.get("/:id/data", patientController.getCurrData);




//add current patient's data
patientRouter.post("/:patient_id", patientController.addTodayData);
module.exports = patientRouter;