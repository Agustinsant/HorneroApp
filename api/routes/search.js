const express = require("express");
const {
  getForNameOrEmail,
  EventDayByDeskId,
  EventDayByFloorId,
  EventsDay,
  BuildingName,
} = require("../controllers/searchControllers");
const searchRouter = express.Router();

searchRouter.post("/nameOrEmail", getForNameOrEmail); // trae usuarios por nombre o mail

searchRouter.post("/eventDayByDesk", EventDayByDeskId); // trae todos los eventos del dia por el id del escritorio

searchRouter.post("/eventDayByFloor", EventDayByFloorId); // trae todos los eventos del dia por el id del piso

searchRouter.post("/eventsDay", EventsDay) // trae los eventos del dia de un escritorio y agrega titulo e imagi¿en del user id

searchRouter.post("/buildingName", BuildingName) // trae los edificios por nombre



module.exports = searchRouter;
