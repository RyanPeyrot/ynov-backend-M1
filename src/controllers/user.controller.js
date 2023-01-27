const User = require("../models/user.model");
const Place = require("../models/place.model")
require('dotenv').config()

exports.updateOne = (req,res,next) => {
    User.findByIdAndUpdate({_id:req.userToken.id},{...req.body,_id:req.userToken.id})
        .then((user)=>{
            if(!user){
                return res.status(404).send({
                    message: "User not found"
                })
            }
            res.send(user);
        })
        .catch(err=>{
            next(err)
        })
}

exports.deleteOne = (req,res,next) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then((user) =>
        {
            if(!user){
                return res.status(404).send({
                    message: "User not found"
                })
            }
            Place.deleteMany({owner : user._id});
            res.status(200).json({ message: 'Utilisateur supprimé !'})
        })
        .catch(error => {
            next(err)
        });
}

exports.getOneById = (req,res,next) => {
    User.findOne({_id:req.userToken.id}).then((user)=>{
        res.send(user);
    })
        .catch(err=>{
            next(err)
        })

}

exports.getAll = (req,res,next) => {
    User.find().then((users)=>{
        res.send(users);
    })
        .catch(err=>{
            next(err)
        })

}