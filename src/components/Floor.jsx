import { useState } from "react";
import { Stage, Layer, Rect, Group, Image } from "react-konva";
import Calendar from "./Calendar";
import useImage from "use-image";
import Map from "../commons/Map";

function Floor({ floor }) {
  const { desks } = floor;
  const [desk, setDesk] = useState([]);
  const [deskCalendarUp, setDeskCalendarUp] = useState(false);

  const onClick = (e) => {
    setDesk(e.target.attrs);
    setDeskCalendarUp((prev) => !prev);
  };
  const closeCalendar = () => {
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
                <Rect
                  calendar={desk.calendar}
                  key={desk._id}
                  id={desk._id}
                  x={180 + 7.5}
                  y={40 + 10}
                  width={15}
                  height={15}
                  fill="#39B54A"
                  rotation={0}
                  onClick={onClick}
                  onTap={onClick}
                  stroke={0.1}
                />
                <Rect
                  calendar={desk.calendar}
                  key={desk._id}
                  id={desk._id}
                  x={180}
                  y={40}
                  width={30}
                  height={18}
                  fill="#39B54A"
                  rotation={0}
                  stroke={0.1}
                />
              </Group>
            ))}
          </Layer>
        </Stage>
      </div>
      {deskCalendarUp ? (
        <div className="desk__calendar">
          {desk.id && (
            <Calendar deskId={desk.id} closeCalendar={closeCalendar} />
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Floor;
