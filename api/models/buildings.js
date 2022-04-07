const {Schema, model}= require("mongoose");

const EventItem = new Schema({
    start: {
        type: String
    },
    end: {
        type: String
    },
    allDay: {
        type: Boolean
    },
    usersId: {
        type: [String]
    },
    buildingId: {
        type: String
    },
    floorId: {
        type: String
    },
    deskId: {
        type: String
    },
})

const CalendarModel = model("Calendar", EventItem)

const DeskItem = new Schema({

    type : {
        type: String
    },
    positionX : {
        type: Number
    },
    positionY : {
        type: Number
    },
    rotation:{
        type: Number
    },
    imgDesk: {
        type: String
    },
    calendarEvent: {
        type: [EventItem] 
    },
    buildingId: {
        type: String
    },
    floorId: {
        type: String
    }

})

const DeskModel = model( "Desk", DeskItem )



const FloorItem = new Schema({

   name:{
        type: String,
   },
   desks:{
       type:[DeskItem]
   },
   imgFloor: {
       type: String
   },
   buildingId: {
       type: String
   }
   
  });

  const FloorModel = model( "Floor", FloorItem )


const BuildingSchema = new Schema({

    name: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    floors: {
        type: [FloorItem],
    },
    imgBuilding: {
        type: String,
    }
})

const BuildingModel = model( "Building", BuildingSchema );


module.exports = { BuildingModel, DeskModel, FloorModel, CalendarModel };