const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    admin_name : { 
        type : String,
        required : true,
    },
    admin_email : {
        type : String,
        required : true,
    },
    admin_password :{
        type : String,
        required : true,
    }
})

//collection part
const admin_collection = new mongoose.model('Admin',adminSchema);

//export the model
module.exports = admin_collection;


