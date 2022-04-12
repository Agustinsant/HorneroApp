import { useParams } from "react-router";
import { getUserBooking } from "../services/calendarServices";
import { getUserById } from "../services/userServices"; 
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from '@fullcalendar/list';
import { render } from "@testing-library/react";

const Booking = () => {
    const {userId} = useParams();
    const [user, setUser]= useState({});
    const [events, setEvents] = useState([]);
    
    console.log("events", events)

    useEffect(async () => {
        if(userId) {
        const userBooking = await getUserBooking(userId);
        const user = await getUserById(userId)
        setEvents(userBooking)
        setUser(user)
        }
    },[userId])


const renderEventContent = (eventInfo) =>{
    return(
        <div className="event-booking">
            <div className="floor-book">1 er piso</div>
            <div className="building-book">mar del plata</div>
        </div>
    )
}

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
                    eventContent={renderEventContent}
                />
            </div>
        </div>
        </>
    )

}


export default Booking;