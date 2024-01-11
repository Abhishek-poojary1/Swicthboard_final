import React from "react";
import { useColorContext } from "./ColorContext";

const Canvas = ({ module }) => {
  const { color, selectedSize, selectedColor } = useColorContext();

  return (
    <div>
      <div className="main" style={{ backgroundColor: color }}>
        <div
          className="board"
          style={{
            width: selectedSize.width,
            backgroundColor: selectedColor,
            border: "2px solid #rgba(106, 104, 104, 0.27)",
            height: selectedSize.height,
            border: "1px solid black",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Canvas;
