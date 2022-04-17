//This is transformation of data structure for futher use
const patient_data = require("../../models/patient_data.js");
var patient_message_list = []
patient_data.forEach((element) => {
    const today = new Date().toLocaleDateString();
    const component = {
        "id": element.id,
        "name": element.name,
        "message_date": today,
        "message": element.message
    }
    patient_message_list.push(component)
    
});
const patient_message = patient_message_list;
module.exports = patient_message;