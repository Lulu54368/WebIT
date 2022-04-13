const express = require("express");
const patientController = require("../controller/patientController.js");
const patientRouter = express.Router();
//get current patient's data
patientRouter.get("/:id", patientController.getCurrData);

//add current patient's data
patientRouter.post("/:id", patientController.addTodayData);

module.exports = patientRouter;