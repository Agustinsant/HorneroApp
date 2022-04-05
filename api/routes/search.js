const express = require('express')
const { getForNameOrEmail } = require('../controllers/searchControllers')
const searchRouter = express.Router()


searchRouter.post("/nameOrEmail", getForNameOrEmail )



module.exports = searchRouter