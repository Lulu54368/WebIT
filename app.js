const express = require("express");
const app = express();
const port = 5000;

const exphbs = require("express-handlebars")
app.set('view engine', 'hbs')
app.engine('hbs', exphbs.engine({
    defaultLayout: 'index',
    extname: 'hbs',
    
}))
app.use(express.static('./public'));
const clinicianRouter = require("./router/clinician.js");
const patientRouter = require("./router/patient.js")
app.use("/patient", patientRouter);
app.use("/clinician", clinicianRouter);
app.listen(port, ()=> {
    console.log("server is running... ");
})



