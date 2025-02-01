// models/CampInfo.js

const mongoose = require('mongoose');

// Define the Camp Information Schema
const campInfoSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
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
        type: String,
        required: true,
    },
}, { timestamps: true }); // This will add createdAt and updatedAt fields

// Create the model from the schema
const CampInfo = mongoose.model('CampInfo', campInfoSchema);

module.exports = CampInfo;