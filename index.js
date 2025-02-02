// index.js
const express = require("express");
const path = require("path");
const userRoutes = require('./routes/userRoutes'); // user/donor routes
const ngoRoutes = require('./routes/ngoRoutes'); // NGO routes
const connectDB = require('./database/db'); // database connection
require('dotenv').config(); // environment variables

const app = express();          //express app

// Connect to the database
// connectDB(); // connectDB() is a function that connects database

// convert data to json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use ejs as the view engine 
app.set('view engine', 'ejs');
app.set('views', './views');

// use static stylesheet files
app.use(express.static('public'));

//User/donor Routes
app.use('/', userRoutes);

// NGO Routes
app.use('/ngo', ngoRoutes);

// port listening on 'port'
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on the port : ${port}`);
})