import React from "react";
import Draggable from "react-draggable";
import { useColorContext } from "./ColorContext";

const Canvas = () => {
  const { color, selectedSize, selectedColor, selectedModuleImage, selimage } =
    useColorContext();
  const draggableRef = useRef();

  const getBackgroundSize = () => {
    // Check the selected module type and return the corresponding background size
    switch (selectedModuleImage) {
      case "box1":
        console.log("box1");
        return "20% 30%";
      case "box2":
        return "50% 70%";
      // Add cases for other module types as needed
      default:
        return "cover"; // Set a default background size
    }
  };

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
                  zIndex: 1, // Set a higher z-index to place it above the foreground image
                }}
              ></div>
            </Draggable>
          )}

          {/* Foreground Image */}
          {selimage && (
            <Draggable bounds="parent">
              <div
                className="foreground-image"
                style={{
                  width: "100%", // Set the desired width
                  height: "100%",
                  backgroundSize: "20% 30%", // Set the desired background size
                  backgroundImage: `url(${selimage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0 4px 8px rgba(106, 104, 104, 0.5)",
                  border: "2px solid rgba(106, 104, 104, 0.27)",
                  position: "absolute",
                  // Apply frosted glass effect
                  backdropFilter: "blur(5px)",
                  zIndex: 2, // Set a higher z-index to place it above the background image
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
