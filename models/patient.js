const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const Schema = mongoose.Schema;
//This is medical data for patients
const Data = new Schema({
    data:{
        type: Number,
        required: true
    },
    comment:{
        type: String,
        required: false
    }
});
const patient_data = new Schema({
    date:{
        type: Date,
        required: true
    },
    blood_level:{
        type: Data,
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
        weight:{
            type: Number,
            required: false
        },
        date:{
            type: [patient_data],
            required: false
        }
    }
);
//const Patients = mongoose.model("patients", Patient);
//console.log(Patients.find())
module.exports = mongoose.model("patients", Patient);