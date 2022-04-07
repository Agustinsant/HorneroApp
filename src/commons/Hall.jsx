import { RegularPolygon } from "react-konva";

function Hall({ hall }) {
  console.log("hall", hall);
  return (
    <>
      <RegularPolygon
        x={hall.positionX}
        y={hall.positionY}
        sides={3}
        radius={25}
        fill="#FF5733"
      />
    </>
  );
}

export default Hall;
