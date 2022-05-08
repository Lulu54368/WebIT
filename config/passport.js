const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Patient = require("../models/patient.js").Patients;
const Clinician = require("../models/clinician.js")
const bcrypt = require("bcrypt") //should be deleted later
// Serialize information to be stored in session/cookie(store and retrieve user information)
passport.serializeUser((user, done) => {
    // Use id to serialize user
    done(undefined,{_id: user._id, role: user.role});
})
// When a request comes in, deserialize/expand the serialized information
// back to what it was (expand from id to full user)
passport.deserializeUser((login, done) => {

    if (login.role === "patient") {
        Patient.findById(login._id, (err, user)=>
        done(err, user))
    }
    else if(login.role === "clinician"){
        Clinician.findById(login._id, (err, user)=>{
            done(err, user)
        });
    }
    else{
        return done("This user does not have this role", null);
    }
})
// Define local authentication strategy for Passport

passport.use("patient-login",

// Check if user exists and password matches the hash in the database
    new LocalStrategy({
        usernameField: "email", //email in dataabase
        passwordField: "password", //password in database
        passReqToCallback: true
    },(req, email, password, done) =>{
        process.nextTick(()=>{
            Patient.findById({"email": email.toLowerCase()}, async(err, patient)=> {
                if(err) return done(err); //error
                else if(!patient){
                    //can not find patient
                    return done(null, false, req.flash('loginMessage', 'No user found'))
                }
                else if(!await bcrypt.compare(password, patient.passport)){ //should be replaced with method in db
                    //password not match
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password'))
                }
                else{
                    //success
                    return done(null, patient, req.flash('loginMessage', 'Login Successful!'))
                }
                    

            })
        })

    }
    
    
))
    

module.exports = passport