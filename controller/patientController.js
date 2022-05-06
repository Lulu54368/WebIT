const patients_data = require("../models/patient_sample.js");
const patient_input = require("../models/patient_input_sample");
const Patient_input = require("../models/patient_input");
//This function get the most recent data for a specified patient
const Patients = require("../models/patient.js");
const Patient = Patients.Patients; //patient model
const Patient_Data_Schema = Patients.patient_data; //schema
const Data_Schema = Patients.Data;
const getCurrData = async (req, res)=>{
    try {
        var attributes = await Patient_input.findOne({id: req.params.patient_id.toString()}).lean();
        attributes = attributes.input;
        const patient = await Patient.findById(req.params.patient_id);
        const today = new Date().toLocaleDateString();
        const all_input = ["blood_level", "weight", "insulin_intake", "exercise"];
        var today_data = patient.data.find(
            (one)=>(one.date == today)
        );
    
        // If today's data is not available, manipulate an empty object
        if(!today_data){
            today_data = {};
            attributes.forEach((attr)=>
            {
                today_data[attr] = {
                data: "",
                comment: "",
                recorded: false
                };
                today_data[attr].required = true; //patient required to enter
            });
            
        }
     
        all_input.filter((input)=>!attributes.includes(input))
        .forEach((input)=>{
            today_data[input] = {required: false}
        });
       
        //only show the data of the attribute patient required to input 
        res.render("../views/layouts/patienthomepage.hbs",
        {data: today_data , patient_name:patient.name, today: new Date().toLocaleDateString(), patient_input: attributes});
    
    }
    catch(err) {
        console.log(err);
    }
    
}


//add a piece of data
const addOneData = async (req, res)=>{
    try{
        var attributes = await Patient_input.findOne({id: req.params.patient_id}).lean();
    attributes = attributes.input;

    patient = await Patient.findById(req.params.patient_id);
    const newData = req.body;
    if(JSON.stringify(newData) != "{}"){
        // find today's data
        const key_attr = req.body.key;
        var data = patient.data.find((data)=>data.date == new Date().toLocaleDateString());
 
        if(!data){
            
            data = {};
            data.date = new Date().toLocaleDateString();  //timeStamp
            attributes.forEach((attr)=>{
                
                data[attr] = {
                data: "",
                comment: "",
                recorded: false,
                required: true
            }
            
        });    //initialize
            
            data[key_attr].data = req.body.value;
            data[key_attr].comment = req.body.comment;
            data[key_attr].recorded = true; //record data
            data[key_attr].createAt = new Date().toLocaleDateString();
            patient.data.push(data) //push data
        }
        else{
            var attr_data = patient.data.find((data)=>data[key_attr].createAt == new Date().toLocaleDateString());
            if(!attr_data){
                data[key_attr].data = req.body.value;
                data[key_attr].comment = req.body.comment;
                data[key_attr].recorded = true;
                data[key_attr].createAt = new Date().toLocaleDateString();
            }
            patient.data.pop()//remove the latest data
            patient.data.push(data);          
        }
        
        await patient.save();
       
        res.redirect("/patient/"+ req.params.patient_id);
            
    }
    else{
        res.send("no patient sent");
    }
    }
    catch(err){
        console.log(err);
    }
  
}
module.exports ={ getCurrData, addOneData};