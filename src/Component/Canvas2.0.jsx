import React, { useEffect } from "react";
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
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Badge from "@mui/material/Badge";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

const Canvas = () => {
  const {
    color,
    selectedSize,
    selectedColor,
    // selectedModuleImage,
    frameclr,
    selectedimage,
    img,
    clearimage,
  } = useColorContext();

  const canvasRef = useRef();
  const [showCollection, setShowCollection] = useState(false);
  const [collectionItems, setCollectionItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [disablebutton, setbuttondisable] = useState(true);
  useEffect(() => {
    const socketSelected = selectedimage.some((light) => light.name === socket);
    const lightsSelected = selectedimage.filter((light) => light.name === bulb);
    const fanselected = selectedimage.filter((light) => light.name === fan);
    setbuttondisable(
      selectedSize.size === undefined ||
        selectedimage.length === 0 ||
        (selectedSize.size === "2" &&
          !socketSelected &&
          fanselected.length === 0 &&
          lightsSelected.length < 6) ||
        (selectedSize.size === "2" &&
          !socketSelected &&
          lightsSelected.length === 0) ||
        (selectedSize.size === "4" &&
          !socketSelected &&
          fanselected.length === 0 &&
          lightsSelected.length === 5) ||
        (selectedSize.size === "4" && lightsSelected.length === 0) ||
        (selectedSize.size === "4" &&
          !socketSelected &&
          lightsSelected.length === 3) ||
        (selectedSize.size === "4" &&
          socketSelected &&
          lightsSelected.length === 2 &&
          lightsSelected.length === 1) ||
        (selectedSize.size === "4" &&
          fanselected.length === 2 &&
          lightsSelected.length < 4) ||
        (selectedSize.size === "4" &&
          socketSelected &&
          lightsSelected.length < 3) ||
        (selectedSize.size === "4" &&
          fanselected.length === 1 &&
          lightsSelected.length < 5) ||
        (selectedSize.size === "6" &&
          !socketSelected &&
          fanselected.length === 0 &&
          lightsSelected.length === 5) ||
        (selectedSize.size === "6" && lightsSelected.length === 0) ||
        (selectedSize.size === "6" &&
          !socketSelected &&
          lightsSelected.length === 3) ||
        (selectedSize.size === "6" &&
          socketSelected &&
          lightsSelected.length === 2 &&
          lightsSelected.length === 1) ||
        (selectedSize.size === "6" &&
          fanselected.length === 2 &&
          lightsSelected.length < 4) ||
        (selectedSize.size === "6" &&
          socketSelected &&
          lightsSelected.length < 3) ||
        (selectedSize.size === "6" &&
          fanselected.length === 1 &&
          lightsSelected.length < 5) ||
        (selectedSize.size === "6" &&
          !socketSelected &&
          lightsSelected.length === 7) ||
        (selectedSize.size === "6" && lightsSelected.length === 9) ||
        (selectedSize.size === "6" &&
          socketSelected &&
          (lightsSelected.length === 4 || lightsSelected.length === 6))
    );
  }, [selectedimage, selectedSize, socket, bulb]);

  const sendfiles = () => {
    // Extract image URLs from the content (replace this with your logic)
    const imageUrls = Array.from(document.querySelectorAll("img")).map(
      (img) => img.src
    );

    // Send image URLs to the backend    using fetch API
    fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageUrls: imageUrls,
        emailAddress: "ap2867045@example.com", // Specify the recipient's email address
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Email sent successfully");
        } else {
          console.error("Failed to send email");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleAddToCollection = () => {
    if (!canvasRef.current) return;

    html2canvas(canvasRef.current).then((canvas) => {
      const imageDataURL = canvas.toDataURL();

      const collectionItem = {
        imageDataURL: imageDataURL,
      };

      setCollectionItems((prevItems) => [...prevItems, collectionItem]);
    });
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleDownloadCollection = () => {
    collectionItems.forEach((item, index) => {
      const blob = dataURLtoBlob(item.imageDataURL);
      saveAs(blob, `collection_item_${index}.png`);
    });
    clearimage();
    console.log(selectedimage); // Call clearimage function with parentheses to invoke it
  };
  const removeFromCollection = (indexToRemove) => {
    setCollectionItems((prevItems) => {
      return prevItems.filter((item, index) => index !== indexToRemove);
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

  const toggleCollectionVisibility = () => {
    setShowCollection((prevVisibility) => !prevVisibility);
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
    const otherimage = filteredImages.filter(
      (light) => light.name !== socketbutton
    );
    if (socketIndexes.length === 1 && otherimage.length > 0) {
      filteredImages.splice(1, 0, { name: socketbutton });
    } else if (socketIndexes.length === 2 && otherimage.length > 0) {
      filteredImages.splice(1, 0, { name: socketbutton });
      filteredImages.splice(5, 0, { name: socketbutton });
    } else if (socketIndexes.length === 3 && otherimage.length > 0) {
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
        secondArray.push(
          firstArray.splice(
            secondArray.findIndex((light) => light.name === bulb),
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
    if (firstFanss.length === 1) {
      // If only one fan is selected, move it to the last but second position
      const fanIndex = firstArray.findIndex((light) => light.name === fan);
      if (fanIndex !== -1 && fanIndex !== firstArray.length - 2) {
        const fanToMove = firstArray.splice(fanIndex, 1)[0];
        firstArray.splice(-1, 0, fanToMove); // Insert the fan at the last but second position
      }
    } else {
      firstArray = firstArray
        .filter((light) => light.name !== fan)
        .concat(firstFanss);
    }

    const secondFans = secondArray.filter((light) => light.name === fan);
    if (secondFans.length === 1) {
      // If only one fan is selected, move it to the last but second position
      const fanIndex = secondArray.findIndex((light) => light.name === fan);
      if (fanIndex !== -1 && fanIndex !== secondArray.length - 2) {
        const fanToMove = secondArray.splice(fanIndex, 1)[0];
        secondArray.splice(-1, 0, fanToMove); // Insert the fan at the last but second position
      }
    } else {
      secondArray = secondArray
        .filter((light) => light.name !== fan)
        .concat(secondFans);
    }

    // if (socketIndexes.length === 1) {
    //   firstArray.splice(1, 0, { name: socketbutton });
    // } else if (socketIndexes.length === 2) {
    //   firstArray.splice(1, 0, { name: socketbutton });
    //   firstArray.splice(5, 0, { name: socketbutton });
    // } else if (socketIndexes.length === 3) {
    //   firstArray.splice(1, 0, { name: socketbutton });
    //   firstArray.splice(5, 0, { name: socketbutton });
    //   firstArray.splice(9, 0, { name: socketbutton });
    // }
    // Calculate otherimage after any potential splicing of filteredImages

    console.log(filteredImages);
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
            {otherimage.length > 0 &&
              socketIndexes.slice(0, 1).map((index) => (
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
            {otherimage.length > 0 &&
              socketIndexes.slice(1, 2).map((index) => (
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
              {otherimage.length > 0 &&
                socketIndexes.slice(2, 4).map((index) => (
                  <div key={index}>
                    <img
                      src={selectedimage[index].name}
                      alt="Socket"
                      style={{ height: "150px" }}
                    />
                  </div>
                ))}

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
          {otherimage.length <= 0 &&
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
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            top: "90vh",
            left: "100vh",
          }}
        >
          <Button
            variant="contained"
            endIcon={<DownloadIcon style={{ height: "15px" }} />}
            style={{
              height: "30px",
              width: "100px",
              position: "relative",
              zIndex: "10",
              userSelect: "none",
              fontSize: "10px",
            }}
            onClick={handleDownload}
            disabled={
              selectedSize === "defaultSize" || selectedimage.length < 1
            }
          >
            Download
          </Button>
          <Tooltip title="Add to collection" arrow>
            <Fab
              size="small"
              color="secondary"
              aria-label="add"
              onClick={handleAddToCollection}
              disabled={disablebutton}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>

        <div className="collection">
          {" "}
          <Badge
            badgeContent={collectionItems.length}
            style={{ userSelect: "none" }}
            color="info"
            onClick={toggleCollectionVisibility}
          >
            <div className="linecontainer">
              {" "}
              <div
                className={showCollection ? "line line1-cross" : "line"}
              ></div>
              <div
                className={showCollection ? "line line2-hide" : "line"}
              ></div>
              <div
                className={showCollection ? "line line3-cross" : "line"}
              ></div>
            </div>
          </Badge>
          <div
            className={`collection-content ${
              showCollection ? "expanded" : "collapsed"
            }`}
          >
            <div className="imagerender">
              {collectionItems.map((item, index) => (
                <div key={index} className="insiderender">
                  <label
                    style={{
                      display: "flex",
                      fontSize: "10px",
                      width: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1} .
                  </label>
                  <img
                    src={item.imageDataURL}
                    alt={`Collection Item ${index}`}
                    style={{
                      height: "70px",
                    }}
                    loading="lazy"
                  />

                  <button
                    onClick={() => removeFromCollection(index)}
                    className="remove"
                  >
                    <Tooltip title="remove">
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>{" "}
                  </button>
                </div>
              ))}
            </div>
            {collectionItems.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginBottom: "10px",
                }}
              >
                <Button
                  style={{ height: "25px", fontSize: "10px" }}
                  onClick={handleDownloadCollection}
                  variant="contained"
                  endIcon={<DownloadIcon style={{ height: "15px" }} />}
                >
                  Download collection
                </Button>
                <Button
                  style={{ height: "25px", fontSize: "10px" }}
                  variant="contained"
                  endIcon={<SendIcon style={{ height: "15px" }} />}
                >
                  Send
                </Button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignContent: "center ",
                  justifyContent: "center",
                }}
              >
                nothing to see here.......
              </div>
            )}
          </div>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          style={{ userSelect: "none" }}
          onClose={handleClose}
          message="Added"
          action={action}
        />
      </div>
    </DndProvider>
  );
};

export default Canvas;

<div className="controls">
  <div>
    {firstarray.length <= 4 && (
      <div className="socketsizw">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "60px",
          }}
        >
          {firstarray.slice(0, 2).map((light, index) => (
            <div key={index}>
              <img src={light} style={{ height: "50px" }} alt="" />
            </div>
          ))}
        </div>
        {firstarray.length > 2 && (
          <img src={constantImage} alt="" style={{ height: "50px" }} />
        )}
        {firstarray.length > 2 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "60px",
            }}
          >
            {firstarray.slice(2, 4).map((light, index) => (
              <div key={index}>
                <img src={light} style={{ height: "50px" }} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </div>
</div>;
