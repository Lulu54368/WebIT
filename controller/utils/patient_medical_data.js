//This is transformation of data structure for futher use
const patient_data_list=(patient_threshold_data, patient_data, c_notes_data)=>{
    try {
        var patient_medical_list = []
        // each element is a patient object
        console.log("executing utils patient_medical_data.js")
        patient_data.forEach((element) => {
            const data = element.data;
            var component = {"name": element.name, "id": element._id};
            
            // store the clinical note for each patient
            c_notes_data.forEach((each_note) => {
                const p_id = each_note.patient_id;  // each_note is a note_schema, where a list of one_notes is stored
                if(component.id.equals(p_id)) {     // if current clinical note's patient_id matches the pre-stored id in component
                    component["c_note"] = each_note.notes
                }
            })
            console.log("executing utils patient_medical_data.js")
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
                    component["weight_ub"] = each_threshold.threshold.weight.upper_bound
                    component["weight_lb"] = each_threshold.threshold.weight.lower_bound
                    component["exercise_ub"] = each_threshold.threshold.exercise.upper_bound
                    component["exercise_lb"] = each_threshold.threshold.exercise.lower_bound
                    component["insulin_ub"] = each_threshold.threshold.insulin_intake.upper_bound
                    component["insulin_lb"] = each_threshold.threshold.insulin_intake.lower_bound
                }
            })
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