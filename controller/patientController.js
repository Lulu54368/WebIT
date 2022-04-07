const data = require("../models/patients.js");
const getAllPatients = (req, res)=>{
    res.send(data);
    
}
const getOnePatient = (req, res)=>{
    const patient = data.find((one)=> one.id == req.params.id);
    if(patient){
        res.send(patient);
    }
    else{
        res.send("patient not found");
    }

}
const addOnePatient = (req, res)=>{
    const newPatient = req.body;
    if(JSON.stringify(newPatient) != "{}"){
        if(!data.find(d => d.id == newPatient.id)){
            data.push(newPatient);
        }
    }
    res.send(data);
}
const patientController = { getAllPatients, getOnePatient, addOnePatient}
module.exports =patientController