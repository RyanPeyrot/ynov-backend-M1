const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const verifyPlace = require('../middlewares/verifyPlace')

router.post('/',verifyPlace,bookingController.createOne);
router.get('/',bookingController.getBookings);
router.get('/:id',bookingController.getBooking);
router.put('/:id',bookingController.updateBooking);
router.delete('/:id',bookingController.deleteBooking);

module.exports = router;