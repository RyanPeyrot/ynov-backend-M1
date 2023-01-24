const mongoose = require("mongoose");

const placeTypeSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxLength : 30,
        minLength:3
    }
})

module.exports=mongoose.model('PlaceType',placeTypeSchema)