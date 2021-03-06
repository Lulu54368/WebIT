//This is transformation of data structure for futher use
const patient_comment_list = (patient_data, patient_input) => {
    var patient_comment_ls = []
    patient_data.forEach((element) => {
    const data = element.data;
    // data is the collection of all data, attr is each daily data
    data.forEach((attr)=>{
        const component = {
            "id": element._id,
            "date": attr.date,
            "name": element.name
        }
      
        var current_input = patient_input.find((input_object) => input_object.id.toString() === component.id.toString())
        current_input.input.forEach( (input_field) => {
            // if some data has been stored in the required input field
            if(attr[input_field]) {
                component[input_field] = attr[input_field].comment;
            } else {
                component[input_field] = ""
            }    
        }) 
        patient_comment_ls.push(component)
    })
    
    });
    return patient_comment_ls;

}

module.exports = patient_comment_list;