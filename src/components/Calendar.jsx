import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCalendar } from "../services/calendarServices";

const Calendar = ({ deskId }) => {
  const user = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    const deskCalendar = await getCalendar(deskId);
    console.log(deskCalendar);
    setEvents(deskCalendar);
  }, []);

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    let title = `Desk Reserved by ${user.name}`; //ver si llega asi name
    calendarApi.unselect(); // clear date selectio
    if (title) {
      calendarApi.addEvent(
        {
          // will render immediately. will call handleEventAdd
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          userId: user.id,
          //  userImg: user.img    ver de agregar imagen
        },
        true
      ); // temporary=true, will get overwritten when reducer gives new events
    }
  };

  const handleEventAdd = (addInfo) => {
    const { title, end, start, extendedProps } = addInfo.event.toPlainObject();
    axios.post(`http://localhost:3001/api/calendar/add/${deskId}`, {
      title: title,
      start: start,
      end: end,
      userId: extendedProps.userId,
    });
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleDateSelect}
        eventAdd={handleEventAdd}
        events={events}

        /* datesSet={this.handleDates}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventChange={this.handleEventChange} // called for drag-n-drop/resize
            eventRemove={this.handleEventRemove}
        */
      />
    </div>
  );
};

export default Calendar;
