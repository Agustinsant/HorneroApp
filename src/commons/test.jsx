import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";

const items = [1, 2, 3, 4];

class App extends Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text
            text="Try to hover rectangles, see cursor changes."
            fontSize={15}
          />
          {items.map(offset => (
            <Rect
              key={offset}
              x={70 * offset}
              y={50}
              width={50}
              height={50}
              fill="red"
              shadowBlur={10}
              onMouseEnter={e => {
                const container = e.target.getStage().container();
                container.style.cursor = "pointer";
              }}
              onMouseLeave={e => {
                const container = e.target.getStage().container();
                container.style.cursor = "default";
              }}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}

render(<App />, document.getElementById("root"));
