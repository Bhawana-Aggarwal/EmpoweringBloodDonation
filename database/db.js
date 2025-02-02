// databse/db.js

const mongose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL;

mongose.connect(mongoURL,{

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

module.exports = db;
