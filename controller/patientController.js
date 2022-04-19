const patients_data = require("../models/patient_sample.js");
const patient_input = require("../models/patient_input_sample");
//This function get the most recent data for a specified patient
const Patients = require("../models/patient.js");
const Patient = Patients.Patients; //patient model
const Patient_Data_Schema = Patients.patient_data; //schema
const Data_Schema = Patients.Data;
const getCurrData = (req, res)=>{
    const patient = patients_data.find((one)=> one.id == req.params.id);
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

    if(JSON.stringify(newData) != "{}"){
        console.log(patient);
        var data = patient.data.find((data)=>data.date == new Date().toLocaleDateString());
        if(!data){
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
        const attributes = patient_input.find((one)=>one.id == req.params.patient_id);
        attributes.input.forEach(attr => {
            data[attr] = req.body[attr];
        });
        //some modification need to be made here
        patient.data.pop();
        patient.data.push(data);
        patient.save();
        res.send(patient.data);
    }
    //redirect here
  
}
module.exports ={ getCurrData, addTodayData};