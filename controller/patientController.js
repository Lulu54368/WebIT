const patients_data = require("../models/patient_sample.js");
const patient_input = require("../models/patient_input_sample");
const Patient_input = require("../models/patient_input");
//This function get the most recent data for a specified patient
const Patients = require("../models/patient.js");
const Patient = Patients.Patients; //patient model
const Patient_Data_Schema = Patients.patient_data; //schema
const Data_Schema = Patients.Data;
const getCurrData = async (req, res)=>{
    const patient = await Patient.findById(req.params.patient_id);
    const today = new Date().toLocaleDateString();
    var today_data = patient.data.find(
        (one)=>(one.date == today)
    );
    if(!today_data){
        today_data = {
            "date": today,
            "blood_level": {
                "data": "",
                "comment": ""
            },
            "weight":{
                "data": "",
                "comment": ""
            },
            "insulin_intake": {
                "data": "",
                "comment": ""
            },
            "exercise":{
                "data": "",
                "comment": ""
            }
        }
        patient.data.push(today_data);
      
      

    }
   
   
    res.render("../views/layouts/patienthomepage.hbs",
    {name: patient.name,
    message: patient.message, data: today_data, today_date: today});
}
//This function add the newest data
const addTodayData = async (req, res)=>{

    patient = await Patient.findById(req.params.patient_id);

    const newData = req.body;
console.log("newData", newData)
    if(JSON.stringify(newData) != "{}"){
        
        var data = patient.data.find((data)=>data.date == new Date().toLocaleDateString());
        if(!data){
            data = {
                "date": new Date().toLocaleDateString(),
                "blood_level": {
                    data:newData.bloodLevelData,
                    comment:newData.bloodLevelComment
                },
                "weight":{
                    data:newData.weightData,
                    comment:newData.weightComment
                    
                },
                "insulin_intake": {
                    data:newData.insulinIntakeData,
                    comment:newData.insulinIntakeComment
                   
                },
                "exercise":{
                    data:newData.exerciseData,
                    comment:newData.exerciseComment
                    
                }
            };
            
            patient.data.push(data);
        }


        //connect here to the database
        const attributes = await Patient_input.findOne({id: req.params.patient_id});
        console.log(attributes);
        attributes.input.forEach(attr => {
            let attr_data = attr + "_data";
            let attr_comment = attr + "_comment";
            data[attr].data = req.body[attr_data];
            data[attr].comment = req.body[attr_comment];
        });
        //some modification need to be made here
        patient.data.pop();
        patient.data.push(data);
        Patient.findByIdAndUpdate(req.params.patient_id, {data: patient.data});
        res.send(patient.data);

    }
    //redirect here
  
}
module.exports ={ getCurrData, addTodayData};