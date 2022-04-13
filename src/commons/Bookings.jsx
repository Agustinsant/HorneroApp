import { useParams } from "react-router";
import { getUserById } from "../services/userServices";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import useFetch from "../hooks/useFetch";
import {GiModernCity} from "react-icons/gi";
import {BiBuildingHouse, BiDesktop} from "react-icons/bi";
import {MdMeetingRoom} from "react-icons/md";
import {BsUiChecksGrid} from "react-icons/bs";
import {HiOutlineUserGroup} from "react-icons/hi"


import "../styles/booking.css";
const horneroImg = require("../assets/hornero.png");

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
        <div className="book"><GiModernCity className="iconBooking"/><br/> {extendedProps.city}</div>
        <div className="book"><BiBuildingHouse className="iconBooking"/><br/>{extendedProps.buildingName}</div>
        <div className="book"><BsUiChecksGrid className="iconBooking"/><br/>{extendedProps.floorName}</div>
        <div className="book2">{extendedProps.deskType === "hall" ? (
          <>
            <HiOutlineUserGroup className="iconBooking"/><br/>meeting room
          </>
        ):(
          <>
            <BiDesktop className="iconBooking"/><br/>desk
          </>
        )}</div>
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
            <img src={horneroImg} alt="loading" />
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
