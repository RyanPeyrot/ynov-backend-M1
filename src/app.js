const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const apiRouter = require('./routes/index');

mongoose.set('strictQuery',false);
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ryan:admin@cluster0.rfvgci7.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("Connection successfull");
}).catch(err=>console.log(err));

app.use('/api/v1',apiRouter)

app.listen("4000",function (){
    console.log("server launch");
});