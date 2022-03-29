import axios from "axios";

export const getCalendar = async (deskId) => {
  const desk = await axios.get(`http://localhost:3001/api/desk/${deskId}`);

  return desk.data.calendarEvent;
};
