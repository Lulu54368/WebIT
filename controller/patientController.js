const patients_data = require("../models/patient_sample.js");
const patient_input = require("../models/patient_input_sample");
const Patient_input = require("../models/patient_input");
//This function get the most recent data for a specified patient
const Patients = require("../models/patient.js");
const Patient = Patients.Patients; //patient model
const Patient_Data_Schema = Patients.patient_data; //schema
const Data_Schema = Patients.Data;
const getCurrData = async (req, res)=>{
    const attributes = await Patient_input.findOne({id: req.params.patient_id.toString()}).lean();
    //console.log("patient controller line 11, attributes = ")
    //console.log(attributes);
    var input = attributes.input;
    const patient = await Patient.findById(req.params.patient_id);
    const today = new Date().toLocaleDateString();
    var today_data = patient.data.find(
        (one)=>(one.date == today)
    );

    // If today's data is not available, manipulate an empty object
    if(!today_data){
        today_data = {};
        input.forEach((attr)=>today_data[attr] = {
            data: "",
            comment: "",
            recorded: false
        });
        
    }
    //patient.data.push(today_data);
    //await patient.save();
    console.log({data: today_data , patient_name:patient.name, today: (new Date()).toLocaleDateString(), patient_input: attributes});
    res.render("../views/layouts/patienthomepage.hbs",
    {data: today_data , patient_name:patient.name, today: new Date().toLocaleDateString(), patient_input: attributes});
}
//This function add the newest data
const addTodayData = async (req, res)=>{

    patient = await Patient.findById(req.params.patient_id);

    const newData = req.body;

    if(JSON.stringify(newData) != "{}"){
        // find today's data
        var data = patient.data.find((data)=>data.date == new Date().toLocaleDateString());
        if(!data){  //If we can not find today's data, we create an empty object
            data = {
                "date": new Date().toLocaleDateString(),
                "blood_level": {
                    
                },
                "weight":{
                   
                    
                },
                "insulin_intake": {
                   
                   
                },
                "exercise":{
                    
                    
                }
            };
            
            patient.data.push(data);
        }


        const attributes = await Patient_input.findOne({id: req.params.patient_id});
   
        attributes.input.forEach(attr => {  //update the attribute the patient is required to input
            let attr_data = attr + "_data";
            let attr_comment = attr + "_comment";
            data[attr].data = req.body[attr_data];
            data[attr].comment = req.body[attr_comment];
            
        });
       
        //update the data
        patient.data.pop();
        patient.data.push(data);
   
        Patient.findByIdAndUpdate(req.params.patient_id, {data: patient.data});
        res.send(patient.data);

    }
    //redirect here
  
}
//add a piece of data
const addOneData = async (req, res)=>{
    try{
        const attributes = await Patient_input.findOne({id: req.params.patient_id.toString()}).lean();
        console.log("patient controller line 95, attributes = ")
        console.log(attributes);
        var input = attributes.input;
        patient = await Patient.findById(req.params.patient_id);
        const newData = req.body;
        if(JSON.stringify(newData) != "{}"){
            // takes the type of data entered (blood_level, insulin, weight, exercise)
            const attr = req.body.key;
            // find today's data
            var data = patient.data.find((stored_data)=>stored_data.date == new Date().toLocaleDateString());  // an array of patient_data (object) types
            
            // if no data was found today, construct a patient_data object
            if(!data){
            
                data = {"date": new Date().toLocaleDateString};  // timeStamp
                // initialise a data schema
                
                data[attr] = {"data": req.body.value, "comment": req.body.comment, 
                "createAt": new Date().toLocaleDateString(), "recorded": true}  // createAt stores the timeStamp?
                
            /**
                input.forEach((attr)=>{
                    data[attr] = {"data": {"data": req.body.value, "comment": req.body.comment, 
                                "createAt": new Date().toLocaleDateString, "recorded": true}}
                }); // created at should be timeStamp
                
                data[attr].data = req.body.value;
                data[attr].comment = req.body.comment;
                data[attr].recorded = true; //record data
                data[attr].createAt = true;
                console.log(data);
            */

                patient.data.push(data); //push data
            }

            // if some data was already found today
            else{
                var attr_data = patient.data.find((stored_data)=>stored_data[attr].createAt == new Date().toLocaleDateString());
                if(!attr_data || (typeof data[attr].data != "object")){
                    console.log("print");
                    console.log(data[attr]);
                    data[attr].data = req.body.value;
                    data[attr].comment = req.body.comment;
                    data[attr].recorded = true;
                    data[attr].createAt = new Date().toLocaleDateString();
                }
            
            }
            //await Patient.findByIdAndUpdate(patient._id, {data, });
            await patient.save();
            res.send(patient);
                
        }
        else{
            res.send("no patient sent");
        }
    }
    catch(err){
        console.log(err);
    }
  
}
module.exports ={ getCurrData, addTodayData, addOneData};