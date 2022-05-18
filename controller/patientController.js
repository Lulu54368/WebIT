const { validationResult, matchedData } = require('express-validator');

const Patient_input = require("../models/patient_input");
//This function get the most recent data for a specified patient
const Patients = require("../models/patient.js");
const res = require("express/lib/response");
const { deleteOne } = require("../models/patient_input");
const Patient = Patients.Patients; //patient model
const Patient_Data_Schema = Patients.patient_data; //schema
const Data_Schema = Patients.Data;


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
     
    });
  } catch (err) {
    console.log(err);
  }
};

//add a piece of data
const addOneData = async (req, res) => {
  try {
    //validate
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       
        req.flash("failure", errors.array()[0]);
        res.redirect("/patient/" + req.params.patient_id);
    }
    else{
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
      });
    } else {
      res.send("patient not found");
    }
  } catch (err) {
    console.log(err);
  }
};

const renderLogin = () => {
  res.render("../views/layouts/login.hbs");
};
const logout = (req, res) => {
  req.logout();
  res.redirect("patient/login");
};

const renderChangePwd = (req, res) => {
  res.render("../views/layouts/patient_change_pwd.hbs");
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
          //res.send("saved!");
    
          res.redirect("/patient/" + req.params.patient_id);
        } else {
          //res.send("password not match");
         
          res.redirect("/patient/" + req.params.patient_id);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const renderLeaderboard = (req, res) => {
  res.render("../views/layouts/patient_leaderboard.hbs");
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
