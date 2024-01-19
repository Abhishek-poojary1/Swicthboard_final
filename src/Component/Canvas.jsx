import React from "react";
import { useColorContext } from "./ColorContext";

const Canvas = () => {
  const { color, selectedSize, selectedColor, selectedModuleImage } =
    useColorContext();

  return (
    <div>
      <div
        className="main glossy"
        style={{
          backgroundColor: color,
          boxShadow: "0 4px 8px rgba(255, 255, 255, 0.5)",
        }}
      >
        <div
          className="board glossy"
          style={{
            width: selectedSize.width,
            height: selectedSize.height,
            backgroundColor: selectedColor,
            backgroundImage: selectedModuleImage
              ? `url(${selectedModuleImage})`
              : "none",
            boxShadow: "0 4px 8px rgba(106, 104, 104, 0.5)",
            border: "2px solid rgba(106, 104, 104, 0.27)",
            position: "relative",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Canvas;
