const { CalendarModel, DeskModel } = require ('../models/buildings')

module.exports.AddEventCalendar = async (req, res, next) => {

    const { idDesk } = req.params
    const { start, end, userId, title, userImg} = req.body

    const option ={
        returnDocument : "after"
    }

    try {


        const desk = await DeskModel.findById(idDesk) 
        const newEventCalendar = await CalendarModel({ title, start, end, userImg, userId, buildingId: desk.buildingId, floorId: desk.floorId, deskId: desk._id}).save()

        desk.calendarEvent.push(newEventCalendar)

        const updateDesk = await DeskModel.findByIdAndUpdate(idDesk, desk, option)
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
        console.log(eventCalendar.userId)
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