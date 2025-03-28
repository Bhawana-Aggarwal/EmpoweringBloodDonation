const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
    ngo_name : { 
        type : String,
        required : true,
    },
    ngo_email : {
        type : String,
        required : true,
    },
    ngo_password :{
        type : String,
        required : true,
    }
})

//collection part
const ngo_collection = new mongoose.model('NGO',loginSchema);

//export the model
module.exports = ngo_collection;


