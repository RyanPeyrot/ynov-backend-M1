const mongoose = require("mongoose");

const placeTypeSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxLength : 30,
        minLength:3,
        trim : true
    }
})

module.exports=mongoose.model('PlaceType',placeTypeSchema)