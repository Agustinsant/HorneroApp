import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";
import { getCalendar, addEventCalendar, deleteEventCalendar, updateEventCalendar } from "../services/calendarServices";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = ({ deskId }) => {
  const user = useSelector((state) => state.user.data);
  const [events, setEvents] = useState([]);
  const imgs = require.context("../storage/upload", true);

  const rendering = async () => {
    const deskCalendar = await getCalendar(deskId);
    setEvents(deskCalendar);
  }

  useEffect( () => {
    rendering();
  }, [deskId]);

  
  /* ------------- ADD FUNCTIONS ------------ */
  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    calendarApi.addEvent(
      {
        title: user.name,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        userId: user._id,
        userImg: user.img,
      },true
      );
  };

  const handleEventAdd = async (addInfo) => {
    await addEventCalendar(deskId, addInfo.event.toPlainObject())
    rendering();
  };
 

  /* -------------  DELETE FUNCTIONS ------------ */
  const handleDelete = (eventInfo) => {
    if(window.confirm(`Are you sure you want to delete your reservation?`)) eventInfo.remove()
  };

  const handleEventRemove = async (eventInfo) => {
    const eventId = eventInfo.event.extendedProps._id;
    await deleteEventCalendar(eventId)
    rendering();
  };

 
  /* -------------  UPDATE FUNCTION ------------ */
    const handleEventChange = async (eventInfo) => {
    const { end, start, extendedProps} = eventInfo.event.toPlainObject();
    const isTheUser = (extendedProps.userId === user._id)
    if(isTheUser){
      await updateEventCalendar(extendedProps._id, {start, end})
    } else{
      alert("Sorry! you cannot change reservations from other users")
    }
    rendering();
  } 



  /* -------------  EVENT VIEW FUNCTION ------------ */
  const renderEventContent = (eventInfo) => {
    let checkId = eventInfo.event.extendedProps.userId;
    let isTheUser = (user._id === checkId);
    let userImg = eventInfo.event.extendedProps.userImg ? (eventInfo.event.extendedProps.userImg) : ("nophoto.jpg");
    let colorEvent = isTheUser ? "#00A99D" : "#444444" ;
    
    eventInfo.backgroundColor = colorEvent
    eventInfo.borderColor = colorEvent

    return (
      <div className="event_container">
        <div className="image_calendar">
          {<img className="userImg_calendar" src={imgs(`./${userImg}`)} />}
        </div>
        <i className="event_calendar">{eventInfo.event.title}</i>
        <b className="event_timeText">{eventInfo.timeText}</b>
        {isTheUser && (<FaRegTimesCircle  className="delete_envent" onClick={() => handleDelete(eventInfo.event)} />)}
      </div>
    );
  };


  /* ---------- COMPONENT --------- */
  return (
    <div className="calendar_container" >
      <FullCalendar
        height={400}
        longPressDelay={200}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{ right: "next", center: "title", left: "prev"}}
        footerToolbar={{center: "dayGridMonth timeGridDay"}}
        initialView="dayGridMonth"
        events={events} 
        editable={true}
        selectable={true}
        navLinks={true}
        selectMirror={true}
        dayMaxEvents={true}
        nowIndicator={true}
        select={handleDateSelect}
        eventAdd={handleEventAdd}
        eventContent={renderEventContent}
        eventRemove={handleEventRemove}
        eventChange={handleEventChange} 
      />
    </div>
  );
};

export default Calendar;
