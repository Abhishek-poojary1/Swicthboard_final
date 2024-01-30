import React, { useRef } from "react";
import { useColorContext } from "./ColorContext";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
const socket = "src/Component/assets/socket.jpg";
const DraggableImage = ({ image }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { image },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="background-image"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    ></div>
  );
};

const Canvas = () => {
  const {
    color,
    selectedSize,
    selectedColor,
    selectedModuleImage,
    selimage,
    frameclr,
    light,
    selectedLights,
  } = useColorContext();
  const canvasRef = useRef();
  const handleDownload = () => {
    if (!canvasRef.current) return;

    html2canvas(canvasRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "canvas.png");
      });
    });
  };

  const constantImage = "src/Component/assets/s3.png";
  const renderChildDivs = () => {
    if (selectedSize.size === "2") {
      if (selimage === socket) {
        // If the selected image is the socket, display only the socket image
        return (
          <div className="child-div">
            <div className="subdiv">
              <img src={selimage} style={{ height: "50px" }} alt="" />
            </div>
          </div>
        );
      } else {
        // If the selected image is not the socket, display lights and possibly the constant image
        return (
          <div className="child-div">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {selectedLights.slice(0, 2).map((light, index) => (
                <div key={index} className="subdiv">
                  <img src={light.name} style={{ height: "50px" }} alt="" />
                </div>
              ))}
            </div>
            {selimage == light && (
              <div className="subdiv">
                <img src={constantImage} style={{ height: "50px" }} alt="" />
                {console.log(constantImage)}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {selectedLights.slice(2, 4).map((light, index) => (
                <div key={index} className="subdiv">
                  <img src={light.name} style={{ height: "50px" }} alt="" />
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
    // Render no child divs for other sizes or when no lights or socket is selected
    return null;
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
              backgroundImage: `url(${selectedModuleImage})`,
              borderColor: frameclr,
              overflow: "hidden",
              boxShadow: "10px 4px 18px rgba(0, 0, 0, 0.5)",
            }}
            ref={canvasRef}
          >
            {selectedModuleImage && (
              <DraggableImage image={selectedModuleImage} />
            )}

            {renderChildDivs()}
          </div>
        </div>
        <div style={{ position: "relative", display: "flex" }}>
          <button
            style={{
              height: "30px",
              width: "80px",
              position: "relative",
              zIndex: "100",
            }}
            onClick={handleDownload}
          >
            Download
          </button>
          <button
            style={{
              height: "30px",
              width: "80px",
              position: "relative",
              zIndex: "100",
            }}
          >
            send files
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default Canvas;
