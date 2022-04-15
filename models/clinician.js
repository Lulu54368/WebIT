const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const Schema = mongoose.Schema;
const clinician_schema = new Schema({
    
    firstname:{
        type: String,
        required: false,
        default: ""
    },
    lastname:{
        type: String,
        required: true
    },
    patients:{
        type: Object,
        required: true,
        default: []
    }
})
//This is data for clinician(personal information and patient's id)
const Clinician = mongoose.model("clinicians", clinician_schema);
console.log("hello");
console.log(Clinician.find());
module.exports = Clinician;