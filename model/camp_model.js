// models/CampInfo.js

const mongoose = require('mongoose');

// Define the Camp Information Schema
const campInfoSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const inputDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // To compare date only (ignoring time)
                return inputDate > today;
            },
            message: 'The camp date must be in the future.'
        }
    },
    location: {
        type: String,
        required: true,
    },
    timing: {
        type: String,
        required: true,
    },
    organizedBy: {
        type: String
    },
}, { timestamps: true }); // This will add createdAt and updatedAt fields

// Create the model from the schema
const CampInfo = mongoose.model('CampInfo', campInfoSchema);

module.exports = CampInfo;