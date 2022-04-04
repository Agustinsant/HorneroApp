const express = require('express')
const forgotRouter = express.Router()
const { ForgotPassword } = require('../controllers/forgotPasswordController')

forgotRouter.get('/:gmail', ForgotPassword)

module.exports = forgotRouter