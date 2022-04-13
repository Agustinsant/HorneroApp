const express = require('express')
const checkRouter = express.Router()
const { NotificationCheck } = require('../controllers/checkController')

checkRouter.use('/', NotificationCheck)

module.exports = checkRouter