import { useRef, useState } from "react";
import { useColorContext } from "./ColorContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import dimup from "./assets/7.png";
import dimdown from "./assets/8.png";
const socket = "/src/Component/assets/socket.jpg";
const fan = "/src/Component/assets/6.png";
import socketbutton from "./assets/5.png";
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
      const fanselected = selectedimage.some((light) => light.name === fan);

      if (selectedimage.length <= 4) {
        if (!socketSelected) {
          const lightsWithoutSocket = selectedimage.filter(
            (light) => light.name !== socket
          );
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
              {lightsWithoutSocket.length > 2 && (
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
              )}
            </div>
          );
        } else {
          if (selectedSize.size === "2") {
            return (
              <div>
                <img src={socket} alt="" style={{ height: "150px " }} />
              </div>
            );
          } else {
            return renderall();
          }
          // Render all selected items including the socket
        }
      } else {
        // Render all selected items if more than 4
        return renderall();
      }
    }
  };
  const renderall = () => {
    // Find the index of the socket image in the selectedImages array
    const socketIndexes = selectedimage
      .map((light, index) => (light.name === socket ? index : null))
      .filter((index) => index !== null);

    let filteredImages = selectedimage.filter((light) => light.name !== socket);

    // If socket is selected, add the socket button to the beginning of the filteredImages array
    if (socketIndexes.length > 0) {
      filteredImages.splice(1, 0, { name: socketbutton });
    }

    // Find all instances of the fan images in the selectedImages array
    const fanObjects = filteredImages.filter((light) => light.name === fan);

    const fanSelected = fanObjects.length > 0;

    // If fan is selected, remove all instances from the array and add them to the end
    if (fanSelected) {
      filteredImages = filteredImages.filter((light) => light.name !== fan);
      filteredImages.push(...fanObjects);
    }

    return (
      <div className="child-div">
        <div style={{ display: "flex", gap: "30px" }}>
          {socketIndexes.map((index) => (
            <div key={index}>
              <img
                src={selectedimage[index].name}
                alt="Socket"
                style={{ height: "150px" }}
              />
            </div>
          ))}

          <div
            style={{
              display: "flex",
              gap: "20px", // Adjust the gap between sets of images vertically
            }}
          >
            {filteredImages.length > 4 ? (
              filteredImages.length > 10 ? (
                <div className="socketsizw">
                  {filteredImages.slice(0, 10).map((light, index) => (
                    <div key={index} className="subdiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
              ) : (
                filteredImages
                  .reduce((rows, light, index) => {
                    if (index % 2 === 0) rows.push([]);
                    rows[rows.length - 1].push(
                      <div key={index} className="subdiv">
                        <img
                          src={light.name}
                          style={{ height: "50px" }}
                          alt=""
                        />
                      </div>
                    );
                    return rows;
                  }, [])
                  .map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexDirection: "column",
                      }}
                    >
                      {row}
                    </div>
                  ))
              )
            ) : (
              <div className="socketsizw">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "60px",
                  }}
                >
                  {filteredImages.slice(0, 2).map((light, index) => (
                    <div key={index} className="subdiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                {filteredImages.length > 2 && (
                  // Check if there are more than 2 lights without socket
                  <img src={constantImage} alt="" style={{ height: "50px" }} />
                )}
                {filteredImages.length > 2 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "60px",
                    }}
                  >
                    {filteredImages.slice(2, 4).map((light, index) => (
                      <div key={index} className="subdiv">
                        <img
                          src={light.name}
                          style={{ height: "50px" }}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Render fan controls for each fan instance if fan is selected */}
          {fanSelected && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "5px",
                marginLeft: "5px",
              }}
            >
              <img src={dimup} alt="" style={{ height: "45px" }} />
              <img src={dimdown} alt="" style={{ height: "45px" }} />
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexWrap: "unset",
              alignSelf: "flex-end",
            }}
          >
            {filteredImages.length > 4 && (
              <img src={constantImage} alt="" style={{ height: "50px" }} />
            )}
          </div>
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
