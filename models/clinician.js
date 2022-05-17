
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
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
    },
    email:{
        type: String,
        required: false //should be true
    },
    password:{
        type: String,
        required: false // should be true
    }
})

const SALT_FACTOR = 10


// hash password before saving
clinician_schema.pre('save', function save(next) {
    const user = this// go to next if password field has not been modified
    if (!user.isModified('password')) {
        return next()
    }

    // auto-generate salt/hash
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
            return next(err)
        }
        //replace password with hash
        user.password = hash
        next()
    })
})

//This is data for clinician(personal information and patient's id)
const Clinician = mongoose.model("clinicians", clinician_schema);
module.exports = Clinician;



