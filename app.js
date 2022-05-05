const express = require("express");
const app = express();
const port = process.env.PORT||8080;
var bodyParser = require('body-parser');
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const passport = require("passport");
require('./config/passport');
app.set('view engine', 'hbs')
app.engine('hbs', exphbs.engine({
    defaultLayout: 'index',
    extname: 'hbs',
    
}))
const flash = require('express-flash')
const session = require('express-session')
// Flash messages for failed logins, and (possibly) other success/error messages
app.use(flash())
// Track authenticated users through login sessions
app.use(
    session({
    // The secret used to sign session cookies (ADD ENV VAR)
        secret: process.env.SESSION_SECRET,
        name: 'diabetesAtHome', // The cookie name (CHANGE THIS)
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 300000
        },
})
);
app.use(passport.initialize());
app.use(passport.session());
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
}
// Initialise Passport.js

app.use(passport.authenticate('session'))
// Load authentication router
//const authRouter = require('./routes/auth')
//app.use(authRouter)

// Load envioronment variables 
if (process.env.NODE_ENV !== 'production') { 

    require('dotenv').config() 
}
//lets anything in the form
app.use(express.urlencoded({
    extended: true
}))
// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req,res,next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    dbName: 'WebIT' 
})

// Exit on error 
const db = mongoose.connection.on('error', err => { 
    console.error(err); 
    process.exit(1) 
}) 
// Log to console once the database is open 
db.once('open', async () => { 
    console.log(`Mongo connection started on ${db.host}:${db.port}`) 
})

app.use(express.static('./public'));
app.use(bodyParser.json());
const clinicianRouter = require("./router/clinician.js");
const patientRouter = require("./router/patient.js")
app.use("/patient", patientRouter);
app.use("/clinician", clinicianRouter);


app.listen(port, ()=> {
    console.log("server is running... ");
})





