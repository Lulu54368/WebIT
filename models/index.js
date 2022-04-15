// Load envioronment variables 
if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config() 
} 

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL) 
// Exit on error 
const db = mongoose.connection.on('error', err => { 
    console.error(err); 
    process.exit(1) 
}) 
// Log to console once the database is open 
db.once('open', async () => { 
    console.log(`Mongo connection started on ${db.host}:${db.port}`) 
})

