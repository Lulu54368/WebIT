const express = require("express");
const app = express();
const port = 8080;
app.use(express.json);
app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/static/index.html");
});

const patientRouter = require("router/patient.js");
app.use("/patient", patientRouter);
app.listen(port, ()=> {
    console.log("server is running... ");
})