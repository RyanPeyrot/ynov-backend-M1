const Place = require("../models/place.model");
const PlaceType = require("../models/placeType.model");
const User = require("../models/user.model");
require('dotenv').config()

exports.createOne = (req, res) => {
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
        .catch(err => res.status(400).send(err));
}

exports.getPlaces = (req, res) => {
    Place.find()
        .populate('type')
        .populate('owner')
        .then((places) => res.send(places))
        .catch(err => res.status(400).send(err))
}

exports.getMyPlaces = (req,res) => {
    User.findById(req.userToken.id).populate('places')
        .then( (user) => {
            res.send(user.places);
    })
        .catch(err=>{
            res.status(404).send(err);
        })
}

exports.getPlacesByUser = (req,res) => {
    User.findById(req.body.userId).then((user)=>{
        res.send(user.places);
    })
        .catch(err=>{
            res.status(404).send(err);
        })
}

exports.getMyPlace = (req,res) => {
    User.findById(req.userToken.id).populate('places')
        .then(user => {
            if(!user){
               return res.status(500).send("Internal error, user not found");
            }
            const place = user.places.find(place => place._id == req.params.id )
            res.send(place)
        })
        .catch(err => {
            res.status(404).send(err);
        })
}

exports.getPlaceByUser = (req,res) => {
    Place.findOne({_id:req.body.id,owner:req.body.owner})
        .then((place) => {
            res.send(place);
    })
        .catch(err=>{
            res.status(404).send(err);
        })
}
exports.updateMyPlace = (req,res) => {
    Place.findOneAndUpdate({_id:req.params.id,owner:req.userToken.id},{...req.body,_id:req.params.id,owner:req.userToken.id})
        .then((place) => {
            res.send({
                message:"place updates",
                place
            });
        }).catch(err => {
        res.status(404).send(err);
    })
}

exports.deleteMyPlace = (req,res) => {
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
                        return res.send(err)
                    })
                res.send({
                    place,
                    message : "Place deleted"
                })
            }).catch(err => {
            res.status(404).send(err);
        })
}
