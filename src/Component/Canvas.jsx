import { useRef, useState } from "react";
import { useColorContext } from "./ColorContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
// import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import dimup from "./assets/7.png";
import dimdown from "./assets/8.png";
const socket = "/src/Component/assets/socket.jpg";
const fan = "/src/Component/assets/6.png";
const bulb = "/src/Component/assets/1.png";
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
  const [collectionItems, setCollectionItems] = useState([]);

  const handleAddToCollection = () => {
    if (!canvasRef.current) return;

    html2canvas(canvasRef.current).then((canvas) => {
      const imageDataURL = canvas.toDataURL();

      const collectionItem = {
        imageDataURL: imageDataURL,
        // You can add more data about the collection item if needed
      };

      setCollectionItems((prevItems) => [...prevItems, collectionItem]);
    });
  };

  const handleDownloadCollection = () => {
    collectionItems.forEach((item, index) => {
      const blob = dataURLtoBlob(item.imageDataURL);
      saveAs(blob, `collection_item_${index}.png`);
    });
  };

  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };
  const handleDownload = () => {
    if (!canvasRef.current) return;
    html2canvas(canvasRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "untitled.png");
      });
    });
  };

  const constantImage = "src/Component/assets/s3.png";
  const renderChildDivs = () => {
    if (selectedimage.length > 0) {
      const socketSelected = selectedimage.some(
        (light) => light.name === socket
      );

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

  // if (
  //   fanSelected &&
  //   selectedSize.size !== "12" &&
  //   filteredImages.length <= 10
  // ) {
  //   // If fan selected and selectedSize is not '12' and total images are less than or equal to 10
  //   filteredImages = filteredImages.filter((light) => light.name !== fan);
  //   filteredImages.push(...fanObjects);
  // }

  const renderall = () => {
    const socketIndexes = selectedimage
      .map((light, index) => (light.name === socket ? index : null))
      .filter((index) => index !== null);

    let filteredImages = selectedimage.filter((light) => light.name !== socket);

    if (socketIndexes.length === 1) {
      filteredImages.splice(1, 0, { name: socketbutton });
    } else if (socketIndexes.length === 2) {
      filteredImages.splice(1, 0, { name: socketbutton });
      filteredImages.splice(5, 0, { name: socketbutton });
    } else if (socketIndexes.length === 3) {
      filteredImages.splice(1, 0, { name: socketbutton });
      filteredImages.splice(5, 0, { name: socketbutton });
      filteredImages.splice(9, 0, { name: socketbutton });
    }

    // First array
    let firstArray = filteredImages.slice(0, 10);

    // Second array
    let secondArray = filteredImages.slice(10, 20);

    // Remove fan objects from firstArray if count is more than 2
    let moveFan = true;
    while (moveFan) {
      moveFan = false; // Assume no more fan objects need to be moved

      // Filter out fan objects from firstArray
      const firstFans = firstArray.filter((light) => light.name === fan);

      // Filter out fan objects from secondArray
      const secondFanCount = secondArray.filter((light) => light.name === fan);

      // Move fan objects from firstArray to secondArray if count is more than 2
      if (firstFans.length > 2) {
        secondArray.push(
          firstArray.splice(
            firstArray.findIndex((light) => light.name === fan),
            1
          )[0]
        );
        moveFan = true; // Set flag to indicate that fan was moved
      }

      // Move fan objects from secondArray to firstArray if count is more than 2
      if (secondFanCount.length > 2) {
        firstArray.push(
          secondArray.splice(
            secondArray.findIndex((light) => light.name === fan),
            1
          )[0]
        );
        moveFan = true; // Set flag to indicate that fan was moved
      }
    }
    while (firstArray.length < 10 && secondArray.length > 0) {
      const bulbIndex = secondArray.findIndex((light) => light.name === bulb);
      if (bulbIndex !== -1) {
        // Check if a bulb is found
        firstArray.push(...secondArray.splice(bulbIndex, 2)); // Push the bulb and its pair
      } else {
        break; // Break the loop if no bulb is found
      }
    }

    // Move all fan objects to the end of each array
    const firstFanss = firstArray.filter((light) => light.name === fan);
    firstArray = firstArray
      .filter((light) => light.name !== fan)
      .concat(firstFanss);

    const secondFans = secondArray.filter((light) => light.name === fan);
    secondArray = secondArray
      .filter((light) => light.name !== fan)
      .concat(secondFans);
    const fanInFirstArray = firstArray.some((light) => light.name === fan);
    const fanInSecondArray = secondArray.some((light) => light.name === fan);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <div className="child-div">
          <div style={{ display: "flex", gap: "30px", marginTop: "60px" }}>
            {selectedSize.size !== "12" &&
              socketIndexes.map((index) => (
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
                gap: "20px",
              }}
            >
              {filteredImages.length <= 4 && (
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
                        <img
                          src={light.name}
                          style={{ height: "50px" }}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                  {filteredImages.length > 2 && (
                    <img
                      src={constantImage}
                      alt=""
                      style={{ height: "50px" }}
                    />
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
              {filteredImages.length > 4 && (
                <div className="socketsizw">
                  {firstArray
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
                    ))}
                </div>
              )}
            </div>
            {fanInFirstArray && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "30px",
                  marginLeft: "5px",
                  alignItems: "center",
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
                ...(socketIndexes.length > 0 &&
                  selectedSize.size !== "12" && { marginBottom: "15px" }), // Add the condition here
              }}
            >
              {filteredImages.length > 4 && (
                <img src={constantImage} alt="" style={{ height: "50px" }} />
              )}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "30px" }}>
          {secondArray.length > 0 && (
            <div
              className="notsocket"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "14px",
              }}
            >
              {secondArray
                .reduce((rows, light, index) => {
                  if (index % 2 === 0) rows.push([]);
                  rows[rows.length - 1].push(
                    <div key={index} className="subdiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
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
                ))}
            </div>
          )}{" "}
          {fanInSecondArray && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "30px",
                marginLeft: "5px",
                alignItems: "center",
              }}
            >
              <img src={dimup} alt="" style={{ height: "45px" }} />
              <img src={dimdown} alt="" style={{ height: "45px" }} />
            </div>
          )}
          {secondArray.length > 0 && (
            <img
              src={constantImage}
              alt=""
              style={{
                display: "flex",
                flexWrap: "unset",
                alignSelf: "flex-end",
                height: "50px",
              }}
            />
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "120%",
          }}
        >
          {selectedSize.size === "12" &&
            socketIndexes.map((index) => (
              <div key={index}>
                <img
                  src={selectedimage[index].name}
                  alt="Socket"
                  style={{ height: "150px" }}
                />
              </div>
            ))}
        </div>
      </div>
    );
  };

  // const ASPECT_RATIO = 1;
  // const MIN_DIMENSION = 150;
  // const [crop, setCrop] = useState();
  // const onImageLoad = (e) => {
  //   const { width, height } = e.currentTarget;
  //   const cropwithinpercent = (MIN_DIMENSION / width) * 100;
  //   const crop = makeAspectCrop(
  //     { unit: "%", width: cropwithinpercent },
  //     ASPECT_RATIO,
  //     width,
  //     height
  //   );
  //   const centeredCrop = centerCrop(crop, width, height);
  //   setCrop(centeredCrop);
  // };

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
              backgroundImage: `url(${img})`, // Set the uploaded image as the background
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderColor: frameclr,
              overflow: "hidden",
              boxShadow: "10px 4px 18px rgba(0, 0, 0, 0.5)",
            }}
            ref={canvasRef}
          >
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
            onClick={handleAddToCollection}
          >
            add to collection
          </button>
        </div>
        <div
          style={{
            display: "flex",
            zIndex: "10",
            position: "relative",
            flexDirection: "column",
          }}
        >
          <h2>Saved Collection</h2>
          {collectionItems.map((item, index) => (
            <div key={index}>
              <img
                src={item.imageDataURL}
                alt={`Collection Item ${index}`}
                style={{ height: "100px" }}
              />
            </div>
          ))}
          {collectionItems.length > 0 && (
            <button onClick={handleDownloadCollection}>
              Download Collection
            </button>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default Canvas;
