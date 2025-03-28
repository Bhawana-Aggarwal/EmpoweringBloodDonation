// admin pannel Routes
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const ngo_collection = require('../model/ngo_model'); // Adjust the path if necessary
const admin_collection = require('../model/admin_model');
const CampInfo = require('../model/camp_model');

require('dotenv').config();
const nodemailer = require("nodemailer");

const { generateToken } = require("../utils/jwt");
const { authenticate } = require("../middleware/auth");

// post method for Admin registration
// router.post('/signup', async (req, res) => {
//     try {
//         const { admin_name, admin_email, admin_password } = req.body;

//         // Check if all fields are provided
//         if (!admin_name || !admin_email || !admin_password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Hash password before saving
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(admin_password, saltRounds);

//         // Save to DB
//         const newAdmin = new admin_collection({
//             admin_name,
//             admin_email,
//             admin_password: hashedPassword, // Store the hashed password
//         });

//         await newAdmin.save();
//         res.status(201).json({ message: "Admin Registered Successfully" });
//     } catch (err) {
//         console.log(err);
//         res.status(400).send('Error registering Admin');
//     }
// });

// Render Admin login page
router.get('/login', (req, res) => {
    res.render('admin_login');
});


// Login admin
router.post('/home', async (req, res) => {
    try {
        const admin_data = {
            admin_email: req.body.email,
            admin_password: req.body.password
        };
        const findAdmin = await admin_collection.findOne({ admin_email: admin_data.admin_email });
        if (!findAdmin) {
            return res.send(`
                <script>alert('Admin not exists');
                window.location.href='/admin/login';</script>`);
        }

        // Compare the password
        const isPasswordMatch = await bcrypt.compare(admin_data.admin_password, findAdmin.admin_password);

        const token = generateToken(findAdmin);

        if (isPasswordMatch) {
            // res.render('Admin_Home');
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // set true in production with https
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });

            res.render('Admin_Home', { message: "Logged in successfully", adminName: findAdmin.admin_name})
        } else {
            res.send(`
                <script>alert('Password does not match');
                window.location.href='/admin/login';</script>`);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send('Error logging in Admin');
    }
});

router.get('/add_NGO',authenticate, async (req, res) => {
    res.render('add_NGO');
});

// post method for NGO registration
router.post('/add_NGO',authenticate, async (req, res) => {
    try {
        const { ngo_name, ngo_email, ngo_password } = req.body;

        // Check if all fields are provided
        if (!ngo_name || !ngo_email || !ngo_password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Hash password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(ngo_password, saltRounds);

        // Save to DB
        const newNgo = new ngo_collection({
            ngo_name,
            ngo_email,
            ngo_password: hashedPassword, // Store the hashed password
        });

        await newNgo.save();

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
            to: ngo_email,
            subject: 'Your NGO registered suceesfully',
            text: `To ${ngo_name},\n\nYour NGO is registered successfully. \nIf you have any questions or need assistance, feel free to reach out to us at visit: https://empoweringblooddonation.onrender.com/#contact-us . \n\nTogether, we can make a difference!\n\nThank you again for your kindness and generosity.`
        };

        // Send email notification
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });


        // res.status(201).json({ message: "NGO Registered Successfully" });
        res.send(`
            <script>alert('NGO Registered successful.');
            window.location.href='/admin/login';</script>`);

    } catch (err) {
        console.log(err);
        res.status(400).send('Error registering NGO');
    }
});

router.get('/list_ngo',authenticate, async (req, res) => {
    try {
        const ngos = await ngo_collection.find();
        res.render('list_ngo', { ngos, error: null });
    } catch (err) {
        console.error('Error fetching NGO data:', err);
        res.status(500).render('ngo_camp', { error: 'Error fetching NGO data', camps: [] });
    }
});

router.get('/list_ngocamps',authenticate, async (req, res) => {
    try {
        const camps = await CampInfo.find();
        res.render('ngo_camp_list', { camps, error: null });
    } catch (err) {
        console.error('Error fetching camp data:', err);
        res.status(500).render('ngo_camp', { error: 'Error fetching camp data', camps: [] });
    }
});

router.get('/logout', authenticate, async (req, res)=>{
    res.clearCookie('token');
    // res.render('home', { message: "Logged out successfully" });
    res.send(`
        <script>alert('Logged out successfull');
        window.location.href='/';</script>`);
})

module.exports = router;