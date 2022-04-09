const express = require("express");
const patientController = require("../controller/patientController.js");
const patientRouter = express.Router();
patientRouter.get("/:id", patientController.getCurrData);
/*patientRouter.get("/", patientController.getAllPatients);

patientRouter.post("/", patientController.addOnePatient);*/
module.exports = patientRouter;