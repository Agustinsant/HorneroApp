const {Schema, model}= require("mongoose");

const EventItem = new Schema({
    title: {
        type: String
    },
    start: {
        type: String
    },
    end: {
        type: String
    },
    userId: {
        type: String
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
    userImg:{
        type: String
    }

})

const CalendarModel = model("Calendar", EventItem)

const DeskItem = new Schema({

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