
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const clinician_schema = Schema({
    
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
        type: [Schema.Types.ObjectId],
        required: true,
        default: []
    }
})
//This is data for clinician(personal information and patient's id)
const Clinician = mongoose.model("clinicians", clinician_schema);


module.exports = Clinician;



