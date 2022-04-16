const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const patients_medical_list = require("../models/utils/patient_medical_data");
const patients_data = require("../models/patient_data.js");
const   Clinician = require("../models/clinician.js");
const Patient = require("../models/patient.js")
const patients_input = require("../models/patient_input");
const addPatient = (req, res)=>{
    const patient_data_example =  {
  
        "name": "Lulu",
        "message": "hello Lulu",
        "message_edit_time": "01/01/2022",
        "data": [
            {
                "date": "1/1/2022",
                
                "blood_level": {
                    "data": 11,
                    "comment": "this is blood_level"
                },
                "weight":{
                    "data": 65,
                    "comment": "this is weight"
                },
                "insulin_intake": {
                    "data": 2,
                    "comment": "this is insulin intake"
                },
                "exercise":{
                    "data": 1000,
                    "comment": "this is exercise"
                }
            }]
        }
    const patient = new Patient(patient_data_example);
    
    patient.save();
    res.send(patient);
    console.log(Patient.find().lean());
}
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
//This function get medical data for all patients
const getAllPatients = async(req, res)=>{
    const result = JSON.stringify(await Clinician.findById(req.params.clinician_id).lean(), getCircularReplacer())
    res.send(result);
    console.log(result)
    try{
        console.log("hello");
        console.log(await Clinician.find());
        console.log(await Clinician.findById(req.params.id).lean());
        const clinician = Clinician.findById(req.params.id).lean()
        
        if(clinician){
            console.log(clinician._id);
            const patient_id_list = clinician.patients;
            console.log(clinician.patient_id_list);
            const patients_medical_data = patients_medical_list.filter((patient)=>
            patient_id_list.includes(patient.id))
    
            res.render("../views/layouts/clinician_dashboard.hbs",{name: clinician.lastname, 
            patients: patients_medical_data});
        }
        else{
            res.sendStatus(404);
        }
       
    
    
    }
    catch(err){
        return (err)
    }
    
    
    
    
}
//This function get the medical data for a specified patient
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
//This function change the attributes the patient need to enter
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
const clinicianController = { getAllPatients, getOnePatient, changeInput, addPatient}
module.exports =clinicianController