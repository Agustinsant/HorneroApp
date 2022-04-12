import { useParams } from "react-router";
import { getUserBooking } from "../services/calendarServices";
import { getUserById } from "../services/userServices";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import useFetch from "../hooks/useFetch";
import { render } from "@testing-library/react";

import "./booking.css";

const Booking = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [events, setEvents] = useState({});

  useEffect(async () => {
    const user = await getUserById(userId);
    setUser(user);
  }, [userId]);

  const { data, loading } = useFetch(
    `http://localhost:3001/api/calendar/all/${userId}`
  );

  const renderEventContent = (eventInfo) => {
    const { extendedProps } = eventInfo.event.toPlainObject();
    return (
      <div className="event-booking">
        <div className="building-book">{extendedProps.city}</div>
        <div className="floor-book">{extendedProps.buildingName}</div>
        <div className="floor-book">{extendedProps.floorName}</div>
      </div>
    );
  };

  return (
    <>
      {!loading ? (
        <div className="profile_container">
          <h6>Mi Reservas</h6>
          <div className="profilePhotoContainer">
            <div className="profile_photo">
              <img src={user.img} />
            </div>
          </div>
          <h5>{user.name}</h5>
          <hr />
          <div className="booking_container">
            <FullCalendar
              locale={"es"}
              height={340}
              plugins={[listPlugin]}
              headerToolbar={{ right: "next", center: "title", left: "prev" }}
              initialView="listMonth"
              events={data}
              eventContent={renderEventContent}
            />
          </div>
        </div>
      ) : (
        <div className="booking_container">
          <div className="deskCanFly">
            <img
              src="https://cdn.iconscout.com/icon/premium/png-256-thumb/employee-desk-24-1125109.png"
              alt="loading"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
