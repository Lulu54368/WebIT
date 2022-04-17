<<<<<<< HEAD
//This is data for clinician(personal information and patient's id)
const clinician_data = [
    {
        "id": 1,
        "firstname": "Xiao ming",
        "lastname": "Zhang",
        "patients": [1,2] //patients' id
    }
]
module.exports = clinician_data;
=======
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
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
>>>>>>> 5160fe9fce7fc75c2ed605c58b7caa1940753128
