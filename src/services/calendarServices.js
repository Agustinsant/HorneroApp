import axios from "axios";

export const getCalendar = async (deskId) => {
  const desk = await axios.get(`http://localhost:3001/api/desk/${deskId}`);
  return desk.data.calendarEvent;
};

export const addEventCalendar = async (deskId, eventObject, allDay) => {
  const { start, end, extendedProps } = eventObject;
  const newEvent = await axios.post(
    `http://localhost:3001/api/calendar/add/${deskId}`,
    {
      start: start,
      end: end,
      userId: extendedProps.userId,
      allDay: allDay,
    }
  );
  return newEvent.data.calendarEvent;
};

export const getEventById = async (eventId) => {
  const event = await axios.get(
    `http://localhost:3001/api/calendar/${eventId}`
  );
  return event.data;
};

export const deleteEventCalendar = async (evenId) => {
  await axios.delete(`http://localhost:3001/api/calendar/delete/${evenId}`);
};

export const updateEventCalendar = async (evenId, eventObject) => {
  await axios.put(
    `http://localhost:3001/api/calendar/update/${evenId}`,
    eventObject
  );
};

export const getUserBooking = async (userId) => {
  const booking = await axios.get(
    `http://localhost:3001/api/calendar/all/${userId}`
  );
  return booking.data;
};

export const getDayEventsInDesk = async (date, deskId) => {
  const allDayEventsinDesk = await axios.post(
    `http://localhost:3001/api/search/eventDayByDesk`,
    { date, deskId }
  );
  return allDayEventsinDesk.data;
};

export const getDayEvents = async (deskCalendar, deskId) => {
  const allDayEvents = await axios.post(
    `http://localhost:3001/api/search/eventsDay`,
    { deskCalendar, deskId }
  );
  return allDayEvents.data;
};

export const addParticipant = async (eventId, userId, sendingUser) => {
  const user = await axios.post(
    `http://localhost:3001/api/calendar/addUserEvent/${eventId}`,
    { userId, sendingUser }
  );
};

export const removeParticipant = async (evenId, friendId) => {
  await axios.delete(
    `http://localhost:3001/api/calendar/deleteUserEvent/${evenId}/${friendId}`
  );
};
