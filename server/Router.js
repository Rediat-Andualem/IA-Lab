const express = require("express");
// const {userCreateRouter} = require('./Routers/UserR.js')
const {BookingRouter} =require('./Routers/BookingRoute.js')
const {EquipmentRoute} =require('./Routers/EquipmentRoute.js')

// const {fileUploader}=require('./Routers/fileUploader.js')
const AllRouters = express.Router();

// AllRouters.use('/admin',userCreateRouter)
AllRouters.use('/booking',BookingRouter)
AllRouters.use('/equipments',EquipmentRoute)
// AllRouters.use('/files',fileUploader)

module.exports={AllRouters}