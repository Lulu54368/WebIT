//This is transformation of data structure for futher use
const patient_data_list=(patient_data, threshold_list)=>{
    const input = ["blood_level", ["weight"], ["insulin_intake"], ["exercise"]]; //use the true patient_input later
    const merged_data_list = patient_data.map(
        (data)=>{
            const matched = threshold_list.find((threshold)=>threshold.id.toString() === data._id.toString());
          
            if(matched){
                
                return {...data, ...matched};
            }
            else{
                return {...data,...{threshold:{
                    blood_level: { upper_bound: Infinity, lower_bound: 0 },
                    weight: { upper_bound: Infinity, lower_bound: 0 },
                    insulin_intake: { upper_bound: Infinity, lower_bound: 0 },
                    exercise: { upper_bound: Infinity, lower_bound: 0 }   //do not need it, delete later
                }}}; 
            }
        }
    ) // merge two list
    
   
    merged_data_list.forEach((element) => {    //iterate through data list of a patient
    const data = element.data;
    const threshold = element.threshold;
    data.forEach((attr)=>{
        const component = {
            "id": element.id,
            "date": attr.date,
            "name": element.name,
            
            

        }
        var attr_name;
        input.forEach((input)=>{
            console.log(attr[input])
            
            attr_name = input + "_threshold";
            console.log(threshold[input]);
            component[attr_name] = threshold[input];
            if(attr[input])    component[input] = attr[input].data;
            
        })
        console.log(component);
        patient_medical_list.push(component)
    })
    
    });
    console.log(patient_medical_list);
    return patient_medical_list;

}


module.exports = patient_data_list;