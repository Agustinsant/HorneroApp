import { useMatch } from "react-router";
import { useSelector } from "react-redux";
import { getUserBooking } from "../services/calendarServices";
import { useEffect, useState } from "react";
import noPhoto from '../resources/img/noPhoto.webp'
import FullCalendar from "@fullcalendar/react";
import listPlugin from '@fullcalendar/list';

const Booking = ({userId}) => {
    const user = useSelector(state => state.user.data);
    //const match = useMatch("./mis_reservas");
    const [events, setEvents] = useState([]);
    const imgs = require.context("../storage/upload", true);
    const imgProfile = user.img ? (imgs(`./${user.img}`)) : (noPhoto)
    
    useEffect(async () => {
        if(userId) {
        const userBooking = await getUserBooking(userId);
        setEvents(userBooking)
        }
    },[userId])




    return(
        <>
        <div className="profile_container">
            <h6>Mi Reservas</h6>
            <div className="profilePhotoContainer">
                <div className="profile_photo">
                    <img src={imgProfile || noPhoto} />
                </div>
            </div>
            <h5>{user.name}</h5>
            <hr/>
            <div className="booking_container">
                <FullCalendar
                    height={340}
                    plugins={[listPlugin]}
                    headerToolbar={{right: "next", center: "title", left: "prev" }}
                    initialView="listMonth"
                    events={events}
                />
            </div>
        </div>
        </>
    )
}

export default Booking;