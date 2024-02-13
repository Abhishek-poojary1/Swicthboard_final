import { useRef, useContext, useState } from "react";
import { useColorContext } from "./ColorContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

const socket = "/src/Component/assets/socket.jpg";

const Canvas = () => {
  const {
    color,
    selectedSize,
    selectedColor,
    // selectedModuleImage,
    frameclr,
    selectedimage,
    img,
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
    if (selectedimage.length > 0) {
      const socketSelected = selectedimage.some(
        (light) => light.name === socket
      );

      // If selected size is 2 and socket is selected, render only socket
      if (selectedSize.size === "2" && socketSelected) {
        return (
          <div className="child-div">
            <img src={socket} alt="Socket" style={{ height: "50px" }} />
          </div>
        );
      } else {
        // Render all selected items for other selected sizes
        let lightsToDisplay = selectedimage.map((light, index) => (
          <div key={index} className="subdiv" style={{ marginRight: "10px" }}>
            <img src={light.name} style={{ height: "50px" }} alt="" />
          </div>
        ));

        // If selected lights are less than 4, place the constant image in the middle
        if (selectedimage.length < 4) {
          const constantImage = (
            <div
              key="constant"
              className="subdiv"
              style={{ marginRight: "10px" }}
            >
              <img
                src="src/Component/assets/s3.png"
                style={{ height: "50px" }}
                alt=""
              />
            </div>
          );
          // Calculate the position to insert the constant image
          const insertPosition = Math.ceil(lightsToDisplay.length / 2);
          // Insert the constant image separately
          lightsToDisplay.splice(insertPosition, 0, constantImage);
        }

        // Render lights in sets of 2
        const rows = [];
        for (let i = 0; i < lightsToDisplay.length; i += 2) {
          rows.push(
            <div
              key={i}
              style={{
                display: "flex",
                marginBottom: "10px",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              {lightsToDisplay.slice(i, i + 2)}
            </div>
          );
        }

        // Render the constant image in a separate div
        const constantImageDiv = (
          <div key="constant-div" className="constant-div">
            {lightsToDisplay.find((element) => element.key === "constant")}
          </div>
        );

        return (
          <div className="child-div">
            {constantImageDiv}
            {rows}
          </div>
        );
      }
    }
    // Render lights if no controls are selected
    return (
      <div className="child-div">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {selectedimage.map((light, index) => (
            <div
              key={index}
              className="subdiv"
              style={{ marginBottom: "10px" }}
            >
              <img src={light.name} style={{ height: "50px" }} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 150;
  const [crop, setCrop] = useState();
  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropwithinpercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      { unit: "%", width: cropwithinpercent },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div
          className="main glossy"
          style={{
            backgroundColor: color,
            display: "flex",
            flexDirection: "column",
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

            {img && ( // Add a check for 'crop' state
              <div className="center-container">
                <ReactCrop
                  crop={crop}
                  onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                  keepSelection
                  aspect={ASPECT_RATIO}
                  minWidth={MIN_DIMENSION}
                >
                  <img
                    src={img}
                    alt="upload"
                    onLoad={onImageLoad}
                    className="center-image"
                  />
                  {console.log("kkff")}
                </ReactCrop>
              </div>
            )}
          </div>
          {img && <button>crop</button>}
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
