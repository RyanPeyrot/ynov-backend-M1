const jwt = require('jsonwebtoken')
function verifyToken(req, res, next){
    let token = req.headers.authorization;

    if(!token){
        return res.status(403).send({
            auth: false,
            token:null,
            message : "Missing token"
        });
    }

    jwt.verify(token,process.env.JWTSECRET,function (err,decoded) {
        if(err){
            return res.status(401).send({
                auth:false,
                token : null,
                message : err.message
            });
        }
        req.userToken = decoded;
        next();
    });
}

module.exports = verifyToken;
