//This threshold for patient
const patients_threshold =[ {
    "id": 1,
    "threshold":{
        "blood_level": {
            "upper_bound": 20,
            "lower_bound": 10
        },

        "weight":{
            "upper_bound": 100,
            "lower_bound": 50
        },
        "insulin_intake":{
            "upper_bound": 20,
            "lower_bound": 0
        },
        "exercise":
        {
            "upper_bound": 2000,
            "lower_bound": 500
        }
    }
},
{
    "id": 2,
    "threshold":{
        "blood_level": {
            "upper_bound": 20,
            "lower_bound": 10
        },

        "weight":{
            "upper_bound": 100,
            "lower_bound": 50
        },
        "insulin_intake":{
            "upper_bound": 20,
            "lower_bound": 0
        },
        "exercise":
        {
            "upper_bound": 2000,
            "lower_bound": 500
        }
    }
}]
module.exports = patients_threshold;