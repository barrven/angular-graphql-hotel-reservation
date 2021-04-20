const mongoose = require('mongoose')

const Booking = mongoose.model('Bookings', new mongoose.Schema({
    hotel_id: {
        type: Number,
        required: true
    },
    booking_date: {
        type: String,
        required: true
    },
    booking_start: {
        type: String
    },
    booking_end: {
        type: String
    },
    user_id: {
        type: Number,
        required: true
    }
}))

module.exports = Booking