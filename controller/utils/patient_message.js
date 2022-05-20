//This is transformation of data structure for futher use
const patient_message_list = (patient_data) => {
    var patient_message_ls = []
    patient_data.forEach((element) => {
        const component = {
            "id": element._id.toString(),
            "name": element.name,
            "viewed": element.viewed,
            "message": element.message
        }
        patient_message_ls.push(component)
    
    });
    return patient_message_ls;
}

module.exports = patient_message_list;