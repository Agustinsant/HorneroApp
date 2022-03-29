import axios from "axios";

export const getBuildings = async () => {
  const buildings = await axios.get("http://localhost:3001/api/building/");
  return buildings.data;
};

export const getFloor = async (floorId) => {
  const floor = await axios.get(`http://localhost:3001/api/floor/${floorId}`);
  return floor.data;
};
