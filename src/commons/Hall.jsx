import { RegularPolygon, Image } from "react-konva";
import useImage from "use-image";

function Hall({ hall, userImg }) {
  const [image] = useImage(userImg);
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
      <Image
        image={image}
        width={15}
        height={15}
        x={hall.positionX - 7}
        y={hall.positionY - 8}
      />
    </>
  );
}

export default Hall;
