import FullCalendar from "@fullcalendar/react";
import listPlugin from '@fullcalendar/list';

const Booking = ({userId}) => {

    return(
        <FullCalendar
        plugins={[listPlugin]}
        headerToolbar={{
            right: "next",
            center: "title",
            left: "prev"
          }}
        initialView="listMonth"
        //events={}
        />
    )
}