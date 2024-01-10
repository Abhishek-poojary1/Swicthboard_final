import React from "react";
import { useColorContext } from "./ColorContext";

const Canvas = ({ module }) => {
  const { color, selectedModule, selectedSize } = useColorContext();

  return (
    <div>
      <div className="main" style={{ backgroundColor: color }}>
        <div
          className="board"
          style={{
            width: selectedSize.width,
            height: selectedSize.height,
            border: "1px solid black",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Canvas;
