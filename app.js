
const express = require("express");
const app = express();
const port = 8080;
var bodyParser = require('body-parser');
const exphbs = require("express-handlebars");

app.set('view engine', 'hbs')
app.engine('hbs', exphbs.engine({
    defaultLayout: 'index',
    extname: 'hbs',
    
}))

// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req,res,next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})







require("./models")

app.use(express.static('./public'));
app.use(bodyParser.json());
const clinicianRouter = require("./router/clinician.js");
const patientRouter = require("./router/patient.js")
app.use("/patient", patientRouter);
app.use("/clinician", clinicianRouter);

app.listen(port, ()=> {
    console.log("server is running... ");
})




