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
<<<<<<< HEAD

// Load envioronment variables 
if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config() 
} 

=======
>>>>>>> 5160fe9fce7fc75c2ed605c58b7caa1940753128
// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req,res,next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})
<<<<<<< HEAD
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

=======

require("./models")
>>>>>>> 5160fe9fce7fc75c2ed605c58b7caa1940753128
app.use(express.static('./public'));
app.use(bodyParser.json());
const clinicianRouter = require("./router/clinician.js");
const patientRouter = require("./router/patient.js")
app.use("/patient", patientRouter);
app.use("/clinician", clinicianRouter);
app.listen(process.env.PORT || 3000, () => {
    console.log('The app is running!')
    })



