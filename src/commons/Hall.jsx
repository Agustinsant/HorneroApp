import { RegularPolygon, Rect } from "react-konva";

function Hall({ hall }) {
  return (
    <>
      <RegularPolygon
        calendar={hall.calendar}
        id={hall._id}
        x={hall.positionX}
        y={hall.positionY}
        sides={3}
        radius={25}
        fill="#F7931E"
      />
    </>
  );
}

export default Hall;
