//This is transformation of data structure for futher use
const patient_threshold_list = (patient_threshold_data, patient_data, patient_inputs) => {
    var patient_threshold_ls = []
    const all_input = ["blood_level", "weight", "insulin_intake", "exercise"]

    patient_threshold_data.forEach((element) => {
        const threshold = element.threshold;
       //Some modification shold be added here (find function instead of hardcode)
       //include patient input(consider the input patient required to enter) 
       const patient = patient_data.find((data)=>data._id.toString() == element.id.toString());
      
       const patient_input = patient_inputs.find((input)=>input.id.toString() ==element.id.toString());
        const component = {
            "id": element.id,
            "name": patient.name,
            "patient_input": {},
            //put upper and lower bound threshold into attribute object
            "blood_level_u": threshold.blood_level.upper_bound,
            "blood_level_l": threshold.blood_level.lower_bound,
            "weight_u": threshold.weight.upper_bound,
            "weight_l": threshold.weight.lower_bound,
            "insulin_intake_u": threshold.insulin_intake.upper_bound,
            "insulin_intake_l": threshold.insulin_intake.lower_bound,
            "exercise_u": threshold.exercise.upper_bound,
            "exercise_l": threshold.exercise.lower_bound
        }
        
        if( patient_input != null){
            
            patient_input.input.forEach((input)=>component.patient_input[input]= true);
            all_input
            .filter((input) => !patient_input.input.includes(input))
            .map((input)=>component.patient_input[input] = false);
            
        
       
        }
        else{
            all_input.map((input)=>component.patient_input[input] = false);
        }
        patient_threshold_ls.push(component)     
    });    
        
    return patient_threshold_ls;
}

module.exports = patient_threshold_list;