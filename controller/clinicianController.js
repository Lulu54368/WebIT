const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const patients_medical_list = require("../models/utils/patient_medical_data");
const patients_data = require("../models/patient_data.js");
const   Clinician = require("../models/clinician.js");
const Patient = require("../models/patient.js")
const patients_input = require("../models/patient_input");

/*const getCircularReplacer = () => {
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
  };*/
//This function get medical data for all patients]
const  getPatient = async(element)=>{
 
    const patient= await Patient.find({_id: element.toString()}).lean();
    return patient;
}
const getAllPatients = async(req, res)=>{
    
 
    //try{
        
        const clinician = await Clinician.findById(req.params.clinician_id).lean()
        var patients = [];
        
        if(clinician){
            
            const patient_id_list = clinician.patients;
            patient_id_list.forEach(element => {
                const patient =  getPatient(element);
                console.log(patient);
                patients.push(patient);
            });
           
            
            console.log("data");
            console.log(patients)
            res.render("../views/layouts/clinician_dashboard.hbs",{name: clinician.lastname, 
            patients: patients});
        }
        else{
            res.sendStatus(404);
        }
       
    
    
    /*}
    catch(err){
        return (err)
    }*/
    
    
    
    
}
//This function get the medical data for a specified patient
const getOnePatient = (req, res)=>{
    try{
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
    catch(err){
        console.log(err);
    }
    

}
const addOnePatient = async(req, res)=>{
   
    try{
        const clinician = await Clinician.findById(req.params.clinician_id).lean();
        var newPatient = req.body;
        if(clinician){
            if(JSON.stringify(newPatient) == "{}"){
                res.send("no patient sent");
            }
            else{
                const newemail = req.body.email;
                const currPatient = await Patient.findOne({email: newemail}).lean();
                if(currPatient!= "{}"){
                    
                    res.send("already exist")
                }
                else{
                
                    newPatient = await new Patient(newPatient);
                   
                    clinician.patients.push(newPatient._id);
                    clinician.save();
                    newPatient.save();
                    res.send(newPatient);
                }

            }
        
        }
    }
    catch(err){
        console.log(err);
    }
        
    
    
   
    
}
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
const clinicianController = { getAllPatients, getOnePatient, changeInput, addOnePatient}
module.exports =clinicianController