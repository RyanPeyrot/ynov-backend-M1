const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const signJwt = require("../helpers/signJwt");
const {validationResult} = require("express-validator");

exports.register = (req,res) => {
    const errors = validationResult(req);
    console.log(errors.isEmpty());
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:hashPassword
    })

    newUser.save()
        .then((user)=>{
            const token = signJwt(user);
            return res.send({token});
        })
        .catch(err=>{
            return res.status(404).send(err);
        })
}

exports.login = (req,res) => {
    User.findOne({email : req.body.email}).then((user) => {
        if(!bcrypt.compareSync(req.body.password,user.password)){
            return res.status(401).send({
                auth:false,
                message : "Password error"
            })
        }

        const token = signJwt(user);
        return res.send({
            auth : true,
            message : "User logged",
            token
        });

    }).catch(err => {
        return res.status(404).send({
            auth:false,
            message : "Email not found"
        })
    })
}