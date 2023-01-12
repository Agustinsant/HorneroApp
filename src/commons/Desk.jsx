import { useState } from "react";
import { Rect, Image } from "react-konva";
import useImage from "use-image";

function Desk({ userImg }) {
  // este desk esta hardcodeado para mostrar BORRAR
  const [desk, setDesk] = useState({
    _id: "637e825b04ab6558b51a934d",
    type: "desk",
    positionX: 70,
    positionY: 100,
    rotation: 90,
    imgDesk: "",
    buildingId: "637e7ef404ab6558b51a9348",
    floorId: "637e813e04ab6558b51a934c",
    calendarEvent: [{}],
    userWillBeHere: true,
    color: "#39B54A"
  });

  const [image] = useImage(userImg);
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
  const imgPositionBaseOnRotation = {
    0: {
      x: desk.positionX + 5,
      y: desk.positionY + 1,
    },
    90: {
      x: desk.positionX - 11,
      y: desk.positionY + 4,
    },
    180: {
      x: desk.positionX - 15,
      y: desk.positionY - 11,
    },
    270: {
      x: desk.positionX,
      y: desk.positionY - 15,
    },
  };

  return (
    <>
      {desk.userWillBeHere ? (
        <>
          <Rect
            key={desk._id.concat("chair")}
            id={desk._id}
            x={chairPositionBaseOnRotation[desk.rotation].x}
            y={chairPositionBaseOnRotation[desk.rotation].y}
            width={10}
            height={10}
            fill={desk.color}
            rotation={0}
            shadowBlur={4}
            shadowOpacity={0.6}
          />
          <Rect
            key={desk._id}
            id={desk._id}
            x={desk.positionX}
            y={desk.positionY}
            width={20}
            height={12}
            fill={desk.color}
            rotation={desk.rotation}
            shadowBlur={5}
            shadowOpacity={0.6}
            onMouseEnter={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = "pointer";
              e.target.fill("#258EA6");
            }}
            onMouseLeave={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = "default";
              e.target.fill(desk.color);
            }}
          />
         {/*    <Image
            image={image}
            width={10}
            height={10}
            x={imgPositionBaseOnRotation[desk.rotation].x}
            y={imgPositionBaseOnRotation[desk.rotation].y}
          /> */}
        </>
      ) : (
        <>
          <Rect
            key={desk._id.concat("chair")}
            id={desk._id}
            x={chairPositionBaseOnRotation[desk.rotation].x}
            y={chairPositionBaseOnRotation[desk.rotation].y}
            width={10}
            height={10}
            fill={desk.color}
            rotation={0}
            shadowBlur={4}
            shadowOpacity={0.6}
          />
          <Rect
            key={desk._id}
            id={desk._id}
            x={desk.positionX}
            y={desk.positionY}
            width={20}
            height={12}
            fill={desk.color}
            rotation={desk.rotation}
            shadowBlur={5}
            shadowOpacity={0.6}
            onMouseEnter={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = "pointer";
              e.target.fill("#258EA6");
            }}
            onMouseLeave={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = "default";
              e.target.fill(desk.color);
            }}
          />
        </>
      )}
    </>
  );
}

export default Desk;
