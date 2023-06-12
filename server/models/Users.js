const mongoose = require('../mongodbConnection');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    uid:{
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    isSubscribed: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('user', userSchema);