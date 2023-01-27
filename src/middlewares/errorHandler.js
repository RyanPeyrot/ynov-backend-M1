const errorHandler = (err,req,res,next) => {
    const errStatus = err.statusCode || 500;
    const errMessage = err.message || "Oups ! Something went wrong"

    res.status(errStatus)
        .send({
            success:false,
            status:errStatus,
            message:errMessage,
            stack: process.env.NODE_ENV
        })
}

module.exports = errorHandler;