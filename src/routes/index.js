const express = require('express');
const router = express.Router();
const userRouter = require('./user.route');
const authRouter = require('./auth.route');
const placeRouter = require('./place.route');
const placeTypeRouter = require('./placeType.route');
const bookingRouter = require('./booking.route');

router.use('/user',userRouter);
router.use('/auth',authRouter);
router.use('/type-place',placeTypeRouter);
router.use('/place',placeRouter);
router.use('/booking',bookingRouter);

module.exports = router;