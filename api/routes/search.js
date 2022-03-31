const express = require('express')
const { getForNameOrEmail } = require('../controllers/searchControllers')
const searchRouter = express.Router()


searchRouter.get("/nameOrEmail", getForNameOrEmail )



module.exports = searchRouter