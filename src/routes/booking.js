const express = require('express');
const controllers = require("../controllers");
const router = express.Router();

router.post('/',controllers.booking.createBooking);
router.get('/',  controllers.booking.findAllBooking);
router.get('/:id',  controllers.booking.findBookingById);
router.put('/:id',  controllers.booking.updateBookingById);
router.delete('/:id',controllers.booking.deleteBookingById);

module.exports = router;
