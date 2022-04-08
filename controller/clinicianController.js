const patients_data = require("../models/patients.js");

const getAllPatients = (req, res)=>{
    //res.render("../HistoryData/historyData.hbs");
    res.render("../views/layouts/clinician_dashboard.hbs",{patients: patients_data});
    
}
const getOnePatient = (req, res)=>{
    const patient = patients_data.find((one)=> one.id == req.params.id);
    if(patient){
        res.render("../views/layouts/clinician_patientdata.hbs",{patient: patient});
    }
    else{
        res.send("patient not found");
    }

}
const addOnePatient = (req, res)=>{
    const newPatient = req.body;
    if(JSON.stringify(newPatient) != "{}"){
        if(!data.find(d => d.id == newPatient.id)){
            data.push(newPatient);
        }
    }
    res.send(data);
}
const clinicianController = { getAllPatients, getOnePatient, addOnePatient}
module.exports =clinicianController