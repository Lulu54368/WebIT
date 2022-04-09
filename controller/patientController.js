const patients_data = require("../models/patient_data");
const getCurrData = (req, res)=>{
    const patient = patients_data.find((one)=> one.id == req.params.id);
    const today = new Date().toLocaleDateString();
    const today_data = patient.data.find(
        (one)=>(one.date == today)
    );
    console.log(today_data);
    res.render("../views/layouts/patienthomepage.hbs", 
    {name: patient.name,
    message: patient.message, data: today_data, today_date: today});
}
module.exports ={ getCurrData};