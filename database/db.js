const mongose = require('mongoose');
require('dotenv').config();
// Database connection
const mongoURL = process.env.MONGO_URL;

// Connect to the database
mongose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
    
const db = mongose.connection;

// Check the database connection
db.on('connected', () => {
    console.log('Connected to database');
});
db.on('error', (err) => {
    console.log('Error in database connection: ' + err);
});
db.on('disconnected', () => {
    console.log('Disconnected to database');
})

// export the database
module.exports = db;


