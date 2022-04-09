const patients_medical_list = require("../models/utils/patient_medical_data");
const patients_data = require("../models/patient_data");
const clinician_data = require("../models/clinician.js")
const getAllPatients = (req, res)=>{
    
    const clinician = clinician_data.find((one)=>one.id == req.params.id);

    const patient_id_list = clinician.patients;
    
    const patients_medical_data = patients_medical_list.filter((patient)=>
    patient_id_list.includes(patient.id)
    )
    
    res.render("../views/layouts/clinician_dashboard.hbs",{name: clinician.lastname, 
        patients: patients_medical_data});
    
}
const getOnePatient = (req, res)=>{
    const clinician = clinician_data.find((one)=>one.id == req.params.id);
    const patient_id_list = clinician.patients;
    const patient = patients_data.find((one)=> one.id == req.params.patient_id);
    if(patient && patient_id_list.includes(patient.id)){
        res.render("../views/layouts/clinician_patientdata.hbs",{name: patient.name, 
            patient_data: patient.data});
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