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
            Patient.findOne({"email": email.toLowerCase()}, async(err, patient)=> {
             
                if(err) return done(err); //error
                else if(!patient){
                    //can not find patient
                    return done(null, false, {message: "No user found"})
                }
                else if(!await bcrypt.compare(password, patient.password)){ //should be replaced with method in db
                    //password not match
                    console.log("unmatch");
                  
                    return done(null, false, {message: "You've entered invalid password. Please Try agian."})
             
                }
                else{
                    //success
                    patient.role = "patient";
                    return done(null, patient, {message: "Login sucessful!"})
                }
                    

            })
        })

    }
    
    
))

passport.use("clinician-login",

// Check if user exists and password matches the hash in the database
    new LocalStrategy({
        usernameField: "email", //email in dataabase
        passwordField: "password", //password in database
        passReqToCallback: true
    },(req, email, password, done) =>{
        process.nextTick(()=>{
            Clinician.findOne({"email": email.toLowerCase()}, async(err, clinician)=> {
             
                if(err) return done(err); //error
                else if(!clinician){
                    //can not find patient
                    return done(null, false, {message: "no User found"})
                }
                else if(!await bcrypt.compare(password, clinician.password)){ //should be replaced with method in db
                    //password not match
                    console.log("unmatch");
                    return done(null, false, {message: "You've entered invalid password. Please Try agian."})
                }
                else{
                    //success
                    clinician.role = "clinician";
                    return done(null, clinician, {message: "Login sucessful!"})
                }
                    

            })
        })

    }
    
    
))


 // Sign up strategy
 passport.use('local-signup', new LocalStrategy( {
    usernameField: 'email', 
    passwordField: 'password',
    passReqToCallback: true},

    function(req, email, password, done) {
        process.nextTick(function() {
            //console.log(req.body);
            Clinician.findOne({'email': email}, function(err, clinician) {
            // Handling case of invalid registration
            if(err) {
                console.log(err)
                
                return done(err)
            }
            if(clinician) {
               
                return done(null, false, {message: 'Email already existed.'})
            }

            if(password.length < 6) {
                //req.session.message = "Password should not be less than 6 characters"
                
                return done(null, false,{ message: "Password must not be less than 6 characters."})
            }

           // Successful signup
            var newUser = {};
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            newUser.firstname = req.body.firstname;
            newUser.lastname = req.body.lastname;

            Clinician.create(newUser, (err)=>{
                if(err){
                    console.log(err);
                }
            })
            console.log("saved");
            

        })
    })
}))
    

module.exports = passport