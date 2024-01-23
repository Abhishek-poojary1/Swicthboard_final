import React from "react";
import Draggable from "react-draggable";
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
        }}
      >
        <div
          className="board glossy"
          style={{
            width: selectedSize.width,
            height: selectedSize.height,
            position: "relative",
            backgroundColor: selectedColor,
            overflow: "hidden",
            boxShadow: "10px 4px 18px rgba(0, 0, 0, 0.5)",
          }}
        >
          {selectedModuleImage && (
            <Draggable bounds="parent">
              <div
                className="background-image"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${selectedModuleImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0 4px 8px rgba(106, 104, 104, 0.5)",
                  border: "2px solid rgba(106, 104, 104, 0.27)",
                  position: "absolute",
                  // Apply frosted glass effect
                  backdropFilter: "blur(5px)",
                }}
              ></div>
            </Draggable>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
