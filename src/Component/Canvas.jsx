import React, { useRef } from "react";
import { useColorContext } from "./ColorContext";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

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
  } = useColorContext();
  const canvasRef = useRef();
  console.log("Selected Module Image:", selectedModuleImage);
  const handleDownload = () => {
    if (!canvasRef.current) return;

    html2canvas(canvasRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "canvas.png");
      });
    });
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

            {selimage && (
              <div
                className="sel"
                style={{ alignContent: "center", justifyContent: "center" }}
              >
                <img src={selimage} alt="" style={{ height: "140px" }} />
              </div>
            )}
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
            send files{" "}
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default Canvas;
