const express = require("express");
const app = express();
const port = 8080;
var bodyParser = require('body-parser');
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
app.set('view engine', 'hbs')
app.engine('hbs', exphbs.engine({
    defaultLayout: 'index',
    extname: 'hbs',
    
}))
const dbURL = "mongodb+srv://WebIT:AyjApuMSrWMeXh0L@cluster0.zcwkv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(dbURL).then((result)=>console.log("connect to db"))
.catch((err)=>console.log(err));
app.use(express.static('./public'));
app.use(bodyParser.json());
const clinicianRouter = require("./router/clinician.js");
const patientRouter = require("./router/patient.js")
app.use("/patient", patientRouter);
app.use("/clinician", clinicianRouter);
app.listen(port, ()=> {
    console.log("server is running... ");
})



