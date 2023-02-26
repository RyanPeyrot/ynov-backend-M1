const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    title : {
        type : String,
        required:true,
        trim:true,
        minLength:5,
        maxLength:90
    },
    type:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'PlaceType'
    },
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    pricing:{
        perDay:{
            type : Number,
            required:true,
        }
    },
    rate :{
        type : Number,
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
            },
            lon:{
                type:Number,
            }
        }
    }
})
module.exports=mongoose.model('Place',placeSchema)