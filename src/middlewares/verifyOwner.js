function verifyOwner(req, res, next) {
    if(!req.userToken.type.includes("OWNER")){
        return res.status(401).send({
            isAdmin:false,
            message: "Unauthorized"
        })
    }
    next();
}

module.exports = verifyOwner;