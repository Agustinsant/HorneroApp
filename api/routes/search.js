const express = require("express");
const {
  getForNameOrEmail,
  EventDayByDeskId,
  EventDayByFloorId,
} = require("../controllers/searchControllers");
const searchRouter = express.Router();

searchRouter.post("/nameOrEmail", getForNameOrEmail);

searchRouter.post("/eventDayByDesk", EventDayByDeskId); // desk

searchRouter.post("/eventDayByFloor", EventDayByFloorId); //floor 

module.exports = searchRouter;
