const mongoose = require('../mongodbConnection');
const Schema = mongoose.Schema;


const subscriptionsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('subscriptions', subscriptionsSchema);