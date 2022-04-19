const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
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
                required: false
                
            },
            "lower_bound": {
                type: Number,
                required: false
            }
        }
        ,

        "weight":{
            "upper_bound": {
                type: Number,
                required: false
            },
            "lower_bound": {
                type: Number,
                required: false
            }
        },
        "insulin_intake":{
            "upper_bound": {
                type: Number,
                required: false
            },
            "lower_bound": {
                type: Number,
                required: false
            }
        },
        "exercise":
        {
            "upper_bound": {
                type: Number,
                required: false
            },
            "lower_bound": {
                type: Number,
                required: false
            }
        }
    }
});