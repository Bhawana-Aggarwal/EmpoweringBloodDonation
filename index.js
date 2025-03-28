// index.js
const express = require("express");
const path = require("path");
const app = express();          //express app
const userRoutes = require('./routes/userRoutes'); // user/donor routes
const ngoRoutes = require('./routes/ngoRoutes'); // NGO routes
const adminRoutes = require('./routes/adminRoutes'); // Admin routes
const queryRoutes = require('./routes/queryRoutes'); //query routes

const connectDB = require('./database/db'); // database connection
require('dotenv').config(); // environment variables



// convert data to json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use ejs as the view engine 
app.set('view engine', 'ejs');
app.set('views', './views');

// use static stylesheet files
app.use(express.static('public'));

// use cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//User/donor Routes
app.use('/', userRoutes);
app.use('/query',queryRoutes);

// NGO Routes
app.use('/ngo', ngoRoutes);

// Admin Routes
app.use('/admin', adminRoutes);


// port listening on 'port'
const port = process.env.PORT || 3000 ;
app.listen(port, () => {
    console.log(`Server running on the port : ${port}`);
})