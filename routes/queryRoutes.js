const express = require('express');
const router = express.Router();
const User_Quieres = require('../model/user_query_model');
const NGO_Quieres = require('../model/NGO_query_model');

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
        res.send(`
              <script>alert('Query submission successful.');
               window.location.href='/';</script>`);

    } catch (err) {
        console.log(err)
        res.status(400).send('Error submitting query')
    }
});









module.exports = router;