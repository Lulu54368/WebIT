//This is transformation of data structure for futher use
const patient_data = require("../../models/patient_data.js");
var patient_medical_list = []
patient_data.forEach((element) => {
    const data = element.data;
    data.forEach((attr)=>{
        const component = {
            "id": element.id,
            "date": attr.date,
            "name": element.name,
            "blood_level": attr.blood_level.data,
            "weight": attr.weight.data,
            "exercise": attr.exercise.data,
            "insulin_intake": attr.insulin_intake.data

        }
        patient_medical_list.push(component)
    })
    
});
const patient_medical_data = patient_medical_list;
module.exports = patient_medical_data;