const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const clinician_schema = new Schema({
    id:{
        type: Number,
        required: true
    },
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
const clinician = mongoose.model("clinician", clinician_schema);

module.exports = clinician;