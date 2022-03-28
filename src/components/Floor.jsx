import { Stage, Layer, Rect, Text } from "react-konva";

function Floor({ desks }) {
  console.log(desks);

  const onClick = (e) => {
    console.log(e.target.attrs.id);
  };

  return (
    <div className="floor_container">
      <Stage width={320} height={320}>
        <Layer>
          {desks.map((desk) => (
            <Rect
              key={desk._id}
              id={desk._id}
              x={desk.x}
              y={desk.y}
              width={35}
              height={20}
              fill="#39B54A"
              rotation={desk.rotation}
              onClick={onClick}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

export default Floor;
