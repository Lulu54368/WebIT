const patients_data = require("../models/patient_data");
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
        console.log(patient.data);
        console.log("hello");

    }
   
    console.log(today_data);
    res.render("../views/layouts/patienthomepage.hbs", 
    {name: patient.name,
    message: patient.message, data: today_data, today_date: today});
}
const addTodayData = (req, res)=>{
    const patient = patients_data.find((one)=> one.id == req.params.id)
    const newData = req.body;

    if(JSON.stringify(newData) != "{}"){
        console.log(patient);
        var data = patient.data.find((data)=>data.date == new Date().toLocaleDateString());
        if(!data){
            data = {
                "date": new Date().toLocaleDateString(),
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
            
            patient.data.push(data);
        }
       
        data.blood_level = newData.blood_level;
        data.insulin_intake = newData.insulin_intake;
        data.exercise = newData.exercise;
        data.weight = newData.weight;
        patient.data.pop();
        patient.data.push(data)
        res.send(patient.data);
    }
    //redirect here
  
}
module.exports ={ getCurrData, addTodayData};