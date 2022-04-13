const express = require('express')
const AdminRouter = express.Router()
const {YearReport, MonthReport, WeekReport} = require("../controllers/adminReport")

AdminRouter.get('/yearReport/:buildingId', YearReport) // eventos del ano y data

AdminRouter.post('/monthReport/:buildingId', MonthReport) // eventos del mes y data

AdminRouter.post('/weekReport/:buildingId', WeekReport) // eventos de la semana y data


module.exports = AdminRouter;