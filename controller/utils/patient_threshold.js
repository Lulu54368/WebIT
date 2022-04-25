//This is transformation of data structure for futher use
const patient_threshold_list = (patient_threshold_data, patient_data) => {
    var patient_threshold_ls = []
    console.log("line 4 utils/patient_threshold.js patient_threshold_data: " + patient_threshold_data + "patient = " + patient_data);   
    var i=0;   
    patient_threshold_data.forEach((element) => {
        const threshold = element.threshold;
        console.log("line 7 utils/patient_threshold.js threshold: " + threshold);
        const component = {
            "id": element.id,
            "name": patient_data[i].name,
            "blood_level_u": threshold.blood_level.upper_bound,
            "blood_level_l": threshold.blood_level.lower_bound,
            "weight_u": threshold.weight.upper_bound,
            "weight_l": threshold.weight.lower_bound,
            "insulin_intake_u": threshold.insulin_intake.upper_bound,
            "insulin_intake_l": threshold.insulin_intake.lower_bound,
            "exercise_u": threshold.exercise.upper_bound,
            "exercise_l": threshold.exercise.lower_bound
        }
        i++;
        patient_threshold_ls.push(component)
        
    });   
    return patient_threshold_ls;
}

module.exports = patient_threshold_list;