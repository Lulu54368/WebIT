//This is transformation of data structure for futher use
const patient_data_list=(patient_threshold_data, patient_data)=>{
    var patient_medical_list = []
    console.log("utils line 4, patient_data = ");
    console.log(patient_data);
    var i=0;
    patient_data.forEach((element) => {
        const data = element.data;
        console.log("utils line 8 data = ");
        console.log(data);
        console.log("utils line 9 patient name = " + element.name);
        var component = {"name": element.name};
        // store data if it was not empty
        data.forEach((attr)=>{
            component["id"] = element.id 
            component["date"] = attr.date
            component["blood_level"] = attr.blood_level.data
            component["weight"] = attr.weight.data
            component["exercise"] = attr.exercise.data
            component["insulin_intake"] = attr.insulin_intake.data
            component["blood_ub"] = patient_threshold_data[i].threshold.blood_level.upper_bound
            component["blood_lb"] = patient_threshold_data[i].threshold.blood_level.lower_bound
            component["weight_ub"] = patient_threshold_data[i].threshold.weight.upper_bound
            component["weight_lb"] = patient_threshold_data[i].threshold.weight.lower_bound
            component["exercise_ub"] = patient_threshold_data[i].threshold.exercise.upper_bound
            component["exercise_lb"] = patient_threshold_data[i].threshold.exercise.lower_bound
            component["insulin_ub"] = patient_threshold_data[i].threshold.insulin_intake.upper_bound
            component["insulin_lb"] = patient_threshold_data[i].threshold.insulin_intake.lower_bound
            // All upper/lower bounds would have been passed in a request body or set as default values  
        })
        patient_medical_list.push(component);
        i++;
    });
    return patient_medical_list;

}

module.exports = patient_data_list;