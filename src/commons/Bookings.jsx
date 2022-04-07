import { useMatch } from "react-router";
import { useSelector } from "react-redux";
import { getUserBooking } from "../services/calendarServices";
import { getUserById } from "../services/userServices"; 
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from '@fullcalendar/list';

const Booking = ({userId}) => {
    const [user, setUser]= useState({});
    const [events, setEvents] = useState([]);
    
    
    useEffect(async () => {
        if(userId) {
        const userBooking = await getUserBooking(userId);
        const user = await getUserById(userId)
        setEvents(userBooking)
        setUser(user)
        }
    },[userId])




    return(
        <>
        <div className="profile_container">
            <h6>Mi Reservas</h6>
            <div className="profilePhotoContainer">
                <div className="profile_photo">
                    <img src={user.img} />
                </div>
            </div>
            <h5>{user.name}</h5>
            <hr/>
            <div className="booking_container">
                <FullCalendar
                    locale={"es"}
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