// admin pannel Routes
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/model');
const ngo_collection = require('../model/ngo_model'); // Adjust the path if necessary
const admin_collection = require('../model/admin_model');
const CampInfo = require('../model/camp_model');
const router = express.Router();
require('dotenv').config();

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
router.get('/admin_login', (req, res) => {
    res.render('admin_login');
});


// Login admin
router.post('/admin_login/admin_home', async (req, res) => {
    try {
        const admin_data = {
            admin_email: req.body.email,
            admin_password: req.body.password
        };
        const findAdmin = await admin_collection.findOne({ admin_email: admin_data.admin_email });
        if (!findAdmin) {
            return res.send(`
                <script>alert('Admin not exists');
                window.location.href='/admin/admin_login';</script>`);
        }

        // Compare the password
        const isPasswordMatch = await bcrypt.compare(admin_data.admin_password, findAdmin.admin_password);
        if (isPasswordMatch) {
            res.render('Admin_Home');
        } else {
            res.send(`
                <script>alert('Password does not match');
                window.location.href='/admin/admin_login';</script>`);
        }
    } catch (err) {
        console.log(err);
        res.status(400).send('Error logging in Admin');
    }
});

router.get('/add_NGO', async (req, res) => {
    res.render('add_NGO');
});

// post method for NGO registration
router.post('/add_NGO', async (req, res) => {
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
        // res.status(201).json({ message: "NGO Registered Successfully" });
        res.send(`
            <script>alert('NGO Registered successful.');`);

    } catch (err) {
        console.log(err);
        res.status(400).send('Error registering NGO');
    }
});


router.get('/list_ngocamps', async (req, res) => {
    try {
        const camps = await CampInfo.find();
        res.render('ngo_camp_list', { camps, error: null });
    } catch (err) {
        console.error('Error fetching camp data:', err);
        res.status(500).render('ngo_camp', { error: 'Error fetching camp data', camps: [] });
    }
});


module.exports = router;