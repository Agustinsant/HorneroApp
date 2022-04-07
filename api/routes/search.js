const express = require("express");
const {
  getForNameOrEmail,
  EventDayByDeskId,
  EventDayByFloorId,
  EventsDay,
} = require("../controllers/searchControllers");
const searchRouter = express.Router();

searchRouter.post("/nameOrEmail", getForNameOrEmail);

searchRouter.post("/eventDayByDesk", EventDayByDeskId); // desk

searchRouter.post("/eventDayByFloor", EventDayByFloorId); //floor 

searchRouter.post("/eventsDay", EventsDay)

module.exports = searchRouter;
