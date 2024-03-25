import React from "react";
import { useRef, useState } from "react";
import { useColorContext } from "./ColorContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
// import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import dimup from "./assets/7.png";
import dimdown from "./assets/8.png";
const socketcontrol = "/src/Component/assets/socket.jpg";
const fanbutton = "/src/Component/assets/6.png";
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
import nullbutton from "./assets/none.png";
const Canvas = ({ canvasData }) => {
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
  const [showCollection, setShowCollection] = useState(false); // State variable to track the visibility of the collection
  const [collectionItems, setCollectionItems] = useState([]);
  const [open, setOpen] = React.useState(false);

  const sendfiles = () => {
    // Extract image URLs from the content (replace this with your logic)
    const imageUrls = Array.from(document.querySelectorAll("img")).map(
      (img) => img.src
    );

    // Send image URLs to the backend service using fetch API
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
    if (!canvasData) {
      return null; // If canvasData is null, return null
    }

    const { lights, fan, sockets, maxlights } = canvasData;
    if (selectedSize.size !== "12") {
      const lightsArray = Array.from(
        { length: lights },
        (_, index) => `${bulb}`
      );
      const fanArray = Array.from(
        { length: fan },
        (_, index) => `${fanbutton}`
      );
      const firstaray = [...lightsArray, ...fanArray];
      const socketsArray = Array.from(
        { length: sockets },
        (_, index) => `${socketcontrol}`
      ); // Concatenate arrays of controls
      console.log(firstaray);
      console.log(socketsArray);
      let remainingSpaces = 0;
      if (
        firstaray.length + socketsArray.length > 4 &&
        firstaray.length + socketsArray.length < 6
      ) {
        remainingSpaces = 6 - (firstaray.length + socketsArray.length);
      } else if (
        firstaray.length + socketsArray.length > 6 &&
        firstaray.length + socketsArray.length < 10
      ) {
        remainingSpaces = 10 - (firstaray.length + socketsArray.length);
      }

      const remaining = Array.from(
        { length: remainingSpaces },
        (_, index) => `${nullbutton}`
      );

      const allControls = [...lightsArray, ...remaining, ...fanArray];
      const firstFanss = allControls.filter((light) => light === fanbutton);
      if (firstFanss.length === 1) {
        // If only one fan is selected, move it to the last but second position
        const fanIndex = allControls.findIndex((light) => light === fanbutton);
        if (fanIndex !== -1 && fanIndex !== allControls.length - 2) {
          const fanToMove = allControls.splice(fanIndex, 1)[0];
          allControls.splice(-1, 0, fanToMove); // Insert the fan at the last but second position
        }
      }
      if (socketsArray.length === 1 && lightsArray.length > 0) {
        allControls.splice(1, 0, socketbutton);
      } else if (socketsArray.length === 2 && lightsArray.length > 0) {
        allControls.splice(1, 0, socketbutton);
        allControls.splice(5, 0, socketbutton);
      }
      return (
        <>
          {selectedSize.size !== "12" && (
            <div className="childdiv">
              <div
                style={{
                  display: "flex",
                  gap: "30px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {socketsArray.length > 0 &&
                  socketsArray.length < 3 &&
                  socketsArray.slice(0, 1).map((index) => (
                    <div key={index}>
                      <img
                        src={socketcontrol}
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
                  {allControls.length <= 4 && (
                    <div className="socketsizw">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "60px",
                        }}
                      >
                        {allControls.slice(0, 2).map((light, index) => (
                          <div key={index} className="subdiv">
                            <img
                              src={light}
                              style={{ height: "50px" }}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                      {allControls.length > 2 && (
                        <img
                          src={constantImage}
                          alt=""
                          style={{ height: "50px" }}
                        />
                      )}
                      {allControls.length > 2 && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "60px",
                          }}
                        >
                          {allControls.slice(2, 4).map((light, index) => (
                            <div key={index} className="subdiv">
                              <img
                                src={light}
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

                {allControls.length > 4 && (
                  <div className="socketsizw">
                    {allControls
                      .reduce((rows, light, index) => {
                        if (index % 2 === 0) rows.push([]);
                        rows[rows.length - 1].push(
                          <div key={index} className="subdiv">
                            <img
                              src={light}
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
                    {fanArray.length > 0 && (
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
                    {allControls.length > 0 && (
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
                )}
                {socketsArray.length === 2 &&
                  socketsArray.slice(1, 2).map((index) => (
                    <div key={index}>
                      <img
                        src={socketcontrol}
                        alt="Socket"
                        style={{ height: "150px" }}
                      />
                    </div>
                  ))}
                {socketsArray.length > 2 &&
                  socketsArray.map((index) => (
                    <div key={index}>
                      <img
                        src={socketcontrol}
                        alt="Socket"
                        style={{ height: "150px" }}
                      />
                    </div>
                  ))}
              </div>{" "}
            </div>
          )}
        </>
      );
    } else {
      let lightsArray = Array.from({ length: lights }, (_, index) => bulb);
      const socketarray = Array.from(
        { length: sockets },
        (_, index) => `${socketcontrol}`
      );
      const fanArray = Array.from({ length: fan }, (_, index) => fanbutton);
      let temp = [...lightsArray, ...fanArray];
      let remainingSpaces = 0;
      if (
        temp.length + socketarray.length > 4 &&
        temp.length + socketarray.length < 6
      ) {
        remainingSpaces = 6 - (temp.length + socketarray.length);
      } else if (
        temp.length + socketarray.length > 6 &&
        temp.length + socketarray.length < 10
      ) {
        remainingSpaces = 10 - (temp.length + socketarray.length);
      } else if (
        temp.length + socketarray.length > 10 &&
        temp.length + socketarray.length < 14
      ) {
        remainingSpaces = 14 - (temp.length + socketarray.length);
      } else if (
        temp.length + socketarray.length > 14 &&
        temp.length + socketarray.length < 16
      ) {
        remainingSpaces = 16 - (temp.length + socketarray.length);
      } else if (
        temp.length + socketarray.length > 16 &&
        temp.length + socketarray.length < 20
      ) {
        remainingSpaces = 20 - (temp.length + socketarray.length);
      }
      const remaining = Array.from(
        { length: remainingSpaces },
        (_, index) => `${nullbutton}`
      );
      temp = [...lightsArray, ...remaining, ...fanArray];
      let firstarray = [];
      let secondarray = [];

      if (temp.length > 10) {
        firstarray = temp.slice(0, 10);
        secondarray = temp.slice(10);
      } else {
        firstarray = [...temp];
      }

      // Remove bulb element from firstarray and add it to secondarray if firstarray.length > 10
      if (firstarray.length > 10) {
        const bulbIndex = firstarray.findIndex((item) => item === bulb);
        if (bulbIndex !== -1) {
          secondarray.push(firstarray.splice(bulbIndex, 1)[0]);
        }
      }

      // Move fan objects from firstArray to secondArray if count is more than 2
      while (firstarray.filter((item) => item === fanbutton).length > 2) {
        const fanToMoveIndex = firstarray.findIndex(
          (item) => item === fanbutton
        );
        const fanToMove = firstarray.splice(fanToMoveIndex, 1)[0];
        secondarray.push(fanToMove);
      }

      // Move fan objects from secondArray to firstArray if count is more than 2
      while (secondarray.filter((item) => item === fanbutton).length > 2) {
        const fanToMoveIndex = secondarray.findIndex(
          (item) => item === fanbutton
        );
        const fanToMove = secondarray.splice(fanToMoveIndex, 1)[0];
        firstarray.push(fanToMove);
      }
      while (firstarray.length > 10) {
        const bulbIndex = firstarray.findIndex((item) => item !== fanbutton);
        if (bulbIndex !== -1) {
          secondarray.push(firstarray.splice(bulbIndex, 1)[0]);
        } else {
          secondarray.push(firstarray.pop());
        }
      }

      const fantomove = secondarray.filter((item) => item === fanbutton);

      if (fantomove.length === 1) {
        // If there's only one fan to move
        const fanindex = secondarray.findIndex((item) => item === fanbutton);
        const movedelement = secondarray.splice(fanindex, 1)[0];
        const secondtolast = secondarray.length - 1;
        secondarray.splice(secondtolast, 0, movedelement);
      } else {
        // If there are multiple fans to move
        fantomove.forEach(() => {
          const fantomoveindex = secondarray.findIndex(
            (item) => item === fanbutton
          );
          if (fantomoveindex !== -1) {
            const movedelement = secondarray.splice(fantomoveindex, 1)[0];
            secondarray.push(movedelement); // Move each fan to the end of the array
          }
        });
      }

      if (socketarray.length === 1 && firstarray.length > 0) {
        firstarray.splice(1, 0, socketbutton);
      } else if (socketarray.length === 2 && firstarray.length > 0) {
        firstarray.splice(5, 0, socketbutton);
        firstarray.splice(1, 0, socketbutton);
      } else if (socketarray.length === 3 && firstarray.length > 0) {
        firstarray.splice(1, 0, socketbutton);
        firstarray.splice(5, 0, socketbutton);
        firstarray.splice(9, 0, socketbutton);
      }

      const fanfirst = firstarray.filter((index) => index === fanbutton);
      const fansecond = secondarray.filter((index) => index === fanbutton);

      return (
        <>
          <div className="twelft">
            <div className="firstseg">
              {socketarray.length > 0 && socketarray.length < 3 && (
                <div className="socket">
                  {socketarray.slice(0, 1).map((con, index) => (
                    <div key={index}>
                      <img
                        src={socketcontrol}
                        alt=""
                        style={{ height: "150px" }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {firstarray.length > 0 && firstarray.length <= 4 && (
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
                    <img
                      src={constantImage}
                      style={{ height: "50px" }}
                      alt=""
                    />
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
              {firstarray.length > 4 && (
                <div className="scoketsizw">
                  {firstarray
                    .reduce((rows, light, index) => {
                      if (index % 2 === 0) rows.push([]);
                      rows[rows.length - 1].push(
                        <div key={index} className="subdiv">
                          <img src={light} style={{ height: "50px" }} alt="" />
                        </div>
                      );
                      return rows;
                    }, [])
                    .map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        style={{
                          display: "flex",
                          gap: "30px",
                          flexDirection: "column",
                        }}
                      >
                        {row}
                      </div>
                    ))}
                  {fanfirst.length > 0 && (
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
                  {firstarray.length > 0 && (
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
              )}
              {socketarray.length === 2 &&
                socketarray.slice(1, 2).map((index) => (
                  <div key={index}>
                    <img
                      src={socketcontrol}
                      alt="Socket"
                      style={{ height: "150px" }}
                    />
                  </div>
                ))}
            </div>
            {secondarray.length > 0 && (
              <div className="secondseg">
                {socketarray.length > 2 && socketarray.length === 3 && (
                  <div className="socket">
                    {socketarray.slice(2, 3).map((con, index) => (
                      <div key={index}>
                        <img
                          src={socketcontrol}
                          alt=""
                          style={{ height: "150px" }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {secondarray.length > 0 && secondarray.length <= 4 && (
                  <div className="socketsizw">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "60px",
                      }}
                    >
                      {secondarray.slice(0, 2).map((light, index) => (
                        <div key={index}>
                          <img src={light} style={{ height: "50px" }} alt="" />
                        </div>
                      ))}
                    </div>
                    {secondarray.length > 2 && (
                      <img
                        src={constantImage}
                        style={{ height: "50px" }}
                        alt=""
                      />
                    )}
                    {secondarray.length > 2 && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "60px",
                        }}
                      >
                        {secondarray.slice(2, 4).map((light, index) => (
                          <div key={index}>
                            <img
                              src={light}
                              style={{ height: "50px" }}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {secondarray.length > 4 && (
                  <div className="scoketsizw">
                    {secondarray
                      .reduce((rows, light, index) => {
                        if (index % 2 === 0) rows.push([]);
                        rows[rows.length - 1].push(
                          <div key={index} className="subdiv">
                            <img
                              src={light}
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
                            gap: "30px",
                            flexDirection: "column",
                          }}
                        >
                          {row}
                        </div>
                      ))}
                    {fansecond.length > 0 && (
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
                    {secondarray.length > 0 && (
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
                )}
                {socketarray.length === 4 &&
                  socketarray.slice(3, 4).map((index) => (
                    <div key={index}>
                      <img
                        src={socketcontrol}
                        alt="Socket"
                        style={{ height: "150px" }}
                      />
                    </div>
                  ))}
              </div>
            )}
            {socketarray.length >= 3 && (
              <div className="maxsocket">
                {socketarray.map((coontrol, index) => (
                  <div key={index}>
                    {" "}
                    <img
                      src={socketcontrol}
                      alt="Socket"
                      style={{ height: "150px" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      );
    }
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
            <>
              <Fab
                size="small"
                color="secondary"
                aria-label="add"
                onClick={handleAddToCollection}
                // disabled={disablebutton}
              >
                <AddIcon />
              </Fab>
            </>
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
