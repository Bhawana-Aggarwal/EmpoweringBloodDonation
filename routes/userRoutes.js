// routes/userRoutes.js
const bcrypt = require("bcrypt");
const express = require('express');
const User = require('../model/model');
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('home');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

// POST route for adding a Donor
router.post("/signup", async (req, res) => {
  try {
    const data = {donor_name, father_name, mother_name, dob, gender, blood_group, donated_before, watsapp, 
      allergy, operation, email, password} = req.body;
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
      res.send(`
              <script>alert('Form submission successful.');
               window.location.href='/';</script>`);
    }
  }
  catch (err) {
    console.log(err)
    res.status(400).send('Error registering user')
  }
})

module.exports = router;
