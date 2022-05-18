const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

//This is medical data for patients
const Data = new Schema({
  data: {
    type: Number,
    validate: {
      validator: (v) => typeof v === "number",
      message: (props) => `${props.value} is not a number`,
    },
    required: false,
    default: -1,
  },
  comment: {
    type: String,
    required: false,
    default: "",
  },
});
const patient_data = new Schema({
  date: {
    type: String,
    required: false,
    default: new Date(),
  },
  blood_level: {
    data: Data,
    required: false,
  },
  insulin_intake: {
    data: Data,
    required: false,
  },
  exercise: {
    data: Data,
    required: false,
  },
  weight: {
    data: Data,
    required: false,
  },
});
const Patient = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false, //need to change
  },
  register_date: {
    type: Date,
    required: false,
  },
  screen_name: {
    type: String,
    required: false, // should required be true? or should we set a default name unless a patient enters it
    default: "Anonymous",
  },
  message: {
    type: String,
    required: false,
    default: "",
  },
  viewed: {
    type: Boolean,
    required: false,
    default: false,
  },
  data: {
    type: Array, //should be patient_data here, change it at last
    required: false,
  },
  last_name: {
    type: String,
    required: false,
    default: "",
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  year: {
    type: Date,
    required: false,
  },
});

// password comparison function
Patient.methods.verifyPassword = async function (password, callback) {
  await bcrypt.compare(password, this.password, (err, valid) => {
    callback(err, valid);
  });
};

const SALT_FACTOR = 10;

// hash password before saving
Patient.pre("save", function save(next) {
  const user = this; // go to next if password field has not been modified
  if (!user.isModified("password")) {
    return next();
  }

  // auto-generate salt/hash
  bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
    if (err) {
      return next(err);
    }
    //replace password with hash
    user.password = hash;
    next();
  });
});
//const Patients = mongoose.model("patients", Patient);
//console.log(Patients.find())
const Patients = mongoose.model("patients", Patient);
//const Data_schema = mongoose.model("patients", Data);
//const Patient_data_schema = mongoose.model("patients", patient_data);
module.exports = { patient_data, Data, Patients };
