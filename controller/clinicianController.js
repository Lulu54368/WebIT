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
            patient_id_list = patient_id_list.map((id)=>id.toString());
            // filter to include only patients whose id are stored under a certain clinician
            patients.filter((patient)=>patient_id_list.includes(patient._id));
            const patient_medical_data = patient_medical_list(patients); // the argument patients was filtered on the last line
                                                                        // and now pass as an argument specified in /utils/patient_medical_data.js
            console.log(patient_medical_data);
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
            
            // include patients only if their _id are included in the patient_id_list (which was originally queried from clinician.patients)
            patients.filter((patient) => patient_id_list.includes(patient._id));
            const patients_comment = patient_comment_list(patients); // the argument patients was filtered on the above line
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
                } else {
                    var threshold_object = curr_threshold.threshold;
                    console.log("line 229 clinicianController modifyThreshold threhold = " + threshold_object + "length = " + Object.keys(threshold_object).length);
                    var record_count = 0;
                    var bound_count = 0;
                    if (patient_id && threshold_object) {
                        for (var record in threshold_object) { // record refers to blood_level:{}, weight:{}, insuintake:{}, exercise:{}
                            bound_count = 0;
                            record_count ++;
                            if (record_count > Object.keys(threshold_object).length) {  // to avoid redundant attributes being triggered
                                break;
                            }
                            console.log("record = " + record, " record object = " + threshold_object[record]);
                            for (var bound in threshold_object[record]) {
                                bound_count ++;
                                if (bound_count > Object.keys(threshold_object[record]).length) {  // to avoid redundant attributes being triggered
                                    break;
                                }
                                console.log("bound = " + bound);
                                curr_threshold.update({"_id": curr_threshold._id},
                                    {$set: {
                                    "threshold.record.bound": newThreshold["threshold"][record][bound]}
                                })
                                //console.log("line 250 curr_threshold._id = " + curr_threshold._id);
                                //threshold[record][bound] = newThreshold["threshold"][record][bound];
                            }
                        }
                        // update to database
                        //curr_threshold.save();
                        res.send(curr_threshold.threshold);
                    } else {
                        res.send("can not find the patient");
                    }
                }

            }

        } else {
            res.sendStatus(404);
        }

    } catch (err) {
        return next(err);
    }
    
    
/*    
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
*/
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
            patients.filter((patient) => patient_id_list.includes(patient._id));
            const patients_message = patient_message_list(patients); // the argument patients was filtered on the above line
            // the patient hasn't viewed the message
            if (!patients_message.viewed) {
                console.log("line 240 clinicianController patients_message = " + patients_message);
                res.render("../views/layouts/clinician_patientmessage.hbs",{view_date: today, patient_message: patients_message});
                patients_message.viewed = true;
            } else {
                res.render("../views/layouts/clinician_patientmessage.hbs",{view_date: today, patient_message: ""});
            }
        
        } else {
            res.sendStatus(404);
        }
        
    } catch(err) {
        return next(err);
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


module.exports =clinicianController

