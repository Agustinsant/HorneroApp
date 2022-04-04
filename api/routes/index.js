const express = require('express')
const router = express.Router()
const user = require('./users')
const building = require('./buildings')
const floor = require('./floors')
const desk = require('./desks')
const calendar = require('./calendar')

const recover = require('./recoverPassword')

const search = require('./search')


router.use("/user", user)

router.use("/building", building)

router.use("/floor", floor)

router.use("/desk", desk)

router.use("/calendar", calendar)

router.use("/recover", recover)

router.use("/search", search)


module.exports = router