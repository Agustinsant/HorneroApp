import { useState, useEffect } from "react";
import { Stage, Layer, Group } from "react-konva";
import { useSelector } from "react-redux";
import Calendar from "./Calendar";
import Map from "../commons/Map";
import Desk from "../commons/Desk";
import Hall from "../commons/Hall";
import { getEventsDayByFloor } from "../services/buildingServices";
import useFetch from "../hooks/useFetch";
const horneroImg = require("../assets/hornero.png");

function Floor({ floor, day }) {
  const userLoged = useSelector((state) => state.user.data);

  const { desks } = floor;
  // const typeDesks = desks.filter((d) => d.type === "desk");
  // const typeHall = desks.filter((d) => d.type === "hall");

  const [typeDesks, setTypeDesks] = useState(
    desks.filter((d) => d.type === "desk")
  );
  const [typeHall, setTypeHall] = useState(
    desks.filter((d) => d.type === "hall")
  );

  const [desk, setDesk] = useState([]);
  const [deskCalendarUp, setDeskCalendarUp] = useState(false);

  const colors = {
    desk: {
      empty: "#39B54A",
      concurred: "#BFD732",
      full: "#444444 ",
    },
    hall: {
      empty: "#F7931E",
      concurred: "#BFD732",
      full: "#444444 ",
    },
  };
  useEffect(() => {
    setTypeDesks(desks.filter((d) => d.type === "desk"));
    setTypeHall(desks.filter((d) => d.type === "hall"));
  }, [day, floor]);

  useEffect(async () => {
    //look for desk events for the selected day
    if (day) {
      const data = await getEventsDayByFloor(floor._id, day);
      //set the desk color with the data retrived

      data.map((dayEvent) => {
        //FULL DAY CASE
        if (dayEvent.allDay) {
          //check if the event corresponds to a desk or hall
          let deskIndex = typeDesks.findIndex(
            (desk) => desk._id === dayEvent.deskId
          );
          if (deskIndex < 0) {
            //identified the hall and update it
            let hallIndex = typeHall.findIndex(
              (hall) => hall._id === dayEvent.deskId
            );
            typeHall[hallIndex].color = colors.hall.full;
            //if user have a booking on that desk, mark it
            if (dayEvent.usersId.filter((user) => user === userLoged._id)[0])
              typeHall[hallIndex].userWillBeHere = true;
            let data = JSON.parse(JSON.stringify(typeHall));
            setTypeHall(data);
          } else {
            typeDesks[deskIndex].color = colors.desk.full;
            if (dayEvent.usersId.filter((user) => user === userLoged._id)[0])
              typeDesks[deskIndex].userWillBeHere = true;
            let data = JSON.parse(JSON.stringify(typeDesks));
            setTypeDesks(data);
          }
        } else {
          //NO FULL DAY
          let deskIndex = typeDesks.findIndex(
            (desk) => desk._id === dayEvent.deskId
          );
          if (deskIndex < 0) {
            //identified the hall and update it
            let hallIndex = typeHall.findIndex(
              (hall) => hall._id === dayEvent.deskId
            );
            typeHall[hallIndex].color = colors.hall.concurred;
            if (dayEvent.usersId.filter((user) => user === userLoged._id)[0])
              typeHall[hallIndex].userWillBeHere = true;
            let data = JSON.parse(JSON.stringify(typeHall));
            setTypeHall(data);
          } else {
            typeDesks[deskIndex].color = colors.desk.concurred;
            if (dayEvent.usersId.filter((user) => user === userLoged._id)[0])
              typeDesks[deskIndex].userWillBeHere = true;
            let data = JSON.parse(JSON.stringify(typeDesks));
            setTypeDesks(data);
          }
        }
      });
    }
  }, [day]);

  const onClick = (e) => {
    setDesk(e.target.attrs);
    setDeskCalendarUp((prev) => !prev);
  };

  const { loading } = useFetch(
    `http://localhost:3001/api/calendar/all/${userLoged._id}`
  );
  if (loading) {
    return (
      <div className="booking_container">
        <div className="deskCanFly">
          <img src={horneroImg} alt="loading" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="floor_container">
        <Stage width={600} height={300}>
          <Layer>
            <Map url={floor.imgFloor} />
            {typeDesks.map((desk) => (
              <Group onClick={onClick} onTap={onClick} key={desk._id}>
                <Desk
                  desk={desk}
                  key={desk._id + "d"}
                  userImg={userLoged.img}
                />
              </Group>
            ))}
            {typeHall.map((hall) => (
              <Group onClick={onClick} onTap={onClick} key={hall._id + "h"}>
                <Hall
                  onClick={onClick}
                  onTap={onClick}
                  key={hall._id}
                  hall={hall}
                  userImg={userLoged.img}
                />
              </Group>
            ))}
          </Layer>
        </Stage>
      </div>
      {deskCalendarUp ? (
        <div>
          {desk.id && (
            <Calendar
              deskId={desk.id}
              setDeskCalendarUp={setDeskCalendarUp}
              day={day}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Floor;
