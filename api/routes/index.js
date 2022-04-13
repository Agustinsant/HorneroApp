const express = require('express')
const router = express.Router()
const user = require('./users')
const building = require('./buildings')
const floor = require('./floors')
const desk = require('./desks')
const calendar = require('./calendar')
const search = require('./search')
const recover = require('./forgotPassword')
const check = require('./checks')
const admin = require("./adminReport")

router.use("/user", user)

router.use("/building", building)

router.use("/floor", floor)

router.use("/desk", desk)

router.use("/calendar", calendar)

router.use("/search", search)

router.use("/recover", recover)

router.use("/checks", check)

router.use("/admin", admin)

module.exports = router