//This is transformation of data structure for futher use
const patient_threshold_list = (patient_threshold_data) => {
    var patient_threshold_ls = []
    console.log(patient_threshold_data);
    patient_threshold_data.forEach((element) => {
        const threshold = element.threshold;
        console.log(threshold);
        const component = {
            "id": element.id,
            "blood_level_u": threshold.blood_level.upper_bound,
            "blood_level_l": threshold.blood_level.lower_bound,
            "weight_u": threshold.weight.upper_bound,
            "weight_l": threshold.weight.lower_bound,
            "insulin_intake_u": threshold.insulin_intake.upper_bound,
            "insulin_intake_l": threshold.insulin_intake.lower_bound,
            "exercise_u": threshold.exercise.upper_bound,
            "exercise_l": threshold.exercise.lower_bound
        }
        patient_threshold_ls.push(component)
    
    });
    return patient_threshold_ls;
}

module.exports = patient_threshold_list;