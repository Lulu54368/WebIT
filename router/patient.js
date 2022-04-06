const express = require("express");
const controller = require("../controller/patientController.js");
const patientRouter = express.Router();

patientRouter.get("/", controller.getAllPatients);
patientRouter.get("/:id", controller.getOnePatient);
patientRouter.post("/", controller.addOnePatient);
module.exports = patientRouter;