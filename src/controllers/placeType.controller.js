const PlaceType = require("../models/placeType.model")
const User = require("../models/user.model");

exports.createOne = (req,res,next) => {
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
            next(err);
        })
}

exports.deleteOne = (req,res,next) => {
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
        .catch(err => {
            next(err)
        });
}

exports.getOneById = (req,res,next) => {
    PlaceType.findOne({_id:req.body.typeId}).then((type)=>{
        res.send(type);
    })
        .catch(err=>{
            next(err)
        })

}

exports.getAll = (req,res,next) => {
    PlaceType.find().then((types) =>{
        res.send(types);
    })
        .catch(err=>{
            next(err)
        })
}

exports.updateOne = (req,res,next) => {
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
            next(err)
        })
}