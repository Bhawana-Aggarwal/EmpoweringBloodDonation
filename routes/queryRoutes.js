const express = require('express');
const router = express.Router();
const User_Quieres = require('../model/user_query_model');
const NGO_Quieres = require('../model/NGO_query_model');

const nodemailer = require("nodemailer");
require('dotenv').config();




router.post('/submit-user-query', async (req, res) => {
    try {
        const data = { donor_name, watsapp, email, comment } = req.body;
        const userQuery = new User_Quieres(data)
        await userQuery.save()
        res.send(`
              <script>alert('Query submission successful.');
               window.location.href='/';</script>`);

    } catch (err) {
        console.log(err)
        res.status(400).send('Error submitting query')
    }
});

router.post('/submit-ngo-query', async (req, res) => {
    try {
        const data = { ngo_name, ngo_email, ngo_contact, comment } = req.body;
        const NGOQuery = new NGO_Quieres(data)
        await NGOQuery.save()

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.ADMIN_EMAIL, // admin's email
                pass: process.env.ADMIN_PASSWORD, // Sender's password
            }
        });
        // Email options
        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: process.env.ADMIN_EMAIL, // Replace with actual admin email
            subject: 'New NGO Query Submitted',
            text: `A new NGO query has been submitted.\n\nNGO Name: ${ngo_name}\nEmail: ${ngo_email}\nContact: ${ngo_contact}\nComment: ${comment}`
        };

        // Send email notification
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.send(`
              <script>alert('Query submission successful. Admin has been notified.');
               window.location.href='/';</script>`);


    } catch (err) {
        console.log(err)
        res.status(400).send('Error submitting query')
    }
});









module.exports = router;