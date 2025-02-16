// routes/userRoutes.js
const bcrypt = require("bcrypt");
const express = require('express');
const User = require('../model/model');
const router = express.Router();

const nodemailer = require("nodemailer");
require('dotenv').config();

router.get('/', async (req, res) => {
  res.render('home');
});

router.get('/policy', async (req, res) => {
  res.render('policy');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

// POST route for adding a Donor
router.post("/signup", async (req, res) => {
  try {
    const data = {
      donor_name, father_name, mother_name, dob, gender, blood_group, donated_before, watsapp,
      allergy, operation, email, password
    } = req.body;
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      res.send("Email already exits.");
    }
    else {
      // hash the password using bcrypt
      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(data.password, saltRounds);
      data.password = hashPassword;

      //by default dob saves in the format : YYYY-MM-DD so convert it to DD-MM-YYYY
      let formatteddob = data.dob;
      const [day, month, year] = formatteddob.split('-');
      formatteddob = `${year}-${month}-${day}`;
      data.dob = formatteddob;

      const user = new User(data)
      await user.save()

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
        to: email,
        subject: 'Thank You for Registering as a Donor!',
        text: `Dear ${donor_name},\n\nThank you for registering as a donor on 'Empowering Blood Donation' ! Your generosity and willingness to make a difference mean the world to us.\n With your support, we can continue our mission to : "help those in need" , "support life-saving initiatives". Every contribution makes a meaningful impact, and we’re grateful to have you as part of our community.\nIf you have any questions or need assistance, feel free to reach out to us at visit: https://empoweringblooddonation.onrender.com/#contact-us . \n\nTogether, we can make a difference!\n\nThank you again for your kindness and generosity.`
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
              <script>alert('Form submission successful. You can check your email for comfirmation.');
               window.location.href='/';</script>`);
    }
  }
  catch (err) {
    console.log(err)
    res.status(400).send('Error registering user')
  }
})

module.exports = router;
