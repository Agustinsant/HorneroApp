import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getUserById } from "../services/userServices";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import useFetch from "../hooks/useFetch";
import {GiModernCity} from "react-icons/gi";
import {BiBuildingHouse, BiDesktop} from "react-icons/bi";
import {FaAngleLeft } from "react-icons/fa";
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

  const { loading } = useFetch(
    `http://localhost:3001/api/calendar/all/${userId}`
  );

  const data = [
    {"_id":{"$oid":"637e8c691cb53e6b014a0bc2"},"start":"2022-11-09T07:00:00-03:00","end":"2022-11-09T09:00:00-03:00","allDay":false,"usersId":["637e7a191cb53e6b014a0b4f"],"buildingName":"Poseidon I","floorName":"1º Piso","city":"Cordoba","deskId":"637e825b04ab6558b51a934d","__v":{"$numberInt":"0"}},
    {"_id":{"$oid":"637e8c691cb53e6b014a0bc2"},"start":"2022-11-12T07:00:00-03:00","end":"2022-11-09T09:00:00-03:00","allDay":false,"usersId":["637e7a191cb53e6b014a0b4f"],"buildingName":"Poseidon I","floorName":"1º Piso","city":"Cordoba","deskId":"637e825b04ab6558b51a934d","__v":{"$numberInt":"0"}},
    {"_id":{"$oid":"637e8c691cb53e6b014a0bc2"},"start":"2022-11-13T07:00:00-03:00","end":"2022-11-09T09:00:00-03:00","allDay":false,"usersId":["637e7a191cb53e6b014a0b4f"],"buildingName":"Poseidon I","floorName":"1º Piso","city":"Cordoba","deskId":"637e825b04ab6558b51a934d","__v":{"$numberInt":"0"}},
  ]

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
          <Link to='/mi_perfil' className="goBackBtn"><FaAngleLeft className="link_arrows"/>Volver  </Link>
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
