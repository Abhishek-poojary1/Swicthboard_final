import React, { useRef } from "react";
import { useColorContext } from "./ColorContext";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

const socket = "/src/Component/assets/socket.jpg";

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
    frameclr,
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
    if (selectedSize.size === "2" && selectedLights.length > 0) {
      const socketSelected = selectedLights.some(
        (light) => light.name.trim() === socket.trim()
      );
      const lightsWithoutSocket = selectedLights.filter(
        (light) => light.name.trim() !== socket.trim()
      );

      if (!socketSelected) {
        return (
          <div className="child-div">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "60px" }}
            >
              {lightsWithoutSocket.slice(0, 2).map((light, index) => (
                <div key={index} className="subdiv">
                  <img src={light.name} style={{ height: "50px" }} alt="" />
                </div>
              ))}
            </div>
            <img src={constantImage} alt="" style={{ height: "50px" }} />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "60px" }}
            >
              {lightsWithoutSocket.slice(2, 4).map((light, index) => (
                <div key={index} className="subdiv">
                  <img src={light.name} style={{ height: "50px" }} alt="" />
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        // Render socket image if socket is selected
        return (
          <div className="child-div">
            <img src={socket} alt="Socket" style={{ height: "150px" }} />
          </div>
        );
      }
    } else if (selectedSize.size === "4") {
      return (
        <div className="child-div">
          <div style={{ display: "flex", gap: "20px" }}>
            <div className="butin">
              {selectedLights.slice(0, 2).map((light, index) => (
                <div key={index} className="alldiv">
                  <img src={light.name} style={{ height: "50px" }} alt="" />
                </div>
              ))}
            </div>
            <div className="butin">
              {selectedLights.slice(2, 4).map((light, index) => (
                <div key={index} className="alldiv">
                  <img src={light.name} style={{ height: "50px" }} alt="" />
                </div>
              ))}
            </div>
            <div className="butin">
              {selectedLights.slice(4, 6).map((light, index) => (
                <div key={index} className="alldiv">
                  <img src={light.name} style={{ height: "50px" }} alt="" />
                </div>
              ))}
            </div>

            <div
              className="master"
              style={{
                alignContent: "flex-end",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <img src={constantImage} alt="" style={{ height: "50px" }} />
            </div>
          </div>
        </div>
      );
    }
    // Render lights if socket is not selected or for other scenarios
    return (
      <div className="child-div">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {selectedLights.map((light, index) => (
            <div key={index} className="subdiv">
              <img src={light.name} style={{ height: "50px" }} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
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
              // backgroundImage: `url(${selectedModuleImage})`,
              backgroundSize: "cover", // This will make the image cover the entire background
              backgroundPosition: "center", // This will center the background image
              borderColor: frameclr,
              overflow: "hidden",
              boxShadow: "10px 4px 18px rgba(0, 0, 0, 0.5)",
            }}
            ref={canvasRef}
          >
            {renderChildDivs()}
            <img
              src={selectedModuleImage}
              style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
              alt=""
            />
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
            Send Files
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default Canvas;
