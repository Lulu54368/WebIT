const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const Schema = mongoose.Schema;
//This is medical data for patients
const Data = new Schema({
    data:{
        type: Number,
        required: false,
        default: -1

    },
    comment:{
        type: String,
        required: false,
        default: ""
    }
});
const patient_data = new Schema({
    date:{
        type: String,
        required: true
    },
    blood_level:{
        data: Data,
        required: false,
      
    },
    insulin_intake:{
        data: Data,
        required: false,
     
    },
    exercise:{
        data: Data,
        required: false
    },
    weight:{
        data: Data,
        required: false
    }


})
const Patient = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        message:{
            type: String,
            required: false,
            default: ""
        },
        viewed:{
            type: Boolean,
            required: false,
            default: false
        },
        weight:{
            type: Number,
            required: false
        },
        data:{
            type: patient_data, //should be patient_data here
            required: false
        }
    }
);
//const Patients = mongoose.model("patients", Patient);
//console.log(Patients.find())
const Patients = mongoose.model("patients", Patient);
//const Data_schema = mongoose.model("patients", Data);
//const Patient_data_schema = mongoose.model("patients", patient_data);
module.exports = {patient_data, Data, Patients}