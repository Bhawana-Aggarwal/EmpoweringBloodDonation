//model/model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userQuery = new Schema({
    donor_name : { 
        type : String,
        required : true
    },
    watsapp :{
        type: String,
        required: true,
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
    comment : {
        type:String,
        required:true
    }
})

const UserQuery = mongoose.model('User_Quieres', userQuery);

module.exports = UserQuery;