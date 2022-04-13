const { CalendarModel, DeskModel, BuildingModel, FloorModel } = require ('../models/buildings')
const { UserModel } = require('../models/users')
const sendEmailBy = require('../utils/sendEmailBy')
const { BuildingName } = require('./searchControllers')

module.exports.AddEventCalendar = async (req, res, next) => {

    const { idDesk } = req.params
    const { start, end, userId , allDay } = req.body

    const option ={
        returnDocument : "after"
    }

    try {

        const desk = await DeskModel.findById(idDesk) 
        const user = await UserModel.findById(userId)
        const newEventCalendar = await CalendarModel({ start, end, allDay, buildingId: desk.buildingId, floorId: desk.floorId, deskId: desk._id}).save()
        newEventCalendar.usersId.push(userId)
        desk.calendarEvent.push(newEventCalendar)

        await CalendarModel.findByIdAndUpdate(newEventCalendar._id, newEventCalendar, option)

        const updateDesk = await DeskModel.findByIdAndUpdate(idDesk, desk, option)

        if(updateDesk && user.emailMyReserve === true) sendEmailBy('addEvent', { start, end, buildingId: desk.buildingId, floorId: desk.floorId, deskId: desk._id, userId })
         
        for (const friendId of user.friends) {
            const friend = await UserModel.findById(friendId)
            if(friend && friend.emailFriendsReserve === true) sendEmailBy('addEventFriends', { start, end, buildingId: desk.buildingId, floorId: desk.floorId, deskId: desk._id, userId }, { userFriend: user.name })
        }

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
    const events = []
    
    try {
        const eventsCalendar = await CalendarModel.find({usersId: userId})

        for (const event of eventsCalendar) {
            let newEvents = {}
            const building = await BuildingModel.findById(event.buildingId);
            const floor = building.floors.filter(floor => floor._id.toHexString() === event.floorId);
            newEvents.buildingName = building.name;
            newEvents.city = building.city;
            newEvents.floorName = floor[0].name;
            newEvents.start = event.start;
            newEvents.end = event.end
            events.push(newEvents)
        }

        return res.status(200).send(events)

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
  
    const {userId, sendingUser} = req.body

    const options = {
      returnDocument: "after",
    };
  
    try {
      
      const user = await UserModel.findById(userId)
      const calendar = await CalendarModel.findById(eventId)
      calendar.usersId.push(userId)

      const otherUser = await UserModel.findById(userId)
      const building = await BuildingModel.findById(calendar.buildingId)
      const floor = await FloorModel.findById(calendar.floorId)
    
      if(calendar && user.emailGroupReserve === true) sendEmailBy('addUserToEvent', { sendingUser, otherUser: otherUser.email, building: building.name, floor: floor.name, start: calendar.start })

      let deskEvent = await DeskModel.findById(calendar.deskId)
        
      const newDeskCalendar =  deskEvent.calendarEvent.filter((event)=> event._id.toHexString() !== calendar._id.toHexString())
      
      deskEvent.calendarEvent = newDeskCalendar
      deskEvent.calendarEvent.push(calendar)
      
        
        await DeskModel.findByIdAndUpdate(deskEvent._id, {calendarEvent: []})
      await DeskModel.findByIdAndUpdate(deskEvent._id, deskEvent, options)
      const updateCalendarEvent = await CalendarModel.findByIdAndUpdate(eventId, calendar, options)
  
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
      
      const calendar = await CalendarModel.findById(eventId)
   
      const deskEvent = await DeskModel.findById(calendar.deskId)
      

      const newUsersId = calendar.usersId.filter( (id) =>  id !== friendId)
   
      calendar.usersId = newUsersId

      const newDeskCalendar =  deskEvent.calendarEvent.filter((event)=> event._id.toHexString() !== calendar._id.toHexString())
    
      deskEvent.calendarEvent = newDeskCalendar
     
      deskEvent.calendarEvent.push(calendar)

      await DeskModel.findByIdAndUpdate(deskEvent._id, deskEvent, options)
      const updateCalendarEvent = await CalendarModel.findByIdAndUpdate(eventId, calendar, options)
  
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