const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.set('strictQuery',false);

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ryan:admin@cluster0.rfvgci7.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("Connection successfull");
}).catch(err=>console.log(err));


app.post('/auth/register',)

app.put("/updateUser/:id",)

app.delete("/deleteUser/:id",);

app.get("/auth/user/:id",)

app.get("/Users",)

app.listen("4000",function (){
    console.log("server launch");
});