const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const patient_medical_list = require("./utils/patient_medical_data");
const patients_data = require("../models/patient_sample");
const Clinician = require("../models/clinician.js");
const Patients = require("../models/patient.js");
const Patient = Patients.Patients; // only use the main patient model/schema
//const Patient_Data_Schema = Patients.Patient_data_schema; //schema
//const Data_Schema = Patients.Data_schema;
const clinician_data = require("../models/clinician_sample.js");
const patient_comment_list = require("./utils/patient_comment");

const Patient_Threshold = require("../models/patient_threshold");
const patient_threshold_list = require("./utils/patient_threshold");
const patients_threshold = require("../models/patient_threshold_sample");

const patients_input = require("../models/patient_input_sample");
const patient_message_list = require("./utils/patient_message");
const { sendStatus } = require("express/lib/response");
const Patient_input = require("../models/patient_input");

const Clinical_Notes = require("../models/clinicalNotes");
const Clinical_Note = Clinical_Notes.ClinicianNote; // only use the main clinicalNote schema
//const patients_message_list = require("../models/utils/patient_message");

//This function get medical data for all patients
const getAllPatients = async (req, res) => {
  try {
    const clinician = await Clinician.findById(req.params.clinician_id).lean();
    const patients = await Patient.find().lean(); // taken from /model/patient.js
    const patient_thresholds = await Patient_Threshold.find().lean();
    console.log("executing getAllPatient line 35");
    const today = new Date().toLocaleDateString();
    console.log("executing gatAllPatients line 38");
    if (clinician) {
      // list of patient id stored in a certain clinician
      var patient_id_list = clinician.patients;
      patient_id_list = patient_id_list.map((id) => id.toString());
      //console.log(patient_id_list);
      // filter to include only patients whose id are stored under a certain clinician
      var filtered_patients = patients.filter((patient) => {
        return patient_id_list.includes(patient._id.toString());
      });
      //console.log(filtered_patients);
      // filter to include only patients' thresholds with id (patient id) contained in a certain clinician
      var filtered_thresholds = patient_thresholds.filter((threshold) => {
        return patient_id_list.includes(threshold.id.toString());
      });

      const patient_medical_data = patient_medical_list(
        filtered_thresholds,
        filtered_patients
      ); // the argument patients was filtered on the last line
      // and now pass as an argument specified in /utils/patient_medical_data.js
      res.render("../views/layouts/clinician_dashboard.hbs", {
        patients: patient_medical_data,
        view_date: today,
        c_id: clinician._id,
        c_name: clinician.lastname,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

//This function get the medical data for a specified patient
const getOnePatient = async (req, res) => {
  try {
    const today = new Date().toLocaleDateString();
    const clinician = await Clinician.findById(req.params.clinician_id).lean();
    var patient_id_list = clinician.patients;
    patient_id_list = patient_id_list.map((id) => id.toString());

    const patient = await Patient.findById(req.params.patient_id).lean();

    if (patient && patient_id_list.includes(patient._id.toString())) {
      res.render("../views/layouts/clinician_patientdata.hbs", {
        view_date: today,
        p_name: patient.name,
        c_id: clinician._id,
        c_name: clinician.lastname,
        p_id: patient._id,
        patient_data: patient.data.sort((a, b) =>
          Date.parse(a.date) > Date.parse(b.date) ? 1 : -1
        ),
      });
    } else {
      res.send("patient not found");
    }
  } catch (err) {
    console.log(err);
  }
};

const addOnePatient = async (req, res) => {
  try {
    const clinician = await Clinician.findById(req.params.clinician_id).lean();
    var newPatient = req.body;
    if (clinician) {
      if (JSON.stringify(newPatient) == "{}") {
        res.send("no patient sent");
      } else {
        const newemail = req.body.email;
        const currPatient = await Patient.findOne({ email: newemail }).lean();

        if (currPatient != null) {
          res.send(currPatient);
        } else {
          newPatient = await new Patient(newPatient);
          newPatient.register_date = new Date();
          clinician.patients.push(newPatient._id);
          await Clinician.findByIdAndUpdate(req.params.clinician_id, {
            patients: clinician.patients,
          });
          newPatient.save();
          await Patient_Threshold.create({ id: newPatient._id });
          await Patient_input.create({ id: newPatient._id });
          res.redirect("/clinician/" + clinician._id + "/register");
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const getOnePatientAllNotes = async (req, res) => {
  try {
    console.log("getOnePatientAllNotes executing");
    const today = new Date().toLocaleDateString();
    const clinician = await Clinician.findById(req.params.clinician_id).lean();
    const patient = await Patient.findById(req.params.patient_id).lean();
    let clinical_notes = await Clinical_Note.findOne({
      patient_id: req.params.patient_id,
    }).lean(); // clinical note collection for a specific patient from database
    console.log(clinical_notes);
    // not stored in database
    if (!clinical_notes) {
      clinical_notes = new Clinical_Note({ patient_id: req.params.patient_id }); // temporary assignment for unentered notes
    }
    res.render("../views/layouts/clinician_cli_notes.hbs", {
      view_date: today,
      p_name: patient.name,
      c_id: clinician._id,
      c_name: clinician.lastname,
      c_note: clinical_notes.notes.reverse(),
    });
  } catch (err) {
    console.log(err);
  }
};

const addOnePatientNote = async (req, res) => {
  try {
    const clinician = await Clinician.findById(req.params.clinician_id).lean();

    var newNote = req.body;
    if (clinician) {
      if (JSON.stringify(newNote) == "{}") {
        res.send("no clinical notes entered");
      } else {
        const newNote = req.body.note;
        var currCNote = await Clinical_Note.findOne({
          patient_id: req.params.patient_id,
        });

        var note_body = {
          note_text: newNote,
          edit_date: new Date().toLocaleDateString(),
        };

        currCNote.notes.push(note_body);

        currCNote.save();

        res.send(currCNote.notes);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

//This function allows the clinician to add a single input the patient needs to record
const modifyInput = async (req, res) => {
  try {
    // find the patient of the clinician and check whether they exist
    const clinician = await Clinician.findById(req.params.clinician_id).lean();
    const patient = await Patient.findById(req.params.patient_id).lean();
    var patient_id_list = clinician.patients;
    patient_id_list = patient_id_list.map((id) => id.toString());
    console.log(req.body);
    const new_key = req.body.key;
    // the patient exists and is taken care of by the current clinician
    if (patient && patient_id_list.includes(patient._id.toString())) {
      var input_body = await Patient_input.findOne({ id: patient._id });
      var the_input = input_body.input; // this is an array of fields
      // allow up to 4 input keys, and no repeated keys are allowed

      if (
        req.body.checked == "true" &&
        !the_input.includes(new_key) &&
        the_input.length < 4
      ) {
        the_input.push(new_key);
      } else if (req.body.checked == "false") {
        the_input = the_input.filter((input) => input !== new_key); // filter out the specific input key
        console.log(the_input);
      }
      input_body.input = the_input;

      input_body.save();
      res.redirect("/clinician/" + clinician._id + "/threshold");
    } else {
      res.send("patient not found");
    }
  } catch (err) {
    console.log(err);
  }
};

/*//This function allows the clinician to delete a single input the patient no longer needs to record
const deleteInput = async (req, res)=>{
    try{
        // find the patient of the clinician and check whether they exist 
        const clinician = await Clinician.findById(req.params.clinician_id).lean();
        const patient = await Patient.findById(req.params.patient_id).lean();
        var patient_id_list = clinician.patients;
        patient_id_list = patient_id_list.map((id)=>id.toString());

        const new_key = req.body.key;
        // the patient exists and is taken care of by the current clinician
        if(patient && patient_id_list.includes(patient._id.toString())){
            var input_body = await Patient_input.findOne({id: patient._id});
            var the_input = input_body.input; // this is an array of fields
            the_input = the_input.filter((input) => (input !== new_key)); // filter out the specific input key
            input_body.input = the_input;
            input_body.save();
            res.send(input_body);
        }
        else{
            res.send("patient not found");
        }
        
    }
    catch(err) {
        console.log(err);
    }
}*/

//This function get comments for all patients
const getAllComments = async (req, res, next) => {
  try {
    // Find a single clinician by matching the http:/clinician_id with the database clinician id
    const clinician = await Clinician.findById(req.params.clinician_id).lean(); // Clinician model taken from /models/clinician
    const patients = await Patient.find().lean(); // taken from /models/patient, find all documents of patients
    const patient_inputs = await Patient_input.find().lean();
    const today = new Date().toLocaleDateString();
    // The clinician is valid
    if (clinician) {
      // copy the patient's id list stored in the clinician
      var patient_id_list = clinician.patients;
      patient_id_list = patient_id_list.map((id) => id.toString());

      // filter to include only patients whose id are stored under a certain clinician
      var filtered_patients = patients.filter((patient) => {
        return patient_id_list.includes(patient._id.toString());
      });

      const patients_comment = patient_comment_list(
        filtered_patients,
        patient_inputs
      ); // the argument patients was filtered on the above line

      // patient_comment is each from the partial, patients_comment is the filtered comment
      res.render("../views/layouts/clinician_patientcomment.hbs", {
        view_date: today,
        patient_comment: patients_comment,
        c_id: clinician._id,
        c_name: clinician.lastname,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    return next(err);
  }
};

// This function gets all comments for one patient
const getOnesComments = async (req, res) => {
  try {
    console.log("getOnesComments executing");
    const today = new Date().toLocaleDateString();
    const clinician = await Clinician.findById(req.params.clinician_id).lean();
    var patient_id_list = clinician.patients;
    patient_id_list = patient_id_list.map((id) => id.toString());

    const patient = await Patient.findById(req.params.patient_id).lean();

    if (patient && patient_id_list.includes(patient._id.toString())) {
      res.render("../views/layouts/clinician_onePatientComments.hbs", {
        view_date: today,
        p_name: patient.name,
        c_id: clinician._id,
        c_name: clinician.lastname,
        p_comment: patient.data.sort((a, b) =>
          Date.parse(a.date) > Date.parse(b.date) ? 1 : -1
        ),
      }); // each data comment is also stored under data, within each datafield
    } else {
      res.send("patient not found");
    }
  } catch (err) {
    console.log(err);
  }
};

//This function get thresholds for all patients
const getAllThreshold = async (req, res, next) => {
  try {
    // Find the clinician by matching the http:/clinician_id with the database clinician id
    const clinician = await Clinician.findById(req.params.clinician_id).lean(); // Clinician model taken from /models/clinician
    const patient_thresholds = await Patient_Threshold.find().lean();
    const patients = await Patient.find().lean(); // taken from /models/patient, find all documents of patients
    const patient_inputs = await Patient_input.find().lean();
    const today = new Date().toLocaleDateString();
    const clinician_name = clinician.lastname;
    // the clinician is valid
    if (clinician) {
      // copy the patient's id list stored in the clinician
      var patient_id_list = clinician.patients;
      patient_id_list = patient_id_list.map((id) => id.toString());
      console.log(patient_id_list);

      // include patients only if their _id are included in the patient_id_list (which was originally queried from clinician.patients)
      var filtered_id_list = [];
      var filtered_thresholds = patient_thresholds.filter((threshold) => {
        if (patient_id_list.includes(threshold.id.toString())) {
          filtered_id_list.push(threshold.id.toString()); // add the threshold ids associated with patients under the current clinician
        }
        return patient_id_list.includes(threshold.id.toString());
      });

      var filtered_patients = patients.filter((patient) => {
        // find the patients with the matching threshold ids
        return filtered_id_list.includes(patient._id.toString());
      });

      const patient_input = patient_inputs.filter((input) =>
        patient_id_list.includes(input.id.toString())
      );
      const patients_threshold = patient_threshold_list(
        filtered_thresholds,
        filtered_patients,
        patient_input
      ); // the argument patient_thresholds was filtered on the above line
      console.log(patients_threshold);
      // and now passed as an argument specified in /utils/patient_threshold.js
      res.render("../views/layouts/clinician_patientthreshold.hbs", {
        view_date: today,
        patient_threshold: patients_threshold,
        c_id: clinician._id,
        c_name: clinician_name,
      }); // where to get patientiid?
    } else {
      sendStatus(404);
    }
  } catch (err) {
    return err;
  }
};

//This function change the thresholds the clinician set for patients
const modifyThreshold = async (req, res, next) => {
  try {
    const clinician = await Clinician.findById(req.params.clinician_id).lean();

    // define the single Threshold object for adding, consiting of "id":{} and "threshold": {}
    var newThreshold = req.body;
    console.log(req.body);
    if (clinician) {
      if (JSON.stringify(newThreshold) == "{}") {
        res.send("No threshold was sent");
      } else {
        const patient_id = req.body.id; // take the patient_id passed in the http params

        var curr_threshold = await Patient_Threshold.findOne({
          id: patient_id,
        }); // find the existing threshold
        // take the threshold component of the current Threshold Model
        var update_threshold = curr_threshold.threshold;
        const modified_attr = newThreshold.key; // the attribute that is being updated
        // update the specified field
        var counter = 0;

        for (var entry of Object.keys(newThreshold)) {
          // update upper bound and lower bound accordingly
          if (counter > 0) {
            // filter out the first entry which is a key
            update_threshold[modified_attr][entry] = newThreshold[entry]; // update bound(s)
          }
          counter++;
        }

        curr_threshold.threshold = update_threshold;
        curr_threshold.save();
        res.redirect("/clinician/" + req.params.clinician_id + "/threshold");
      }
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    return err;
  }
};

//This function get support messages for all patients
const getSupportSentence = async (req, res, next) => {
  try {
    // Find the clinician by matching the http:/clinician_id with the database clinician id
    const clinician = await Clinician.findById(req.params.clinician_id).lean(); // Clinician model taken from /models/clinician
    const patients = await Patient.find().lean(); // taken from /models/patient, find all documents of patients
    const today = new Date().toLocaleDateString();
    if (clinician) {
      // copy the patient's id list stored in the clinician
      var patient_id_list = clinician.patients;
      patient_id_list = patient_id_list.map((id) => id.toString());

      // include patients only if their _id are included in the patient_id_list (which was originally queried from clinician.patients)
      var filtered_patients = patients.filter((patient) => {
        return patient_id_list.includes(patient._id.toString());
      });
      const patients_message = patient_message_list(filtered_patients); // the argument patients was filtered on the above line
      // the patient hasn't viewed the message
      if (!patients_message.viewed) {
        res.render("../views/layouts/clinician_patientmessage.hbs", {
          view_date: today,
          patient_message: patients_message,
          c_id: clinician._id,
          c_name: clinician.lastname,
        });
      } else {
        res.render("../views/layouts/clinician_patientmessage.hbs", {
          view_date: today,
          patient_message: "",
        });
      }
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    return err;
  }
};

//This function add support messages for the specific patient
const addSupportSentence = async (req, res, next) => {
  try {
    const clinician = await Clinician.findById(req.params.clinician_id).lean();

    var newPatient = req.body;
    if (clinician) {
      if (JSON.stringify(newPatient) == "{}") {
        res.send("no message sent");
      } else {
        const newMessage = req.body.message;
        var currPatient = await Patient.findById(req.params.patient_id);
        currPatient.message = newMessage;
        currPatient.viewed = false;

        currPatient.save();

        res.send(currPatient.message);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const renderRegister = async (req, res) => {
  try {
    const clinician = await Clinician.findById(req.params.clinician_id).lean(); // Clinician model taken from /models/clinician
    const today = new Date().toLocaleDateString();
    res.render("../views/layouts/clinician_register_patient.hbs", {
      view_date: today,
      c_id: clinician._id,
      c_name: clinician.lastname,
    });
  } catch (err) {
    console.log(err);
  }
};
const logout = (req, res) => {
  req.logout();
  res.redirect("/clinician/login");
};

const clinicianController = {
  getAllPatients,
  getOnePatient,
  getOnePatientAllNotes,
  addOnePatientNote,
  modifyInput,
  getAllComments,
  getOnesComments,
  getAllThreshold,
  modifyThreshold,
  getSupportSentence,
  addSupportSentence,
  addOnePatient,
  renderRegister,
  logout,
};

module.exports = clinicianController;
