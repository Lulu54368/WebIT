const patients_medical_list = require("../models/utils/patient_medical_data");
const patients_data = require("../models/patient_data");
const clinician_data = require("../models/clinician.js");

const patients_input = require("../models/patient_input");
const getAllPatients = (req, res)=>{
    
    const clinician = clinician_data.find((one)=>one.id == req.params.id);
    if(clinician){
        const patient_id_list = clinician.patients;
        const patients_medical_data = patients_medical_list.filter((patient)=>
        patient_id_list.includes(patient.id)
        )
    
        res.render("../views/layouts/clinician_dashboard.hbs",{name: clinician.lastname, 
        patients: patients_medical_data});
    }
    else{
        res.send("can not find the clinician");
    }
    
    
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
/*const addOnePatient = (req, res)=>{
    
    const clinician = clinician_data.find((one)=>one.id == req.params.id);
    const newPatient = req.body;
    if(clinician){
        const patient_id_list = clinician.patients;
        const data = patients_medical_list.filter((patient)=>
        patient_id_list.includes(patient.id)
        )
        if(JSON.stringify(newPatient) != "{}"){
            if(!data.find(d => d.id == newPatient.id)){
                data.push(newPatient);
            }
        }
    
        res.send(data);
    }
   
    
}*/
const changeInput = (req, res)=>{
    // find the patient of the clinician and check whether it's exist 
    const clinician = clinician_data.find((one)=>one.id == req.params.id);
    const patient_id_list = clinician.patients;
   
    const patient = patient_id_list.find((one)=> one == req.params.patient_id);
    // get the data the patient is required to enter
    const patient_input = patients_input.find((one)=> one.id == req.params.patient_id);
    if(patient && patient_input){
        patient_input.input = req.body.input;
        res.send(patient_input);
    }
    else{
        res.send("can not find the patient");
    }
}
const clinicianController = { getAllPatients, getOnePatient, changeInput}
module.exports =clinicianController