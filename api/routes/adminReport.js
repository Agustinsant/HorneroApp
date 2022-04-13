const express = require('express')
const AdminRouter = express.Router()
const {YearReport, MonthReport, WeekReport, AddDayWeek , RemoveDayWeek, UpdateBusinessHours} = require("../controllers/adminReport")

AdminRouter.get('/yearReport/:buildingId', YearReport) // eventos del ano y data

AdminRouter.post('/monthReport/:buildingId', MonthReport) // eventos del mes y data

AdminRouter.post('/weekReport/:buildingId', WeekReport) // eventos de la semana y data

AdminRouter.post('/addDay/:buildingId', AddDayWeek) // agrega dias de trabajo

AdminRouter.post('/removeDay/:buildingId', RemoveDayWeek) // borra dias de trabajo

AdminRouter.post('/businessHours/:buildingId', UpdateBusinessHours) // borra dias de trabajo

module.exports = AdminRouter;