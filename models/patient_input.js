const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const Schema = mongoose.Schema;
const patient_input = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: true}, //patient's id
    input: {
        type: [String],
        required: false,
        default:["blood_level", "weight", "insulin_intake", "exercise"]
    }

})
//This is data for patient input
const Patient_input = mongoose.model("patientInput", patient_input);


module.exports = Patient_input;