const express = require('express');
const router = express.Router();
const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const placeRouter = require('./place.route');
const placeTypeRouter = require('./placeType.route')

router.use('/user',userRouter);
router.use('/auth',authRouter);
router.use('/place-type',placeTypeRouter);
router.use('/place',placeRouter)

module.exports = router;