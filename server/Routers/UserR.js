// routes/bookingRoutes.js
const express = require('express');
const { getBookings } = require('../Controllers/BookingController');
const Booking = express.Router();

Booking.get('/bookings', getBookings);

module.exports = router;
