const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const patients_medical_list = require("../models/utils/patient_medical_data");
const patients_data = require("../models/patient_data");
const Clinician = require("../models/clinician.js");
const clinician_data = require("../models/clinician_data.js");
const patients_comment_list = require("../models/utils/patient_comment");

const patients_threshold_list = require("../models/utils/patient_threshold");
const patients_threshold = require("../models/patient_threshold");

const patients_input = require("../models/patient_input");

//const patients_message_list = require("../models/utils/patient_message");

//This function get medical data for all patients

const getAllPatients = async (req, res)=>{
    
 
    //try{
        
        const clinician = await Clinician.findById(req.params.clinician_id).lean()
        var patients = [];
        
        if(clinician){
            
            const patient_id_list = clinician.patients;
            //here are some problems
            patient_id_list.forEach(element => {
                var patient;
                async()=>{
                    patient = await Patient.findById(element.toString());
                }
                    
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

//This function get comments for all patients
const getAllComments = (req, res)=>{
    // Get the clinician if the patient's id is found in clinician's patient ID list
    const clinician = clinician_data.find((one)=>one.id == req.params.id);
    const today = new Date().toLocaleDateString();

    if(clinician){
        const patient_id_list = clinician.patients;
        // include the patient data only if the patient id is included in the patient_id_list
        const patients_comment = patients_comment_list.filter((patient)=>
        patient_id_list.includes(patient.id)
        )
        // patient_comment is each from the partial, patients_comment is the filtered comment
        res.render("../views/layouts/clinician_patientcomment.hbs",{view_date: today, patient_comment: patients_comment});
    }
    else{
        res.send("can not find the clinician");
    }        
}

//This function get comments for all patients
const getAllThreshold = (req, res)=>{
    // Get the clinician if the patient's id is found in clinician's patient ID list
    const clinician = clinician_data.find((one)=>one.id == req.params.id);
    const today = new Date().toLocaleDateString();
    if(clinician){
        const patient_id_list = clinician.patients;
        // include the patient data only if the patient id is included in the patient_id_list
        const patients_threshold = patients_threshold_list.filter((patient)=>
        patient_id_list.includes(patient.id)
        )
        // patient_threshold is each from the partial, patients_threshold is the filtered threshold
        res.render("../views/layouts/clinician_patientthreshold.hbs",{view_date: today, patient_threshold: patients_threshold});
    }
    else{
        res.send("can not find the clinician");
    }
        
}


//This function change the thresholds the clinician set for patients
const modifyThreshold = (req, res)=>{
    // find the patient of the clinician and check whether it's exist 
    const clinician = clinician_data.find((one)=>one.id == req.params.id);
    const patient_id_list = clinician.patients;
   // .id refers to clinician id, .patient_id refers to patient id
    const patient = patient_id_list.find((one)=> one == req.params.patient_id);
    // get the data the patient is required to enter
    const patient_threshold = patients_threshold.find((one)=> one.id == req.params.patient_id);
    if(patient && patient_threshold){
        patient_threshold.threshold = req.body.threshold;
        res.send(patient_threshold);
    }
    else{
        res.send("can not find the patient");
    }
}

//This function get comments for all patients
const getSupportSentence = (req, res)=>{
    // Get the clinician if the patient's id is found in clinician's patient ID list
    const clinician = clinician_data.find((one)=>one.id == req.params.id);
    const today = new Date().toLocaleDateString();
    if(clinician){
        const patient_id_list = clinician.patients;
        // include the patient data only if the patient id is included in the patient_id_list
        const patient_data = patients_data.filter((patient)=>
        patient_id_list.includes(patient.id)
        )
        
        if (!patient_data.viewed) {
            // patient_message is each from the partial, patients_message is the filtered message
            res.render("../views/layouts/clinician_patientmessage.hbs",{view_date: today, patient_message: patient_data});
            patient_data.viewed = true;
        }
        else {
            res.render("../views/layouts/clinician_patientmessage.hbs",{view_date: today, patient_message: ""});
        }

    }
    else{
        res.send("can not find the clinician");
    }
        
}

//This function add support messages for the specific patient
const addSupportSentence = (req, res)=>{
    // find the patient of the clinician and check whether it's exist 
    const clinician = clinician_data.find((one)=>one.id == req.params.id);
    const patient_id_list = clinician.patients;
   // .id refers to clinician id, .patient_id refers to patient id
    const patient = patient_id_list.find((one)=> one == req.params.patient_id);
    // get the data the patient is required to enter
    const patient_data = patients_data.find((one)=> one.id == req.params.patient_id);
    if(patient && patient_data){
        patient_data.message = req.body.message;
        patient_data.viewed = false;
        res.send(patient_data.message);

        patients_data.push(patient_data); // push to database
    }
    else{
        res.send("can not find the patient");
    }        
}

const clinicianController = { getAllPatients, getOnePatient, changeInput, getAllComments, getAllThreshold, modifyThreshold, getSupportSentence,
addSupportSentence, addOnePatient};
module.exports = clinicianController;