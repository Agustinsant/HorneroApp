import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getEventsDayByDesk } from "../services/buildingServices";
import {
  getCalendar,
  addEventCalendar,
  deleteEventCalendar,
  updateEventCalendar,
  getDayEventsInDesk,
  getDayEvents,
  addParticipant,
} from "../services/calendarServices";
import swal from "sweetalert";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddParticipants from "./AddParticipants";

const Calendar = ({ deskId, setDeskCalendarUp, day}) => {
  const user = useSelector((state) => state.user.data);
  const [events, setEvents] = useState([]);
  const [dayView, setDayView] = useState(false);
  const [addParticipantsUp, setAddParticipantsUp] = useState({ state: false });

  const uploadEvents = async () => {
    const deskCalendar = day
      ? await getDayEventsInDesk(day, deskId)
      : await getCalendar(deskId);
    const events = await getDayEvents(deskCalendar, deskId);
    setEvents(events);
  };

  useEffect(() => {
    uploadEvents();
  }, [deskId]);

  /* ------------- ADD FUNCTIONS ------------ */
  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    calendarApi.addEvent(
      {
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        userId: user._id,
      },
      true
    );
  };

  const handleEventAdd = async (addInfo) => {
    const allDay = addInfo.event.allDay;
    await addEventCalendar(deskId, addInfo.event.toPlainObject(), allDay);
    swal({
      title: "Hiciste una reserva!",
      text: "Ve a tu email para corroborarlo",
      icon: "success",
      buttons: false,
      timer: 2000,
    });
    uploadEvents();
  };

  const handleAllday = async () => {
    const dayEvents = await getEventsDayByDesk(deskId, day);
    if (dayEvents.length > 0) {
      swal({
        title: "Selecciona un dia disponible",
        text: "existe ya una reserva en esta lugar",
        icon: "error",
        buttons: false,
        timer: 1250,
      });
    } else {
      let eventObject = {
        start: `${day}T07:00:00`,
        end: `${day}T21:00:00`,
        extendedProps: {
          userId: user._id,
        },
      };
      await addEventCalendar(deskId, eventObject, true);
    }
    uploadEvents();
  };

  /* -------------  DELETE FUNCTIONS ------------ */
  const handleDelete = (eventInfo) => {
    swal({
      title: "Estas seguro?",
      text: "Una vez borrada, no podras recuperar la reserva!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        eventInfo.remove();
        swal("Poof! tu reserva se elimino!", {
          icon: "success",
          buttons: false,
          timer: 1000,
        });
      } else {
        swal("Tu reserva esa a salvo!", {
          buttons: false,
          timer: 1000,
        });
      }
    });
  };

  const handleEventRemove = async (eventInfo) => {
    const eventId = eventInfo.event.extendedProps._id;
    await deleteEventCalendar(eventId);
    uploadEvents();
  };

  /* -------------  UPDATE FUNCTION ------------ */
  const handleEventChange = async (eventInfo) => {
    const { end, start, extendedProps } = eventInfo.event.toPlainObject();
    const isTheUser = extendedProps.usersId[0] === user._id;
    if (isTheUser) {
      await updateEventCalendar(extendedProps._id, { start, end });
      swal("Reserva actualizada", {
        icon: "success",
        buttons: false,
        timer: 1000,
      });
    } else {
      swal({
        title: "Lo siento! no puedes",
        text: "cambiar la reserva de otros usuarios",
        icon: "error",
        timer: 2000,
        buttons: false,
      });
    }
    uploadEvents();
  };

   /* -------------  TIME GRID VIEW FUNCTIONs ------------ */
   const handleRangeView = (day) => {
    let start = new Date(day.concat("T00:00:00"));
    let end = new Date(start);
    end.setDate(end.getDate() + 1);
    return { start: day, end: end };
  };

  /* -------------  OVERLAP FUNCTION ------------ */
  const handleOverlap = () => {
    swal("Selecciona un horario disponible", {
      icon: "error",
      buttons: false,
      timer: 1250,
    });
  };

  /* -------------  EVENT VIEW FUNCTION ------------ */
  const renderEventContent = (eventInfo) => {
    if (eventInfo.event.title) {
      let isHall = eventInfo.event.title === "Sala Reservada";
      let checkId = eventInfo.event.extendedProps.usersId;
      let isTheUser = checkId.includes(user._id);
      let userImg = eventInfo.event.extendedProps.img;
      let colorEvent = isTheUser ? "#00A99D" : "#666666";

      eventInfo.backgroundColor = colorEvent;
      eventInfo.borderColor = colorEvent;

      return (
        <>
          <div className="event_container">
            <div className="image_calendar">
              {
                //mapear imagenes cierta cantidad
                <img className="userImg_calendar" src={userImg} />
              }
            </div>
            <i className="event_calendar">{eventInfo.event.title}</i>
            <b className="event_timeText">{eventInfo.timeText}</b>
            {isTheUser && (
              <FaRegTimesCircle
                className="delete_envent"
                onClick={() => handleDelete(eventInfo.event)}
              />
            )}
          </div>
          {isTheUser && isHall && (
            <div className="addParticipants">
              <AiOutlineUsergroupAdd 
                onClick={() =>
                  setAddParticipantsUp({
                    state: true,
                    eventId: eventInfo.event.extendedProps._id,
                  })
                }
                className="addParticipantsIconinEvent"
              />
              <div className="infoAdd" onClick={() =>
                  setAddParticipantsUp({
                    state: true,
                    eventId: eventInfo.event.extendedProps._id,
                  })
                }><p >Agrega amigos a la sala</p></div>
            </div>
          )}
        </>
      );
    }
  };

 

  /* ---------- COMPONENT --------- */
  return (
    <div className="calendar_overlay">
      <div className="calendar_container">
        <div className="close-buton-container">
          <FaRegTimesCircle
            className="close_calendar"
            onClick={() => setDeskCalendarUp(false)}
          />
        </div>
        <FullCalendar
          locale={"es"}
          height={400}
          longPressDelay={200}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={day ? { right: "allDay" } : {left: "prev", center: "title", right: "next" }}
          footerToolbar={day ? {} : { center: "dayGridMonth timeGridDay" }}
          initialView={day ? "timeGrid" : "dayGridMonth"}
          visibleRange={day && handleRangeView(day)}
          customButtons={{
            allDay: {
              text: "todo el dia",
              click: handleAllday,
            },
          }}
          buttonText={{
            month: "Mes",
            day: "Dia",
          }}
          businessHours={{
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: "07:00",
            endTime: "21:00",
          }}
          events={events}
          selectOverlap={handleOverlap}
          eventOverlap={false}
          selectConstraint={"businessHours"}
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
      {addParticipantsUp.state ? (
        <AddParticipants
        eventId = {addParticipantsUp.eventId}
        state = {addParticipantsUp.state}
        setAddParticipantsUp = {setAddParticipantsUp}
        />
      ): (
        <></>
      )}
      </div>

    </div>
  );
};

export default Calendar;
