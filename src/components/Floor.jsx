import { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Calendar from "./Calendar";

function Floor({ floor, day }) {
  const { desks } = floor;
  const [desk, setDesk] = useState([]);

  const onClick = (e) => {
    console.log(e.target.attrs);
    setDesk(e.target.attrs);
  };

  return (
    <>
      <div className="floor_container">
        <Stage width={320} height={320}>
          <Layer>
            {desks.map((desk) => (
              <Rect
                calendar={desk.calendar}
                key={desk._id}
                id={desk._id}
                x={desk.positionX}
                y={desk.positionY}
                width={35}
                height={20}
                fill="#39B54A"
                rotation={desk.rotation}
                onClick={onClick}
                onTap={onClick}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <div className="desk__calendar">
        {desk.id && <Calendar deskId={desk.id} day={day} />}
      </div>
    </>
  );
}

export default Floor;
