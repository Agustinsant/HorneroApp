import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegTimesCircle } from "react-icons/fa";
import { getUserById } from "../services/userServices";
import {
  getCalendar,
  addEventCalendar,
  deleteEventCalendar,
  updateEventCalendar,
} from "../services/calendarServices";
import swal from "sweetalert";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = ({ deskId, closeCalendar }) => {
  const user = useSelector((state) => state.user.data);
  const [events, setEvents] = useState([]);
  

  const rendering = async () => {
    const deskCalendar = await getCalendar(deskId);
    const addTitleAndImg = await Promise.all(
      deskCalendar.map(async (event) => {
        //ver si viene mas de un id
        const user = await getUserById(event.userId);
        event.title = user.name;
        event.img = user.img;
        return event;
      })
    );
    setEvents(addTitleAndImg);
  };

  useEffect(() => {
    rendering();
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
    await addEventCalendar(deskId, addInfo.event.toPlainObject());
    rendering();
  };

  /* -------------  DELETE FUNCTIONS ------------ */
  const handleDelete = (eventInfo) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this reservation!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        eventInfo.remove();
        swal("Poof! Your reservation has been deleted!", {
          icon: "success",
          buttons: false,
          timer: 1000,
        });
      } else {
        swal("Your reservation is safe!", {
          icon: "success",
          buttons: false,
          timer: 1000,
        });
      }
    });
  };

  const handleEventRemove = async (eventInfo) => {
    const eventId = eventInfo.event.extendedProps._id;
    await deleteEventCalendar(eventId);
    rendering();
  };

  /* -------------  UPDATE FUNCTION ------------ */
  const handleEventChange = async (eventInfo) => {
    const { end, start, extendedProps } = eventInfo.event.toPlainObject();
    const isTheUser = extendedProps.userId === user._id;
    if (isTheUser) {
      await updateEventCalendar(extendedProps._id, { start, end });
      swal("Updated reservation", {
        icon: "success",
        buttons: false,
        timer: 1000,
      });
    } else {
      swal({
        title: "Sorry! you cannot",
        text: "change reservations from other users",
        icon: "error",
        timer: 2000,
        buttons: false,
      });
    }
    rendering();
  };

  /* -------------  OVERLAP FUNCTION ------------ */
  const handleOverlap = () => {
    swal("Select an available time", {
      icon: "error",
      buttons: false,
      timer: 1250,
    });
  };

  /* -------------  EVENT VIEW FUNCTION ------------ */
  const renderEventContent = (eventInfo) => {
    let checkId = eventInfo.event.extendedProps.userId;
    let isTheUser = user._id === checkId;
    let userImg = eventInfo.event.extendedProps.img
      ? eventInfo.event.extendedProps.img
      : "nophoto.jpg";
    let colorEvent = isTheUser ? "#00A99D" : "#444444";

    eventInfo.backgroundColor = colorEvent;
    eventInfo.borderColor = colorEvent;

    return (
      <div className="event_container">
        <div className="image_calendar">

          {
            //mapear imagenes cierta cantidad
            <img className="userImg_calendar" src={imgs(`./${userImg}`)} />
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
    );
  };

  /* ---------- COMPONENT --------- */
  return (
    <div className="calendar_container">
      <FullCalendar
        height={400}
        longPressDelay={200}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{ right: "next", center: "title", left: "prev" }}
        footerToolbar={{ center: "dayGridMonth timeGridDay" }}
        initialView="dayGridMonth"
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: "07:00",
          endTime: "21:00",
        }}
        events={events}
        selectOverlap={handleOverlap}
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
