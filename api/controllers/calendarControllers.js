const { CalendarModel, DeskModel } = require ('../models/buildings')
const sendEmailBy = require('../utils/sendEmailBy')

module.exports.AddEventCalendar = async (req, res, next) => {

    const { idDesk } = req.params
    const { start, end, userId , allDay } = req.body

    const option ={
        returnDocument : "after"
    }

    try {

        const desk = await DeskModel.findById(idDesk) 
        const newEventCalendar = await CalendarModel({ start, end, allDay, buildingId: desk.buildingId, floorId: desk.floorId, deskId: desk._id}).save()
        newEventCalendar.usersId.push(userId)
        desk.calendarEvent.push(newEventCalendar)

        await CalendarModel.findByIdAndUpdate(newEventCalendar._id, newEventCalendar, option)

        const updateDesk = await DeskModel.findByIdAndUpdate(idDesk, desk, option)

        if(updateDesk) sendEmailBy('addEvent', { start, end, buildingId: desk.buildingId, floorId: desk.floorId, deskId: desk._id, userId })

        return res.status(201).send(updateDesk)
    }
    catch (error) {
        next (error)
    }

}

module.exports.getEventCalendarById = async (req, res, next) => { 
    const { id } = req.params

    try {
        const eventCalendar = await CalendarModel.findById(id)
        return res.status(200).send(eventCalendar)
    }
    catch (error){
        next (error)
    }
}  

module.exports.getAllEventCalendar = async (req, res, next) => { 

    try {
        const eventCalendar = await CalendarModel.find({})
        return res.status(200).send(eventCalendar)
    }
    catch (error){
        next (error)
    }
}

module.exports.getAllEventCalendarByUserId = async (req, res, next) => {
    const { userId } = req.params
    try {
        const eventsCalendar = await CalendarModel.find({userId: userId})
        return res.status(200).send(eventsCalendar)
    }
    catch (error){
        next (error)
    }
}

module.exports.updateEventCalendarById = async (req, res, next) => { 
    const { id } = req.params
    
    const option ={
        returnDocument : "after"
    }

    try {
        const beforeUpdate = await DeskModel.findById(id)

        const updateEventCalendar = await CalendarModel.findByIdAndUpdate(id, req.body, option)

        const deskByEvent = await DeskModel.findById(updateEventCalendar.deskId)

        const positionNewEvent = deskByEvent.calendarEvent.indexOf(beforeUpdate)

        const eventlessDesk = deskByEvent.calendarEvent.filter(event => event._id.toHexString() !== updateEventCalendar._id.toHexString()  )

        eventlessDesk.splice(positionNewEvent,0,updateEventCalendar)

        deskByEvent.calendarEvent = eventlessDesk

        await DeskModel.findByIdAndUpdate(deskByEvent._id, deskByEvent)

        return res.status(202).send(updateEventCalendar)
    }
    catch (error){
        next (error)
    }
}


module.exports.AddUsersIdEvent = async (req, res, next) => { 
    
    const { eventId } = req.params
  
    const {userId} = req.body
  console.log("req", req.body)
  console.log("eventId", eventId)
  console.log("userId", userId)
  
    const options = {
      returnDocument: "after",
    };
  
    try {
      
      const calendarEvent = await CalendarModel.findById(eventId)

      calendarEvent.usersId.push(userId)
      const updateCalendarEvent = await CalendarModel.findByIdAndUpdate(eventId, calendarEvent, options)
  
      return res.status(201).send(updateCalendarEvent)
  
    } 
    
    catch (error) {
      next (error)
    }


}

module.exports.DeleteUsersIdEvent = async (req, res, next) => { 

 
    const {eventId, friendId} = req.params
  
    const options = {
      returnDocument: "after",
    };
  
    try {
      
      const calendarEvent = await CalendarModel.findById(eventId)
      const newUsersId = calendarEvent.usersId.filter( (id) =>  id !== friendId)
      calendarEvent.usersId = newUsersId
      const updateCalendarEvent = await CalendarModel.findByIdAndUpdate(eventId, calendarEvent, options)
  
      return res.status(200).send(updateCalendarEvent)
  
    } 
    
    catch (error) {
      next (error)
    }
  

}

module.exports.deleteEventCalendarById = async (req, res, next) => { 
    const { id } = req.params

    try {
        const deleteEventCalendar = await CalendarModel.findByIdAndRemove(id)

        const deskByCalendar = await DeskModel.findById(deleteEventCalendar.deskId)
        
        const newEvents = deskByCalendar.calendarEvent.filter(event => event._id.toHexString() !== deleteEventCalendar._id.toHexString() )
        
        deskByCalendar.calendarEvent = newEvents

        await DeskModel.findByIdAndUpdate(deskByCalendar._id, deskByCalendar)


        return res.status(200).send(deleteEventCalendar)
    }
    catch (error){
        next (error)
    }
}