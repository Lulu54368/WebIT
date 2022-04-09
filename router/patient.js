const express = require("express");
const patientController = require("../controller/patientController.js");
const patientRouter = express.Router();
patientRouter.get("/:id", patientController.getCurrData);


patientRouter.post("/:id", patientController.addTodayData);
module.exports = patientRouter;