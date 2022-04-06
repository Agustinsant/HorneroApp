import { useEffect, useState } from "react";
import { Stage, Layer, Rect, Group, Image } from "react-konva";
import Calendar from "./Calendar";
import useImage from "use-image";
import Map from "../commons/Map";
import Desk from "../commons/Desk";

function Floor({ floor, day }) {
  const { desks } = floor;
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
            {desks.map((desk) => (
              <Group onClick={onClick} onTap={onClick}>
                <Desk desk={desk} />
              </Group>
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
