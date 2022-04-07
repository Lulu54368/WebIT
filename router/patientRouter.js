const express = require("express");
const patientController = require("../controller/patientController");
const patientRouter = express.Router();
patientRouter.get("/:id", patientController.getOnePatient);
patientRouter.get("/", patientController.getAllPatients);

patientRouter.post("/", patientController.addOnePatient);
module.exports = patientRouter;