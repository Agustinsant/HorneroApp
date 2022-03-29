const express = require('express')
const calendarRouter = express.Router()
const { AddEventCalendar, getEventCalendarById, getAllEventCalendar, updateEventCalendarById, deleteEventCalendarById } = require('../controllers/calendarControllers')

calendarRouter.post('/add/:idDesk', AddEventCalendar) // registra un evento del calendario

calendarRouter.get('/:id', getEventCalendarById) // trae evento por id

calendarRouter.get('/', getAllEventCalendar) // trae todos los eventos

calendarRouter.put('/update/:id', updateEventCalendarById) // edita un evento

calendarRouter.delete('/delete/:id', deleteEventCalendarById) // elimina un evento

module.exports= calendarRouter