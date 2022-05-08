
const express = require("express");
const clinicianRouter = express.Router();
const clinicianController = require("../controller/clinicianController");

clinicianRouter.get('/:clinician_id/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="">\
                    Enter email:<br><input type="text" name="email">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br>Enter name:<br><input type="text" name="name">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
    
});
//have to replace every id here with clinician_id

//Get all patients' data of a specified clinician
clinicianRouter.get("/:clinician_id", clinicianController.getAllPatients);
//Change whatever the patient need to input


//add a patient
clinicianRouter.post("/:clinician_id/register", clinicianController.addOnePatient);

//Phillips
//get all of patient's comment (id is clinincian id)
clinicianRouter.get("/:clinician_id//comments", clinicianController.getAllComments);

//get all of threshold 
clinicianRouter.get("/:clinician_id//threshold", clinicianController.getAllThreshold);

//change threshold of a specified patient
clinicianRouter.post("/:clinician_id/:patient_id/threshold", clinicianController.modifyThreshold);

//get all of support sentence
clinicianRouter.get("/:clinician_id//support", clinicianController.getSupportSentence)

//add support sentence
clinicianRouter.post("/:clinician_id/:patient_id/support", clinicianController.addSupportSentence);
clinicianRouter.post("/:clinician_id/:patient_id", clinicianController.changeInput);
//Get one patient's data of a specified clinician
clinicianRouter.get("/:clinician_id/:patient_id", clinicianController.getOnePatient);
module.exports = clinicianRouter;
