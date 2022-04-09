const express = require("express");
const clinicianRouter = express.Router();
const clinicianController = require("../controller/clinicianController")
clinicianRouter.get("/:id/:patient_id", clinicianController.getOnePatient);
clinicianRouter.get("/:id", clinicianController.getAllPatients);
clinicianRouter.post("/", clinicianController.addOnePatient);
module.exports = clinicianRouter;