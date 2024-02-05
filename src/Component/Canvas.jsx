import { useRef, useContext, useState } from "react";
import { useColorContext } from "./ColorContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import Imagecrop from "./Imagecrop";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

const socket = "/src/Component/assets/socket.jpg";

// const DraggableImage = ({ image }) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: "IMAGE",
//     item: { image },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       className="background-image"
//       style={{
//         opacity: isDragging ? 0.5 : 1,
//         cursor: "move",
//       }}
//     ></div>
//   );
// };

const Canvas = () => {
  const {
    color,
    selectedSize,
    selectedColor,
    // selectedModuleImage,
    frameclr,
    selectedLights,
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
    if (selectedLights.length > 0) {
      const socketSelected = selectedLights.some(
        (light) => light.name.trim() === socket.trim()
      );
      const lightsWithoutSocket = selectedLights.filter(
        (light) => light.name.trim() !== socket.trim()
      );
      if (selectedLights.length <= 4) {
        if (!socketSelected) {
          return (
            <div className="child-div">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "60px",
                }}
              >
                {lightsWithoutSocket.slice(0, 2).map((light, index) => (
                  <div key={index} className="subdiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>
              {lightsWithoutSocket.length > 2 && ( // Check if there are more than 2 lights without socket
                <img src={constantImage} alt="" style={{ height: "50px" }} />
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "60px",
                }}
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
      } else if (selectedSize.size === "6") {
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
              <div className="butin">
                {selectedLights.slice(6, 8).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>
              <div className="butin">
                {selectedLights.slice(8, 10).map((light, index) => (
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
      } else if (selectedSize.size === "8") {
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
              <div className="butin">
                {selectedLights.slice(6, 8).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>
              <div className="butin">
                {selectedLights.slice(8, 10).map((light, index) => (
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
      } else if (selectedSize.size === "12") {
        return (
          <div>
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
                <div className="butin">
                  {selectedLights.slice(6, 8).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                <div className="butin">
                  {selectedLights.slice(8, 10).map((light, index) => (
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
            <div className="child-div">
              <div style={{ display: "flex", gap: "20px" }}>
                <div className="butin">
                  {selectedLights.slice(10, 12).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                <div className="butin">
                  {selectedLights.slice(12, 14).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                <div className="butin">
                  {selectedLights.slice(14, 16).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                <div className="butin">
                  {selectedLights.slice(16, 18).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                <div className="butin">
                  {selectedLights.slice(18, 20).map((light, index) => (
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
          </div>
        );
      }
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

  const ASPECT_RATIO = 1;
  const MIN_DIMENSION = 150;
  const [crop, setCrop] = useState();
  console.log(img);
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
