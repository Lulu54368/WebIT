const patients_data = require("../models/patient_sample.js");
const patient_input = require("../models/patient_input_sample");
const Patient_input = require("../models/patient_input");
//This function get the most recent data for a specified patient
const Patients = require("../models/patient.js");
const res = require("express/lib/response");
const { deleteOne } = require("../models/patient_input");
const Patient = Patients.Patients; //patient model
const Patient_Data_Schema = Patients.patient_data; //schema
const Data_Schema = Patients.Data;
const alert = require("alert");

const getCurrData = async (req, res) => {
  try {
    var attributes = await Patient_input.findOne({
      id: req.params.patient_id.toString(),
    }).lean();
    attributes = attributes.input;
    const patient = await Patient.findById(req.params.patient_id);
    const today = new Date().toLocaleDateString();
    const all_input = ["blood_level", "weight", "insulin_intake", "exercise"];
    var today_data = patient.data.find((one) => one.date == today);

    // If today's data is not available, manipulate an empty object
    if (!today_data) {
      today_data = {};
      attributes.forEach((attr) => {
        today_data[attr] = {
          data: "",
          comment: "",
          recorded: false,
        };
        today_data[attr].required = true; //patient required to enter
      });
    }

    all_input
      .filter((input) => !attributes.includes(input))
      .forEach((input) => {
        today_data[input] = { required: false };
      });
    console.log({
      data: today_data,
      patient_name: patient.name,
      today: new Date().toLocaleDateString(),
      patient_input: attributes,
      message: patient.message,
    });
    //only show the data of the attribute patient required to input
    res.render("../views/layouts/patienthomepage.hbs", {
      data: today_data,
      patient_name: patient.name,
      today: new Date().toLocaleDateString(),
      patient_input: attributes,
      message: patient.message,
      p_id: req.params.patient_id,
    });
  } catch (err) {
    console.log(err);
  }
};

//add a piece of data
const addOneData = async (req, res) => {
  try {
    var attributes = await Patient_input.findOne({
      id: req.params.patient_id,
    }).lean();
    attributes = attributes.input;

    patient = await Patient.findById(req.params.patient_id);
    const newData = req.body;
    if (JSON.stringify(newData) != "{}") {
      // find today's data
      const key_attr = req.body.key;
      var data = patient.data.find(
        (data) => data.date == new Date().toLocaleDateString()
      );

      if (!data) {
        data = {};
        data.date = new Date().toLocaleDateString(); //timeStamp
        attributes.forEach((attr) => {
          data[attr] = {
            data: "",
            comment: "",
            recorded: false,
            required: true,
          };
        }); //initialize

        data[key_attr].data = req.body.value;
        data[key_attr].comment = req.body.comment;
        data[key_attr].recorded = true; //record data
        data[key_attr].createAt = new Date().toLocaleDateString();
        patient.data.push(data); //push data
      } else {
        var attr_data = patient.data.find(
          (data) => data[key_attr].createAt == new Date().toLocaleDateString()
        );
        if (!attr_data) {
          data[key_attr].data = req.body.value;
          data[key_attr].comment = req.body.comment;
          data[key_attr].recorded = true;
          data[key_attr].createAt = new Date().toLocaleDateString();
        }
        patient.data.pop(); //remove the latest data
        patient.data.push(data);
      }

      await patient.save();

      res.redirect("/patient/" + req.params.patient_id);
    } else {
      res.send("no patient sent");
    }
  } catch (err) {
    console.log(err);
  }
};

//This function get the medical data for a specified patient
const getPatientHistory = async (req, res) => {
  try {
    const today = new Date().toLocaleDateString();
    const patient = await Patient.findById(req.params.patient_id).lean();
    console.log("patientController line 114");
    if (patient) {
      res.render("../views/layouts/patient_historyData.hbs", {
        today: new Date().toLocaleDateString(),
        patient_name: patient.name,
        history: patient.data,
        p_id: req.params.patient_id,
      });
    } else {
      res.send("patient not found");
    }
  } catch (err) {
    console.log(err);
  }
};

const renderLogin = () => {
  res.render("../views/layouts/login.hbs", {flash: req.flash('loginMessage')});
};
const logout = (req, res) => {
  req.logout();
  res.redirect("/patient/login");
};

const renderChangePwd = (req, res) => {
  res.render("../views/layouts/patient_change_pwd.hbs", {
    p_id: req.params.patient_id,
  });
};

const changePassword = async (req, res) => {
  // req body is {currPassWord, newPassword}
  try {
    const patient = await Patient.findById(req.params.patient_id);
    if (patient == null) {
      res.send("can not find patient");
    } else {
      console.log(req.body);

      await patient.verifyPassword(req.body.currPassword, (err, valid) => {
        if (valid == true) {
          patient.password = req.body.newPassword;
          patient.save();
       
          res.redirect("/patient/" + req.params.patient_id);
        } else {
          
          res.redirect("/patient/" + req.params.patient_id);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const renderLeaderboard = async (req, res) => {
  try {
    const top_five_patients = []
    const id_engage_dict = {}
    var i=0
    const TOP_LEN = 5
    const patients = await Patient.find().lean()
    const curr_patient = await Patient.findById(req.params.patient_id);
    const today = new Date()
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    patients.forEach((patient) => {
      var regisDays = Math.ceil(Math.abs((today - patient.register_date) / oneDay)) // calculate the days patients have been registered
      var num_data_entered = patient.data.length;
      var engagement_rate = num_data_entered / regisDays
      id_engage_dict[patient._id] = engagement_rate
    })
    
    var items = Object.keys(id_engage_dict).map( (key) => { return [key, id_engage_dict[key]] });
    // Sort the dictionary based on the second element (i.e. the value)
    items.sort( (first, second) => { return second[1] - first[1] });
    
    for (i=0; i<TOP_LEN; i++) {
      var pat = await Patient.findById(items[i][0])
      var pat_name = pat.name

      top_five_patients.push({"pat_name": pat_name, "rate":parseFloat(items[i][1]*100).toFixed(2), "rank": i+1})
    }

    res.render("../views/layouts/patient_leaderboard.hbs", {
    view_date: today.toLocaleDateString(),
    patient_name: curr_patient.name,
    top_patient: top_five_patients});
    
  } catch (err) {
    console.log(err)
  }
};

module.exports = {
  getCurrData,
  addOneData,
  logout,
  renderLogin,
  getPatientHistory,
  renderChangePwd,
  changePassword,
  renderLeaderboard,
};
