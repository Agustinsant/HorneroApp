const express = require('express')
const { getForNameOrEmail, EventDayByDeskId, EventDayByFloorId } = require('../controllers/searchControllers')
const searchRouter = express.Router()


searchRouter.get('/nameOrEmail', getForNameOrEmail )

searchRouter.get('/eventDayByDesk', EventDayByDeskId)

searchRouter.get('/eventDAyByFloor', EventDayByFloorId)


module.exports = searchRouter