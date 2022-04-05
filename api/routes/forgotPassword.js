const express = require('express')
const forgotRouter = express.Router()

const { ForgotPassword } = require('../controllers/forgotPasswordController')

forgotRouter.post('/:email', ForgotPassword)

module.exports = forgotRouter