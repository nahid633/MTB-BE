const express = require('express');
const router = express.Router();
const bookingRouter = require('./booking');
const certificationRouter = require('./certification');

router.use('/booking', bookingRouter);
router.use('/certification', certificationRouter);


module.exports = router;
