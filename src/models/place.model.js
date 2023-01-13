const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const placeSchema = mongoose.Schema({
    title : {
        type : String,
        required:true,
        trim:true,
        minLength:5,
        maxLength:90
    },
    type:{
        type : Schema.Types.ObjectId,
        ref : 'PlaceType'
    },
    owner:{
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    pricing:{
        PerDay:{
            type : Number,
            required:true,
        }
    },
    image:[String],
    capacity : {
        type : Number,
        required:true,
    },
    description : {
        type : String,
        required:true,
        maxLength: 500,
        trim : true,
    },
    address : {
        city :{
          type : String,
          required : true,
          trim:true
        },
        street :{
            type : String,
            required : true,
            trim:true
        },
        zipCode :{
            type : Number,
            required : true,
            trim:true,
        },
        gps:{
            lat:{
                type:Number,
                required : true,
            },
            lon:{
                type:Number,
                required : true,
            },
            required : false
        }
    }
})
module.exports=mongoose.model('Place',placeSchema)