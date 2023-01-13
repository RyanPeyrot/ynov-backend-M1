const Place = require("../models/place.model");
const PlaceType = require("../models/placeType.model");
const User = require("../models/user.model");
require('dotenv').config()

exports.createOne = (req,res) => {
    let owner = new User;
    User.findOne({_id : req.body.userId}).then((user) => {
        owner = user;
    });

    let type = new PlaceType;
    PlaceType.findOne({_id : req.body.placeTypeId}).then((placeType) => {
        type = placeType;
    });

    const newPlace = new Place({
        title:req.body.title,
        type:type,
        owner:owner,
        pricePerDay:req.body.owner,
        image:req.body.image,
        capacity:req.body.capacity,
        description:req.body.description,
        address:{
            city:req.body.city,
            street:req.body.street,
            zipCode:req.body.street,
        }
    })

    newPlace.save()
        .then((place)=>{
            return res.send({
                message : "new place created",
                place : place
            });
        })
        .catch(err=>{
            return res.status(404).send(err);
        })
}

exports.deleteOne = (req,res) => {
    //Todo : Supprimer la place dans le user
    Place.findOneAndDelete({ _id: req.params.id })
        .then((place) =>
        {
            if(!place){
                return res.status(404).send({
                    message: "Place not found"
                })
            }
            res.status(200).json({ message: 'Place deleted !'})
        })
        .catch(error => {
            res.status(400).json({ error })
        });
}

exports.getMyPlaces = (req,res) => {
    let owner = new User();
    User.findOne({_id:req.userToken.id}).then((user)=>{
        owner = user;
    })
    Place.find({owner:owner}).then((places)=>{
        res.send(places);
    })
        .catch(err=>{
            res.status(404).send(err);
        })

}

exports.getPlacesByUser = (req,res) => {
    Place.find({owner:req.body.owner}).then((places) => {
        res.send(places);
    })
        .catch(err=>{
            res.status(404).send(err);
        })
}

exports.getMyPlace = (req,req) => {
    let owner = new User();
    User.findOne({_id:req.userToken.id}).then((user)=>{
        owner = user;
    })
    Place.findOne({_id : req.body.id,owner:owner}).then((user)=>{
        res.send(place);
    })
        .catch(err => {
            res.status(404).send(err);
        })
}

exports.getPlaceByUser = (req,res) => {
    Place.findOne({_id:req.body.id,owner:req.body.owner}).then((place) => {
        res.send(place);
    })
        .catch(err=>{
            res.status(404).send(err);
        })
}