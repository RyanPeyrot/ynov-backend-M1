const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User=require("./models/user.model")

mongoose.set('strictQuery',false);

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ryan:admin@cluster0.rfvgci7.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("Connection successfull");
}).catch(err=>console.log(err));

/*app.get('/', (req,res) => {
    res.send({
        chat:"prout"
    })
}); */

/*app.post('/api/v1/auth/login', (req,res) => {
    if(!req.body.email || req.body.email.isEmpty()){
        return res.status(404).send({
          auth:false,
            message:"User not found"
        })
    }
    res.send({
        auth:true,
        message:"User logged"
    })
   console.log(req.body);
});*/

app.post('/auth/register',(req,res) => {
    const newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.lastName,
        password:req.body.email
    })
    newUser.save()
        .then((user)=>{
            res.send(user);
        })
        .catch(err=>{
            res.status(404).send(err);
        })
})

//Todo : update user
app.put("/updateUser/:id",(req,res) => {
    User.findOneAndUpdate({_id:req.params.id},{...req.body,_id:req.params.id})
        .then((user)=>{
            res.send(user);
        })
        .catch(err=>{
            res.status(404).send(err);
        })
})
//todo : delete user
app.delete("/deleteUser/:id",(req,res) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(400).json({ error }));
});

//todo : find one user by id
app.get("/auth/user/:id",(req,res) => {
    User.findOne({_id:req.params.id}).then((user)=>{
        res.send(user);
    })
        .catch(err=>{
            res.status(404).send(err);
        })

})

//todo: find all user
app.get("/Users",(req,res) => {
    User.find().then((user)=>{
        res.send(user);
    })
        .catch(err=>{
            res.status(404).send(err);
        })

})

app.listen("4000",function (){
    console.log("server launch");
});