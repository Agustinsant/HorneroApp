import FullCalendar from "@fullcalendar/react";
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
  const imgs = require.context("../storage/upload", true);

  let render = 0;


  useEffect(async () => {
    const deskCalendar = await getCalendar(deskId);
    setEvents(deskCalendar);
  }, [deskId]);

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    calendarApi.addEvent(
      // will render immediately. will call handleEventAdd

      {
        title: user.data.name,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        userId: user.data._id,
        userImg: user.data.img,
      },
      true
    ); // temporary=true, will get overwritten when reducer gives new events
  };

  const handleEventAdd = (addInfo) => {
    const { title, end, start, extendedProps } = addInfo.event.toPlainObject();
    axios.post(`http://localhost:3001/api/calendar/add/${deskId}`, {
      title: title,
      start: start,
      end: end,
      userId: extendedProps.userId,
      userImg: extendedProps.userImg,
    });
    render = 1;
  };


  const handleEventChange = (eventInfo) => {
    render = 2;
    console.log("event", eventInfo.event.toPlainObject())
   // const { title, end, start, extendedProps } = addInfo.event.toPlainObject();
    //axios.update(`http://localhost:3001/api/calendar/update/${}`)
  

  }

  const renderEventContent = (eventInfo) => {
    console.log("event", eventInfo);
    //eventinfo trae un monton de propiedades para darle estilos
    let checkId = eventInfo.event.extendedProps.userId;
    let userImg = eventInfo.event.extendedProps.userImg
      ? eventInfo.event.extendedProps.userImg
      : "nophoto.jpg";
    if (user.data._id === checkId) {
      eventInfo.backgroundColor = "#00A99D ";
      eventInfo.borderColor = "#00A99D";
    } else {
      eventInfo.backgroundColor = "#444444";
      eventInfo.borderColor = "#444444";
    }

    return (
      <div className="event_container">
        <div className="image_calendar">
          {<img className="userImg_calendar" src={imgs(`./${userImg}`)} />}
        </div>
        <br />
        <b className="event_timeText">{eventInfo.timeText}</b>
        <br />
        <i className="event_calendar">{eventInfo.event.title}</i>
      </div>
    );
  };


  const officeHours = () => {
    return {
      daysOfWeek: [1, 2, 3, 4, 5],
      startTime: "08:00",
      endTime: "21:00",
    };
  };


  return (
    <div className="calendar_container" mou>
      <FullCalendar
        height={400}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          right: "next",
          center: "title",
          left: "prev",
        }}
        footerToolbar={{
          center: "dayGridMonth timeGridDay",
        }}
        initialView="dayGridMonth"

        editable={true}
        selectable={true}
        navLinks={true}
        selectMirror={true}
        dayMaxEvents={true}
        nowIndicator={true}
        longPressDelay={200}
        businessHours={officeHours}
        select={handleDateSelect}
        eventAdd={handleEventAdd}
        events={events}
        eventContent={renderEventContent}
        eventChange={handleEventChange} // custom render function


        /* datesSet={this.handleDates}
            eventClick={this.handleEventClick}
            // called for drag-n-drop/resize
            eventRemove={this.handleEventRemove}
        */
      />
    </div>
  );
};

export default Calendar;
