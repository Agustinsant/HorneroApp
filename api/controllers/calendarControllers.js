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

module.exports.updateEventCalendarById = async (req, res, next) => { 
    const { id } = req.params
    
    const option ={
        returnDocument : "after"
    }

    try {
        const updateEventCalendar = await CalendarModel.findByIdAndUpdate(id, req.body, option)
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