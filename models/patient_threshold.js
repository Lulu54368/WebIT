const mongoose = require("mongoose");
//const patient_threshold = require("../controller/utils/patient_threshold");
mongoose.connect(process.env.MONGO_URL);
//refer to subdocument
const Schema = mongoose.Schema;
const PatinetThreshold = new Schema({
    "id": {
        type: Schema.Types.ObjectId,
        required: true
    },
    //set defult if it's necessary
    "threshold":{
        "blood_level": {
            "upper_bound": {
                type: Number,
                required: false,
                default: Infinity
            },
            "lower_bound": {
                type: Number,
                required: false,
                default: 0
            }
        }
        ,

        "weight":{
            "upper_bound": {
                type: Number,
                required: false,
                default: Infinity
            },
            "lower_bound": {
                type: Number,
                required: false,
                default: 0
            }
        },
        "insulin_intake":{
            "upper_bound": {
                type: Number,
                required: false,
                default: Infinity
            },
            "lower_bound": {
                type: Number,
                required: false,
                default: 0
            }
        },
        "exercise":
        {
            "upper_bound": {
                type: Number,
                required: false,
                default: Infinity
            },
            "lower_bound": {
                type: Number,
                required: false,
                default: 0
            }
        }
    }
});
//This is data for patient input
const Patient_threshold = mongoose.model("patient_threshold", PatinetThreshold);


module.exports = Patient_threshold;