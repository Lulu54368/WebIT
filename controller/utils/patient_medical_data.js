//This is transformation of data structure for futher use
const patient_data_list=(patient_threshold_data, patient_data)=>{
    try {
        var patient_medical_list = []
        // each element is a patient object
        patient_data.forEach((element) => {
            const data = element.data;
            var component = {"name": element.name, "id": element._id};
            // store data if it was not empty
            data.forEach((attr)=>{
                component["date"] = attr.date
                component["blood_level"] = attr.blood_level.data
                component["weight"] = attr.weight.data
                component["exercise"] = attr.exercise.data
                component["insulin_intake"] = attr.insulin_intake.data
                component["blood_highlight"] = false;
                component["weight_highlight"] = false;
                component["exercise_highlight"] = false;
                component["insulin_highlight"] = false;
                // All upper/lower bounds would have been passed in a request body or set as default values, once a patient is added to database 
            })
    
            // now loop through threshold list to find current patient's threshold by their id
            patient_threshold_data.forEach((each_threshold) => {
                const threshold_id = each_threshold.id;
                // if threshold id matches the patient (component) id
                if (component.id.equals(threshold_id)) {
                    component["blood_ub"] = each_threshold.threshold.blood_level.upper_bound
                    component["blood_lb"] = each_threshold.threshold.blood_level.lower_bound
                    component["weight_ub"] = each_threshold.threshold.weight.upper_bound
                    component["weight_lb"] = each_threshold.threshold.weight.lower_bound
                    component["exercise_ub"] = each_threshold.threshold.exercise.upper_bound
                    component["exercise_lb"] = each_threshold.threshold.exercise.lower_bound
                    component["insulin_ub"] = each_threshold.threshold.insulin_intake.upper_bound
                    component["insulin_lb"] = each_threshold.threshold.insulin_intake.lower_bound
                }
            })
            // now compare patient data with their threshold bounds, ready for highlights if data lies beyond safety levels
            if ((component.blood_level < component.blood_lb) || component.blood_level > component.blood_ub) {
                component["blood_highlight"] = true;
            }
            if ((component.weight < component.weight_lb) || component.weight > component.weight_ub) {
                component["weight_highlight"] = true;
            }
            if ((component.exercise < component.exercise_lb) || component.exercise > component.exercise_ub) {
                component["exercise_highlight"] = true;
            }
            if ((component.insulin_intake < component.insulin_lb) || component.insulin_intake > component.insulin_ub) {
                component["insulin_highlight"] = true;
            }
            //console.log("utils line 65 check highlight, patient_component = ");
            //console.log(component);
            patient_medical_list.push(component);
        });
        return patient_medical_list;
    }
    catch(err) {
        return (err);
    }

}

module.exports = patient_data_list;