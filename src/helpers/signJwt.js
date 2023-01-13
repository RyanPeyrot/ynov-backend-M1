const jwt = require("jsonwebtoken");

function signJwt (user){
    const token = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
    },process.env.JWTSECRET);

    return token
}

module.exports = signJwt