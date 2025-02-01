const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    ngo_name : { 
        type : String,
    },
    ngo_email : {
        type : String,
    },
    ngo_password :{
        type : String,
    }
})

//collection part
const ngo_collection = new mongoose.model('NGO',loginSchema);

//export the model
module.exports = ngo_collection;


