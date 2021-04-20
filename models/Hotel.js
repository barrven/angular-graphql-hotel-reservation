const mongoose = require('mongoose')

const Hotel = mongoose.model("Hotels", new mongoose.Schema({
    hotel_id: {
        type: Number,
        required: true,
        unique: true
    },
    hotel_name: {
        type: String,
        required: true
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    postal_code: {
        type: String
    },
    price: {
        type: Number
    },
    email: {
        type: String
    }
}))

module.exports = Hotel