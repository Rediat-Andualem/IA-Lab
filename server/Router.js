const express = require("express");
const {userCreateRouter} = require('./Routers/UserR.js')
const {AdRouter} = require('./Routers/AdvertR.js')
const {jobRouter} = require('./Routers/JobR.js')
const {paymentRoute} = require('./Routers/PaymentR.js')
const {adminRoute} = require('./Routers/AdminR.js')
// const {fileUploader}=require('./Routers/fileUploader.js')
const AllRouters = express.Router();

AllRouters.use('/users',userCreateRouter)
AllRouters.use('/Advert',AdRouter)
AllRouters.use('/Job',jobRouter)
AllRouters.use('/payment',paymentRoute)
AllRouters.use('/admin',adminRoute)
// AllRouters.use('/files',fileUploader)

module.exports={AllRouters}