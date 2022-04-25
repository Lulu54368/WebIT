const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const patient_medical_list = require("./utils/patient_medical_data");
const patients_data = require("../models/patient_sample");
const Clinician = require("../models/clinician.js");
const Patients = require("../models/patient.js");
const Patient = Patients.Patients; //patient model
//const Patient_Data_Schema = Patients.Patient_data_schema; //schema
//const Data_Schema = Patients.Data_schema;
const clinician_data = require("../models/clinician_sample.js");
const patient_comment_list = require("./utils/patient_comment");

const Patient_Threshold = require("../models/patient_threshold");
const patient_threshold_list = require("./utils/patient_threshold");
const patients_threshold = require("../models/patient_threshold_sample");

const patients_input = require("../models/patient_input_sample");
const patient_message_list = require("./utils/patient_message");
const { sendStatus } = require("express/lib/response");
const Patient_input = require("../models/patient_input");
const Patient_threshold = require("../models/patient_threshold");

//const patients_message_list = require("../models/utils/patient_message");

//This function get medical data for all patients


const getAllPatients = async(req, res)=>{
    
 
    try{
        
        const clinician = await Clinician.findById(req.params.clinician_id).lean()
        const patients = await Patient.find().lean();  // taken from /model/patient.js
        
        if(clinician){
            
            var patient_id_list = clinician.patients;
            console.log(patient_id_list);
            console.log("before filter = " + patients);
            patient_id_list = patient_id_list.map((id)=>id.toString());
            // filter to include only patients whose id are stored under a certain clinician
            var filtered_patients = patients.filter((patient)=> { 
                console.log(patient._id.toString());
                return patient_id_list.includes((patient._id).toString()) }); 
            console.log("after filter = " + filtered_patients);
            
            const patient_medical_data = patient_medical_list(filtered_patients); // the argument patients was filtered on the last line
                                                                        // and now pass as an argument specified in /utils/patient_medical_data.js
            console.log("patient_medical_data = " + patient_medical_data);
            res.render("../views/layouts/clinician_dashboard.hbs",{name: clinician.lastname, 
            patients: patient_medical_data});
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
    try{
        const clinician = clinician_data.find((one)=>one.id == req.params.clinician_id);
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
                console.log(JSON.stringify(newPatient));
                res.send("no patient sent");
            }
            else{
                const newemail = req.body.email;
                const currPatient = await Patient.findOne({email: newemail}).lean();
                if(currPatient!= null){
                    
                    res.send(currPatient);
                }
                else{
                
                    newPatient = await new Patient(newPatient);
                   
                    clinician.patients.push(newPatient._id);
                    await Clinician.findByIdAndUpdate(req.params.clinician_id, {patients: clinician.patients});
                    newPatient.save();
                    await Patient_Threshold.create({id: newPatient._id});
                    await Patient_input.create({id: newPatient._id});
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
const getAllComments = async(req, res, next)=>{   
    try {
        // Find a single clinician by matching the http:/clinician_id with the database clinician id 
        const clinician = await Clinician.findById(req.params.clinician_id).lean();  // Clinician model taken from /models/clinician
        const patients = await Patient.find().lean();  // taken from /models/patient, find all documents of patients
        const today = new Date().toLocaleDateString();
        // The clinician is valid
        if(clinician){
            // copy the patient's id list stored in the clinician
            var patient_id_list = clinician.patients;
            patient_id_list = patient_id_list.map((id)=>id.toString());
            
            // filter to include only patients whose id are stored under a certain clinician
            var filtered_patients = patients.filter((patient)=> { 
                return patient_id_list.includes((patient._id).toString()) }); 

            const patients_comment = patient_comment_list(filtered_patients); // the argument patients was filtered on the above line
            // and now passed as an argument specified in /utils/patient_comment.js
            console.log("line 158 clinicianController patients_comment = " + patients_comment);
            // patient_comment is each from the partial, patients_comment is the filtered comment
            res.render("../views/layouts/clinician_patientcomment.hbs",{view_date: today, patient_comment: patients_comment});
        }
        else{
            res.sendStatus(404);
        }
    }
    catch(err) {
        return next(err);
    }        
}

//This function get thresholds for all patients
const getAllThreshold = async (req, res, next)=>{
    try {
        // Find the clinician by matching the http:/clinician_id with the database clinician id 
        const clinician = await Clinician.findById(req.params.clinician_id).lean(); // Clinician model taken from /models/clinician
        const patient_thresholds = await Patient_Threshold.find().lean();
        console.log("line 177 clinicianController patient_thresholds = " + patient_thresholds);
        const today = new Date().toLocaleDateString();
        // the clinician is valid
        if(clinician) {
            // copy the patient's id list stored in the clinician
            var patient_id_list = clinician.patients;
            patient_id_list = patient_id_list.map((id)=>id.toString());

            // include patients only if their _id are included in the patient_id_list (which was originally queried from clinician.patients)
            //console.log("patient_id_list = " + patient_id_list);
            //console.log("patient_thresholds = " + patient_thresholds);
            patient_thresholds.filter((threshold) => patient_id_list.includes(threshold.id));
            const patients_threshold = patient_threshold_list(patient_thresholds);  // the argument patient_thresholds was filtered on the above line
            // and now passed as an argument specified in /utils/patient_threshold.js
            console.log("line 191 clinicianController patient_threshold = " + patients_threshold);
            res.render("../views/layouts/clinician_patientthreshold.hbs",{view_date: today, patient_threshold: patients_threshold});
        }
        else {
            sendStatus(404);
        }
    } 
    catch(err) {
        return next(err);
    }
        
}


//This function change the thresholds the clinician set for patients
const modifyThreshold = async (req, res, next)=>{
    try {
        const clinician = await Clinician.findById(req.params.clinician_id).lean();
        const patient_thresholds = await Patient_Threshold.find().lean(); // get all patient_threholds from database
        console.log("line 211 clinicianController modifyThreshold patient_thresholds = " + patient_thresholds);
        // define the entire Threshold object for processing, consiting of "id":{} and "threshold": {}
        var newThreshold = req.body;

        if (clinician) {
            if (JSON.stringify(newThreshold) == '{}') {
                res.send("No threshold was sent");
            } else {
                const patient_id = newThreshold.id; // take the patient_id passed in the http params   
                var curr_threshold = await Patient_Threshold.findOne({id: patient_id}) // find the existing threshold
                console.log("line 221 clinicianController modifyThreshold patient_id = " + patient_id + " curr_threshold = " + curr_threshold);
                // this is the first time the threshold is being added (does not exist yet), add this to database
                if (!curr_threshold) {
                    newThreshold = await new Patient_Threshold(newThreshold);
                    newThreshold.save();
                    res.send(newThreshold);
                
                // if threshold record has been initialised in database, update it. Assume the request body contains all 4 record attributes and 8 bounds 
                } else {
                    var threshold = curr_threshold.threshold;
                    console.log("line 229 clinicianController modifyThreshold threhold = " + threshold + "length = " + Object.keys(threshold).length);
                    var record_count = 0;
                    var bound_count = 0;
                    if (patient_id && threshold) {
                        for (var record in threshold) { // record refers to blood_level:{}, weight:{}, insuintake:{}, exercise:{}
                            bound_count = 0;
                            record_count ++;
                            if (record_count > Object.keys(threshold).length) {  // to avoid redundant attributes being triggered
                                break;
                            }
                            console.log("record = " + record, " record object = " + threshold[record]);
                            for (var bound in threshold[record]) {
                                bound_count ++;
                                if (bound_count > Object.keys(threshold[record]).length) {  // to avoid redundant attributes being triggered
                                    break;
                                }
                                console.log("bound = " + bound);
                                threshold[record][bound] = newThreshold["threshold"][record][bound];
                            }
                        }
                        // update to database
                        curr_threshold.save();
                        res.send(threshold);
                    } else {
                        res.send("can not find the patient");
                    }
                }

            }

        } else {
            res.sendStatus(404);
        }

    } catch (err) {
        return (err);
    }
    
}

//This function get support messages for all patients
const getSupportSentence = async (req, res, next)=>{
    try {
        // Find the clinician by matching the http:/clinician_id with the database clinician id 
        const clinician = await Clinician.findById(req.params.clinician_id).lean(); // Clinician model taken from /models/clinician
        const patients = await Patient.find().lean();  // taken from /models/patient, find all documents of patients
        const today = new Date().toLocaleDateString();
        if (clinician) {
            // copy the patient's id list stored in the clinician
            var patient_id_list = clinician.patients;
            patient_id_list = patient_id_list.map((id)=>id.toString());

            // include patients only if their _id are included in the patient_id_list (which was originally queried from clinician.patients)
            var filtered_patients = patients.filter((patient)=> { 
                return patient_id_list.includes((patient._id).toString()) }); 
            const patients_message = patient_message_list(filtered_patients); // the argument patients was filtered on the above line
            // the patient hasn't viewed the message
            if (!patients_message.viewed) {
                console.log("line 240 clinicianController patients_message = " + patients_message);
                res.render("../views/layouts/clinician_patientmessage.hbs",{view_date: today, patient_message: patients_message});
            } else {
                res.render("../views/layouts/clinician_patientmessage.hbs",{view_date: today, patient_message: ""});
            }
        
        } else {
            res.sendStatus(404);
        }
        
    } catch(err) {
        return (err);
    }
           
}

//This function add support messages for the specific patient
const addSupportSentence = async(req, res, next)=>{
    try{
        const clinician = await Clinician.findById(req.params.clinician_id).lean();
        console.log("line 310 clinician_ID = " + typeof clinician._id + " " + clinician._id);
        var newPatient = req.body;
        if(clinician){
            if(JSON.stringify(newPatient) == "{}"){
                res.send("no message sent");
            }
            else{
                const newMessage = req.body.message;
                console.log("request patient id = " + req.params.patient_id);
                
                var currPatient = await Patient.findById(req.params.patient_id);
                console.log(currPatient);
                
                currPatient.message = newMessage;
                currPatient.viewed = false;
                //currPatient.message = newMessage;
                currPatient.save();
                
                //Patient.findByIdAndUpdate(req.params.patient_id, {message: currPatient.message, new: true}); // still doesn't update to database
                res.send(currPatient.message);

            }
        
        }
    }
    catch(err){
        console.log(err);
    }
    
}

const clinicianController = { getAllPatients, getOnePatient, changeInput, getAllComments, getAllThreshold, modifyThreshold, getSupportSentence,

addSupportSentence, addOnePatient};


module.exports =clinicianController

