const express = require('express')
const router = express.Router()
const user = require('./users')
const bilding = require('./buildings')
const floor = require('./floors')


router.use("/user", user)

router.use("/building", bilding)

router.use("/floor", floor)


module.exports = router