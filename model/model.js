//model/model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    donor_name : { 
        type : String,
        required : true
    },
    father_name : { 
        type : String,
        required : true
    },
    mother_name : { 
        type : String,
        required : true
    },
    dob : {
        type: String,
        required :true
    },
    gender :{
        type : String,
        required : true
    },
    blood_group : {
        type : String,
        required : true
    },
    donated_before : {
        type : String,
        required : true
    },
    watsapp :{
        type : Number,
        required : true,
        validate: {
            validator: function(v) {
                // Assuming WhatsApp number is a 10-digit number
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid WhatsApp number!`
        }
    },
    allergy :{
        type : String,
        required : true
    },
    operation :{
        type : String,
        required : true
    },
    email:{
        type :String,
        required : true,
        unique : true,
        validate: {
            validator: function(v) {
                // Regular expression for validating email format
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password :{
        type : String,
        required : true
    }
});

const User = mongoose.model('donor', userSchema);

module.exports = User;
