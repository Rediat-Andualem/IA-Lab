// routes/bookingRoutes.js
const express = require('express');
const { createUser } = require('../Controllers/userController');
const userRoute = express.Router();

userRoute.post('/createUser', createUser);

module.exports = {userRoute};
