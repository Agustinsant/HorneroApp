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
  const imgs = require.context("../storage/upload", true)

  useEffect(async () => {
    const deskCalendar = await getCalendar(deskId);
    setEvents(deskCalendar);
  }, []);

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
      calendarApi.addEvent(           // will render immediately. will call handleEventAdd

        {
          title: user.data.name,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          userId: user.data._id,
          userImg: user.data.img    
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
      userImg: extendedProps.userImg
    });
  };
   const renderEventContent= (eventInfo) => {
     console.log("event", eventInfo)
     //eventinfo trae un monton de propiedades para darle estilos
     let checkId = eventInfo.event.extendedProps.userId
     let userImg = eventInfo.event.extendedProps.userImg ? eventInfo.event.extendedProps.userImg : "nophoto.jpg"
     if(user.data._id === checkId){
      eventInfo.backgroundColor = "#00A99D ";
      eventInfo.borderColor= "#00A99D";
     } else {
      eventInfo.backgroundColor = "#444444";
      eventInfo.borderColor= "#444444";
     }  

   
    
    return (
       <div className="event_container">
        <div className="image_calendar">
          {<img className="userImg_calendar"src={imgs(`./${userImg}`)} />}
        </div>
            <br/>
            <b className="event_timeText">{eventInfo.timeText}</b><br/>
            <i className="event_calendar">{eventInfo.event.title}</i>
        </div>
     
    )
  }
  
  return (
    <div className="calendar_container">
      <FullCalendar
       expandRows={true}
       height={400}
        plugins={[timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          right: "next today",
          center: "title",
          left: "prev"
        }}
        initialView="timeGridWeek"
        duration={{"days":"3"}}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleDateSelect}
        eventAdd={handleEventAdd}
        events={events}
        eventContent={renderEventContent} // custom render function


        /* datesSet={this.handleDates}
            eventClick={this.handleEventClick}
            eventChange={this.handleEventChange} // called for drag-n-drop/resize
            eventRemove={this.handleEventRemove}
        */
      />
    </div>
  );
};

export default Calendar;
