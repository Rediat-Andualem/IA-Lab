// routes/bookingRoutes.js
const express = require('express');
const { getBookings } = require('../Controllers/BookingController');
const BookingRouter = express.Router();

BookingRouter.post('/equipmentBookings', getBookings);

module.exports = {BookingRouter};
