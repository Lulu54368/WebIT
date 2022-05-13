//This is transformation of data structure for futher use
const patient_comment_list = (patient_data, patient_input) => {
    //console.log("utils 3 patient_data list");
    //console.log(patient_data);
    //console.log("utils 5 patient_input");
    //console.log(patient_input);
    var patient_comment_ls = []
    // each element is a single patient data object (that contains a 'data' list of objects)
    patient_data.forEach((element) => {
    const data = element.data;
    //console.log("utils 8 data");
    //console.log(data);
    // data is the list of all the data objects stored under a patient, attr is each individual data object
    data.forEach((attr)=>{
        const component = {
            "id": element._id.toString(),
            "date": attr.date,
            "name": element.name
        }
        //console.log("component id = ")
        //console.log(component.id);
        // find the current patient's input by id
        var current_input = patient_input.find((input_object) => input_object.id.toString() === component.id.toString())
        current_input.input.forEach( (input_field) => {
            component[input_field] = attr[input_field].comment;
        }) 
        patient_comment_ls.push(component)
    })
    
    });
    return patient_comment_ls;

}

module.exports = patient_comment_list;