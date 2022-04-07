import { Rect } from "react-konva";

function Desk({ desk }) {
  console.log("desk color", desk.color);
  const chairPositionBaseOnRotation = {
    0: {
      x: desk.positionX + 5,
      y: desk.positionY + 7,
    },
    90: {
      x: desk.positionX - 16,
      y: desk.positionY + 4.5,
    },
    180: {
      x: desk.positionX - 15,
      y: desk.positionY - 17,
    },
    270: {
      x: desk.positionX + 6,
      y: desk.positionY - 15,
    },
  };

  return (
    <>
      <Rect
        calendar={desk.calendar}
        key={desk._id}
        id={desk._id}
        x={chairPositionBaseOnRotation[desk.rotation].x}
        y={chairPositionBaseOnRotation[desk.rotation].y}
        width={10}
        height={10}
        fill={desk.color}
        rotation={0}
      />
      <Rect
        calendar={desk.calendar}
        key={desk._id.concat("chair")}
        id={desk._id}
        x={desk.positionX}
        y={desk.positionY}
        width={20}
        height={12}
        fill={desk.color}
        rotation={desk.rotation}
      />
      {/* ///////////////////////////// */}
    </>
  );
}

export default Desk;
