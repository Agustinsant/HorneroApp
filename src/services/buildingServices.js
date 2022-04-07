import axios from "axios";

export const getBuildings = async () => {
  const buildings = await axios.get("http://localhost:3001/api/building/");
  return buildings.data;
};

export const getFloor = async (floorId) => {
  const floor = await axios.get(`http://localhost:3001/api/floor/${floorId}`);
  return floor.data;
};

export const getDesk = async (deskId) => {
  const desk = await axios.get(`http://localhost:3001/api/desk/${deskId}`);
  return desk.data;
};

export const getEventsDayByFloor = async (floorId, date) => {
  const deskEvents = await axios.post(
    "http://localhost:3001/api/search/eventDayByFloor",
    {
      floorId,
      date,
    }
  );
  console.log("services res", deskEvents.data);
  return deskEvents.data;
};
