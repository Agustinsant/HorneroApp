import { useState } from "react";
import { Stage, Layer, Group } from "react-konva";
import Calendar from "./Calendar";
import Map from "../commons/Map";
import Desk from "../commons/Desk";
import Hall from "../commons/Hall";

function Floor({ floor, day }) {
  const { desks } = floor;
  const typeDesks = desks.filter((d) => d.type === "desk");
  const typeHall = desks.filter((d) => d.type === "hall");
  console.log("floor desks", desks);
  console.log("halls", typeHall);
  console.log("typedesks", typeDesks);
  const [desk, setDesk] = useState([]);
  const [deskCalendarUp, setDeskCalendarUp] = useState(false);

  const onClick = (e) => {
    setDesk(e.target.attrs);
    setDeskCalendarUp((prev) => !prev);
  };

  return (
    <>
      <div className="floor_container">
        <Stage width={600} height={300}>
          <Layer>
            <Map url={floor.imgFloor} />
            {typeDesks.map((desk) => (
              <Group onClick={onClick} onTap={onClick} key={desk._id}>
                <Desk desk={desk} rotation={desk.rotation} />
              </Group>
            ))}
            {typeHall.map((hall) => (
              <Hall
                onClick={onClick}
                onTap={onClick}
                key={hall._id}
                hall={hall}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      {deskCalendarUp ? (
        <div className="desk__calendar">
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
