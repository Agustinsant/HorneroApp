import { Stage, Layer, Rect, Group, Image } from "react-konva";

function Desk({ desk }) {
  const chairPosition = {
    x: desk.positionX + 5,
    y: desk.positionY + 7,
  };
  return (
    <>
      <Rect
        calendar={desk.calendar}
        key={desk._id}
        id={desk._id}
        x={chairPosition.x}
        y={chairPosition.y}
        width={10}
        height={10}
        fill="#39B54A"
        rotation={0}
        stroke={0.1}
      />
      <Rect
        calendar={desk.calendar}
        key={desk._id + 1}
        id={desk._id}
        x={desk.positionX}
        y={desk.positionY}
        width={20}
        height={12}
        fill="#39B54A"
        rotation={0}
        stroke={0.1}
      />
    </>
  );
}

export default Desk;
