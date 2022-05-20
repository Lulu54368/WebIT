const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const Schema = mongoose.Schema;

const one_note = new Schema ({
    note_text: {
        type: String,
        required: false,
        default: ""
    },

    edit_date: {
        type: Date,
        required: false,
        default: new Date()
    }
})

const note_schema = new Schema({
    patient_id: {
        type: Schema.Types.ObjectId, // patient id defines a unique note
        required: true
    },

    notes: {
        type: Array,  // Array or [one_note]
        required: false,
        default: []
    }

})

//This is data for clinician notes
const ClinicianNote = mongoose.model("ClinicalNotes", note_schema);


module.exports = {one_note, ClinicianNote};