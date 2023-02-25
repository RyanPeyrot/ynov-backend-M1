require('dotenv').config();
const Booking = require('../models/booking.model');
const Place = require('../models/place.model');

exports.createOne = (req,res,next) => {
    if(req.body.status == null){
        req.body.status = "WAITING";
    }
    Booking.create(req.body)
        .then(booking => {
            res.send(booking);
        })
        .catch(err => next(err))
}

exports.getBookings = (req,res,next) => {
    Booking.find().populate({
        path : 'place',
        populate : [{
            path:'owner',
            model:'User',
        },
            {
                path:'type',
                model:'PlaceType',
            }]
    })
        .then(bookings => {
            res.send(bookings);
        })
        .catch(err => next(err))
}

exports.getBooking = (req,res,next) => {
    Booking.findById(req.params.id).populate({
        path : 'place',
        populate : [{
            path:'owner',
            model:'User',
        },
        {
            path:'type',
            model:'PlaceType',
        }]
    })
        .then(booking => {
            res.send(booking)
        })
        .catch(err => next(err))
}

exports.updateBooking = (req,res,next) => {
    Booking.findOneAndUpdate({_id : req.params.id}, {...req.body,_id:req.params.id})
        .then(booking => {
            if(!booking){
                res.status(404).send({message:"Booking not found"})
            }
            res.send(booking);
        })
        .catch(err => next(err))
}

exports.deleteBooking = (req,res,next) => {
    Booking.findOneAndDelete({_id : req.params.id})
        .then(booking => {
            if(!booking){
                res.status(404).send({message:"Booking not found"})
            }
            res.send({
                message : "Booking deleted",
                booking
            });
        })
        .catch(err => next(err))
}