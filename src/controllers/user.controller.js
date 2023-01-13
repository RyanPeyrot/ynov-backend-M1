const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.updateOne = (req,res) => {
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
            res.status(404).send(err);
        })
}

exports.deleteOne = (req,res) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then(() =>
        {
            if(!user){
                return res.status(404).send({
                    message: "User not found"
                })
            }
            res.status(200).json({ message: 'Utilisateur supprimé !'})
        })
        .catch(error => {
            res.status(400).json({ error })
        });
}

exports.getOneById = (req,res) => {
    User.findOne({_id:req.userToken.id}).then((user)=>{
        res.send(user);
    })
        .catch(err=>{
            res.status(404).send(err);
        })

}

exports.getAll = (req,res) => {
    User.find().then((users)=>{
        res.send(users);
    })
        .catch(err=>{
            res.status(404).send(err);
        })

}