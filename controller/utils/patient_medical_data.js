//This is transformation of data structure for futher use
const patient_data_list=(patient_threshold_data, patient_data)=>{
    try {
        var patient_medical_list = []
        // each element is a patient object
        patient_data.forEach((element) => {
            const data = element.data;
            var component = {"name": element.name, "id": element._id};
            
            // store data if it was not empty, here data has stored all data the patient has entered, and each 'attr' is a single data object
            data.forEach((attr)=>{
                var skip_date=0;
                component["date"] = attr.date  // date must have accompanied input(s) so safe to store it whenever each data object (attr) is not empty
                // only store relevant inputs
                for (var input of Object.keys(attr)) {
                    if(skip_date > 0) {
                        component[input] = attr[input].data;
                    }
                    skip_date++;
                }
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
                    component["blood_validate"] = true
                    component["weight_ub"] = each_threshold.threshold.weight.upper_bound
                    component["weight_lb"] = each_threshold.threshold.weight.lower_bound
                    component["weight_validate"] = true
                    component["exercise_ub"] = each_threshold.threshold.exercise.upper_bound
                    component["exercise_lb"] = each_threshold.threshold.exercise.lower_bound
                    component["exercise_validate"] = true
                    component["insulin_ub"] = each_threshold.threshold.insulin_intake.upper_bound
                    component["insulin_lb"] = each_threshold.threshold.insulin_intake.lower_bound
                    component["insulin_validate"] = true
                }
            })

            // Validate upper bounds must be greater than lower bound
            if ( (component.blood_ub < component.blood_lb) ) {
                component.blood_validate = false
            }

            if ( (component.weight_ub < component.weight_lb) ) {
                component.weight_validate = false
            }

            if ( (component.exercise_ub < component.exercise_lb) ) {
                component.exercise_validate = false
            }

            if ( (component.insulin_ub < component.insulin_lb) ) {
                component.insulin_validate = false
            }

            // now compare patient data with their threshold bounds, ready for highlights if data lies beyond safety levels
            // make sure only highlight if there exists data
            if ( (component.blood_level < component.blood_lb || component.blood_level > component.blood_ub) && (component.blood_level!='') ) {
                component["blood_highlight"] = true;

            }
            if ( (component.weight < component.weight_lb || component.weight > component.weight_ub) && (component.weight!='') ){
                component["weight_highlight"] = true;
            }
            if ( (component.exercise < component.exercise_lb || component.exercise > component.exercise_ub) && (component.exercise!='') ){
                component["exercise_highlight"] = true;
            }
            if ( (component.insulin_intake < component.insulin_lb || component.insulin_intake > component.insulin_ub) && (component.insulin_intake!='') ){
                component["insulin_highlight"] = true;
            }
            patient_medical_list.push(component);
        });
        return patient_medical_list;
    }
    catch(err) {
        return (err);
    }

}

module.exports = patient_data_list;