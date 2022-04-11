import { RegularPolygon, Rect } from "react-konva";

function Hall({ hall, color }) {
  let hallColor = hall.color;
  if (hallColor === "#39B54A") hallColor = "#F7931E";
  return (
    <>
      <RegularPolygon
        id={hall._id}
        x={hall.positionX}
        y={hall.positionY}
        sides={3}
        radius={25}
        fill={hallColor}
        shadowBlur={4}
        shadowOpacity={0.6}
        onMouseEnter={(e) => {
          const container = e.target.getStage().container();
          container.style.cursor = "pointer";
          e.target.fill("#258EA6");
        }}
        onMouseLeave={(e) => {
          const container = e.target.getStage().container();
          container.style.cursor = "default";
          e.target.fill(hallColor);
        }}
      />
    </>
  );
}

export default Hall;
