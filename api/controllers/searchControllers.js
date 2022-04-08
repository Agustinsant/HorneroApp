const { UserModel } = require('../models/users')
const { DeskModel, CalendarModel, BuildingModel } = require ('../models/buildings')


module.exports.getForNameOrEmail = async (req, res, next) => {

    const { value , userId } = req.body

    const limit = parseInt(req.query.limit, 10) || 9

    const page = parseInt(req.query.page, 10) || 1
    
    const validateToMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    try {
        if (validateToMail.test(value)) {

            const user = await UserModel.paginate({ email: value })
            const newUsers = user.docs.filter(user => user._id.toHexString() !== userId)
            user.docs = newUsers
            return res.status(200).send(user)

        }

        else {
            
            const user = await UserModel.paginate({ name: { $regex: value.replace(/\b\w/g, l => l.toUpperCase()) }},{ limit, page })
            const newUsers = user.docs.filter(user => user._id.toHexString() !== userId)
            user.docs = newUsers
            return res.status(200).send(user)
        }
    }
    catch (error) {
        next(error)
    }
}

module.exports.EventDayByDeskId = async (req, res, next) => {

    const { deskId , date } = req.body

    const validateDate = new RegExp("^((?!"+date+").)*$")

    try {
        
      const desk = await DeskModel.findById(deskId)
      
      const eventsDay =  desk.calendarEvent.filter(event => validateDate.test(event.start) === false)
        
        return res.status(200).send(eventsDay)
    }
    catch (error) {
        next(error)
    }
    
}

module.exports.EventDayByFloorId = async (req, res, next) => {

    const { floorId , date } = req.body

    const validateDate = new RegExp("^((?!"+date+").)*$")

    try {
        
      const calendars = await CalendarModel.find({floorId})
      
      const eventsDay = calendars.filter(event => validateDate.test(event.start) === false)

      return res.status(200).send(eventsDay)
    
    }
    catch (error) {
        next(error)
    }
    
}

module.exports.EventsDay = async (req, res, next) => {

    const { deskCalendar, deskId } = req.body
    const desk = await DeskModel.findById(deskId)
    const isHall = desk.type === "hall" ? true : false
 
    const events = []


    try {
    
        for (const event of deskCalendar) {
            let user = {}
            if(event.usersId.length > 0 ){
              if(isHall){
                event.title = "Sala Reservada";
                event.img = "https://hornero-app.s3.amazonaws.com/user-group.png" 
                events.push(event)
              } else {
                user = await UserModel.findById(event.usersId[0]);
                event.title = user.name;
                event.img = user.img;
                events.push(event)
              }
              } 
        }
        return res.status(200).send(events)
    } 

    
    catch (error) {
        next(error)
    }
   
}

module.exports.BuildingName = async (req, res, next) => {

    const { value } = req.body
    try {
        const building = await BuildingModel.find({ city: { $regex: value.replace(/\b\w/g, l => l.toUpperCase()) }})

        return res.status(200).send(building)
    }
    
    catch (error) {
        next(error)
    }
}