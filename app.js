const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res)=>{
    res.send("hello");
});
app.get("/hello", (req, res)=>{
    res.send("hello");
    console.log("hello");
});

const patientRouter = require("./router/patientRouter.js");
app.use("/patient", patientRouter);
app.listen(port, ()=> {
    console.log("server is running... ");
})



