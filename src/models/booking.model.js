const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
    place : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Place',
        required:true
    },
    guest : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true
    },
    arrival : {
        type: Date,
        required:true,
    },
    departure : {
        type: Date,
        required:true,
    },
    numberOfNight:{
        type: Number
    },
    status : {
        type : String,
        enum :["WAITING","BOOKED","DECLINE","CANCELED"],
        required:true
    }
})

module.exports = mongoose.model('Booking',BookingSchema)