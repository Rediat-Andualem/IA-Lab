// routes/bookingRoutes.js
const express = require('express');
const { bookEquipment } = require('../Controllers/BookingController');
const BookingRouter = express.Router();

BookingRouter.post('/equipmentBookings', bookEquipment);

module.exports = {BookingRouter};
