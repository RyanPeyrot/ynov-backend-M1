const Place = require("../models/place.model");

function verifyPlace(req, res, next) {
    Place.findById(req.body.place)
        .then(place => {
            if(place == null){
                req.status(404).send({
                    message : "Place does not exist"
                })
            }
        })
        .catch(err => next(err))
    next();
}

module.exports = verifyPlace;