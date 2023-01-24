const PlaceType = require("../models/placeType.model")
const User = require("../models/user.model");

exports.createOne = (req,res) => {
    const newType = new PlaceType({
        title : req.body.title
    })

    newType.save().then( (type) => {
        res.send({
            message : "new place type created",
            type : type
        });
    })
        .catch(err=>{
            return res.status(404).send(err);
        })
}

exports.deleteOne = (req,res) => {
    PlaceType.findOneAndDelete({_id : req.body.typeId})
        .then((type) =>
        {
            if(!type){
                return res.status(404).send({
                    message: "Type not found"
                })
            }
            res.status(200).json({ message: 'Type deleted !'})
        })
        .catch(error => {
            res.status(400).json({ error })
        });
}

exports.getOneById = (req,res) => {
    PlaceType.findOne({_id:req.body.typeId}).then((type)=>{
        res.send(type);
    })
        .catch(err=>{
            res.status(404).send(err);
        })

}

exports.getAll = (req,res) => {
    PlaceType.find().then((types) =>{
        res.send(types);
    })
        .catch(err=>{
            res.status(404).send(err);
        })
}

exports.updateOne = (req,res) => {
    PlaceType.findByIdAndUpdate({_id:req.body.typeId},{...req.body,_id:req.body.typeId})
        .then((type)=>{
            if(!type){
                return res.status(404).send({
                    message: "Type not found"
                })
            }
            res.send(type);
        })
        .catch(err=>{
            res.status(404).send(err);
        })
}