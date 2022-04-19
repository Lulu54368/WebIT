//This is transformation of data structure for futher use
const patient_data_list=(patient_data)=>{
    var patient_medical_list = []
    console.log(patient_data);
    patient_data.forEach((element) => {
    const data = element.data;
    console.log(data);
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
    return patient_medical_list;

}


module.exports = patient_data_list;