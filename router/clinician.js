const express = require("express");
const clinicianRouter = express.Router();
const clinicianController = require("../controller/clinicianController")
clinicianRouter.get("/:id", clinicianController.getOnePatient);
clinicianRouter.get("/", clinicianController.getAllPatients);
clinicianRouter.post("/", clinicianController.addOnePatient);
module.exports = clinicianRouter;