import React from "react";
import { useColorContext } from "./ColorContext";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const Canvas = () => {
  const { color, selectedSize, selectedColor, selectedModuleImage } =
    useColorContext();

  const handleResize = (event, { size }) => {
    // Handle resize logic here, if needed
  };

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
            backgroundColor: selectedColor,
            boxShadow: "0 4px 8px rgba(106, 104, 104, 0.5)",
            border: "2px solid rgba(106, 104, 104, 0.27)",
            height: selectedSize.height,
            position: "relative", // Added position relative to create stacking context
          }}
        >
          {selectedModuleImage && (
            <Draggable
              bounds="parent" // Restrict dragging to the parent element (board)
            >
              <Resizable
                width={selectedSize.width}
                height={selectedSize.height}
                onResize={handleResize}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden", // Hide overflow to prevent image from displaying outside
                  }}
                >
                  <img
                    src={selectedModuleImage}
                    alt="Selected Module"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Resizable>
            </Draggable>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
