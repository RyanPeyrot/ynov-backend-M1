
function verifyAdmin(req, res, next){
    if(!req.userToken.isAdmin){
        return res.status(401).send({
            isAdmin:false,
            message: "Unauthorized"
        })
    }
    next();
}

module.exports = verifyAdmin;