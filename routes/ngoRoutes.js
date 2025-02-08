// routes/ngoRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/model');
const ngo_collection = require('../model/ngo_model'); // Adjust the path if necessary
const CampInfo = require('../model/camp_model');
const router = express.Router();
const nodemailer = require("nodemailer");
require('dotenv').config();

// Render NGO login page
router.get('/ngo_login', (req, res) => {
    res.render('ngo_login');
});


// Render user data page
router.get('/userdata', (req, res) => {
    res.render('ngo_login');
});

// Login NGO
router.post('/ngo_login/ngo_home', async (req, res) => {
    try {
        const ngo_data = {
            ngo_email: req.body.email,
            ngo_password: req.body.password
        };
        const findNGO = await ngo_collection.findOne({ ngo_email: ngo_data.ngo_email });
        if (!findNGO) {
            return res.send(`
                <script>alert('NGO not exists');
                window.location.href='/ngo/ngo_login';</script>`);
        }

        // Compare the password
        const isPasswordMatch = await bcrypt.compare(ngo_data.ngo_password, findNGO.ngo_password);
        if (isPasswordMatch) {
            res.render('NGO_Home');
        } else {
            res.send(`
                <script>alert('Password does not match');
                window.location.href='/ngo/ngo_login';</script>`);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send('Error logging in NGO');
    }
});

// GET route for displaying user data
router.get('/ngo_login/ngo_home/userdata', async (req, res) => {
    try {
        const users = await User.find();
        res.render('userdata', { users, error: null });
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).render('userdata', { error: 'Error fetching user data', users: [] });
    }
});


// Update the /camp-info route to store the camp information in the database
router.post('/camp-info', async (req, res) => {
    try {
        const campData = {
            date: req.body.date,
            location: req.body.location,
            timing: req.body.timing,
            organizedBy: req.body.organizedBy,
        };
        let formatteddate = campData.date;
        const [day, month, year] = formatteddate.split('-');
        formatteddate = `${year}-${month}-${day}`;
        campData.date = formatteddate;

        const camp = new CampInfo(campData);
        await camp.save(); // Ensure this completes before proceeding

        // Send a success response
        res.status(200).json({ message: 'Camp organized successfully.' });
    } catch (err) {
        console.log(err);
        res.status(400).send('Error organizing camp');
    }
});

// Update the /mail-them route to retrieve the latest camp information from the database
router.post('/mail-them', async (req, res) => {
    try {
        // Retrieve the latest camp information from the database
        const latestCampInfo = await CampInfo.findOne().sort({ createdAt: -1 });

        if (!latestCampInfo) {
            return res.status(400).json({ message: 'No camp information available to send.' });
        }

        // Nodemailer transporter setup
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL, // Sender's email
                pass: process.env.PASSWORD, // Sender's password

            }
        });

        // Fetch all donor emails from the database
        const donors = await User.find({}, 'email');
        const emails = donors.map(donor => donor.email);

        if (emails.length === 0) {
            return res.status(400).json({ message: 'No emails found in the database' });
        }

        // Set up email options with the latest camp information
        const mailOptions = {
            from: process.env.EMAIL, // Sender's email
            bcc: emails.join(','),          // Recipients' emails
            subject: 'Blood Donation Camp',     // Email subject
            text: `A blood donation camp is organized on ${latestCampInfo.date} at ${latestCampInfo.location}.
            Timing: ${latestCampInfo.timing}. Organized By: ${latestCampInfo.organizedBy}`,  // Email body
            html: `<h3>Blood Donation Camp Details</h3>
                   <p>Date: ${latestCampInfo.date}</p>
                   <p>Location: ${latestCampInfo.location}</p>
                   <p>Timing: ${latestCampInfo.timing}</p>
                   <p>Organized By: ${latestCampInfo.organizedBy}</p>
                   <p>"Your support can save lives—let's make this camp a success together. We look forward to your valuable participation in this noble cause."</p>`
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error("An error occurred", error);
        res.status(500).json({ message: 'An error occurred while sending the email.' });
    }
});

module.exports = router;