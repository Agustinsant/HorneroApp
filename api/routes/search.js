const express = require("express");
const {
  getForNameOrEmail,
  EventDayByDeskId,
  EventDayByFloorId,
} = require("../controllers/searchControllers");
const searchRouter = express.Router();

searchRouter.post("/nameOrEmail", getForNameOrEmail);

searchRouter.get("/eventDayByDesk", EventDayByDeskId);

searchRouter.get("/eventDayByFloor", EventDayByFloorId);

module.exports = searchRouter;
