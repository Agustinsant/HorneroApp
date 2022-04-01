import axios from "axios";

export const getCalendar = async (deskId) => {
  const desk = await axios.get(`http://localhost:3001/api/desk/${deskId}`);
  return desk.data.calendarEvent;
};

export const addEventCalendar = async (deskId, eventObject) => {
  const {title, start, end, extendedProps} = eventObject
  const newEvent = await axios.post(`http://localhost:3001/api/calendar/add/${deskId}`, {
      title: title,
      start: start,
      end: end,
      userId: extendedProps.userId,
      userImg: extendedProps.userImg,
  })
  return newEvent.data.calendarEvent;
};

export const deleteEventCalendar = async (evenId) => {
  const deletedEvent = await axios.delete(`http://localhost:3001/api/calendar/delete/${evenId}`)
};


export const updateEventCalendar = async (evenId, eventObject) => {
  const updatedEvent = await axios.put(`http://localhost:3001/api/calendar/update/${evenId}`, eventObject)
};

export const getUserBooking= async (userId) => {
  const booking = await axios.get(`http://localhost:3001/api/calendar/all/${userId}`)
  console.log("userBooking", booking)
  return booking.data
};
