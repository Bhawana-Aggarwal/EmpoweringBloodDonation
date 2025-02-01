// databse/db.js

const mongose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/College_Database';

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
