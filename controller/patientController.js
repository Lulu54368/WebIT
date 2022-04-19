const patients_data = require("../models/patient_data.js");
const patient_input = require("../models/patient_input");
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
    const patient = await Patient.findById(req.params.patient_id);
    const newData = req.body;

    if(JSON.stringify(newData) != "{}"){
        //console.log(patient);
        var data = patient.data.find((data)=>data.date == new Date().toLocaleDateString());
        if(!data){
            data = new Patient_Data_Schema({
                "date": new Date().toLocaleDateString(),
                "blood_level": new Data_Schema({
                    "data": "",
                    "comment": ""
                }),
                "weight":new Data_Schema({
                    "data": "",
                    "comment": ""
                }),
                "insulin_intake":new Data_Schema( {
                    "data": "",
                    "comment": ""
                }),
                "exercise":new Data_Schema({
                    "data": "",
                    "comment": ""
                })
            })
            
            patient.data.push(data);
        }
        const attributes = patient_input.find((one)=>one.id == req.params.id);
        attributes.input.forEach(attr => {
            data[attr] = new Data_Schema(req.body[attr]);
        });
        //some modification need to be made here
        patient.data.pop();
        patient.data.push(data)
        res.send(patient.data);
    }
    //redirect here
  
}
module.exports ={ getCurrData, addTodayData};