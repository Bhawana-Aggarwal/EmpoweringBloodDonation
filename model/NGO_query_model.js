const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ngoQuery = new Schema({
    ngo_name: { 
        type: String,
        required: true
    },
    ngo_email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    ngo_contact: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true
    }
});

const NGOQuery = mongoose.model('NGO_Queries', ngoQuery);

module.exports = NGOQuery;
