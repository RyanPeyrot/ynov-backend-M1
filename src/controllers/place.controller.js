const Place = require("../models/place.model");
const PlaceType = require("../models/placeType.model");
const User = require("../models/user.model");
require('dotenv').config()

exports.createOne = (req, res,next) => {
    Place.create(req.body)
        .then((place) => {
             User.findById(req.userToken.id)
                 .then((userFound) => {
                     userFound.places.push(place._id);
                     console.log(userFound);
                     User.updateOne({_id : userFound._id},userFound)
                         .then(userUp => {
                             res.send(place)
                         })
                 } )
        })
        .catch(err => next(err));
}

exports.getPlaces = (req, res,next) => {
    Place.find()
        .populate('type')
        .populate('owner')
        .then((places) => res.send(places))
        .catch(err => next(err))
}

exports.getOnePlace = (req, res,next) => {
    Place.findById(req.params.id)
        .populate('type')
        .populate('owner')
        .then((places) => res.send(places))
        .catch(err => next(err))
}

exports.getMyPlaces = (req,res,next) => {
    User.findById(req.userToken.id).populate({
        path: 'places',
        populate: {
            path: 'type',
            model: 'PlaceType'
        }
    })
        .then( (user) => {
            res.send(user.places);
    })
        .catch(err=>{
            next(err);
        })
}

exports.getPlacesByUser = (req,res,next) => {
    User.findById(req.body.userId).then((user)=>{
        res.send(user.places);
    })
        .catch(err=>{
            next(err);
        })
}

exports.getMyPlace = (req,res,next) => {
    User.findById(req.userToken.id).populate('places')
        .then(user => {
            if(!user){
               return res.status(500).send("Internal error, user not found");
            }
            const place = user.places.find(place => place._id == req.params.id )
            res.send(place)
        })
        .catch(err => {
            next(err);
        })
}

exports.getPlaceByUser = (req,res,next) => {
    Place.findOne({_id:req.body.id,owner:req.body.owner})
        .then((place) => {
            res.send(place);
    })
        .catch(err=>{
            next(err);
        })
}
exports.updateMyPlace = (req,res,next) => {
    Place.findOneAndUpdate({_id:req.params.id,owner:req.userToken.id},{...req.body,_id:req.params.id,owner:req.userToken.id})
        .then((place) => {
            res.send({
                message:"place updates",
                place
            });
        }).catch(err => {
        next(err);
    })
}

exports.deleteMyPlace = (req,res,next) => {
        Place.findOneAndDelete({_id: req.params.id, owner: req.userToken.id})
            .then((place) => {
                if(!place){
                    return res.status(404).send("Place not found")
                }
                User.findById(req.userToken.id)
                    .then((user) => {
                        const index = user.places.indexOf(req.params.id);
                        user.places.splice(index, 1);
                        User.findOneAndUpdate({_id: req.userToken.id}, {places: user.places}).then( (user) => {
                            res.send({
                                message: "place deleted",
                                place,
                                user
                            });
                        })
                    })
                    .catch(err => {
                        next(err)
                    })
                res.send({
                    place,
                    message : "Place deleted"
                })
            }).catch(err => {
            next(err)
        })
}
