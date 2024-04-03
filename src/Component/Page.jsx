import { useEffect, useState } from "react";
// import { useRef } from "react";

import { SketchPicker } from "react-color";
import { useColorContext } from "./ColorContext";
import ImageCropper from "./Imagecrop";
import Jod from "./Jod";
import Input from "./Input";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const colorOptions = [
  "#ff0000", // red
  "#00ff00", // green
  "#0000ff", // blue
  "#ffff00", // yellow
  "#FFFFFF", // magenta
  "#00ffff", // cyan
  "#800080", // purple
  "#ffa500", // orange
  "#008000", // olive
  "#a52a2a",
];

const Page = ({ onCanvasDataChange }) => {
  const {
    color,
    setColor,
    selectedColor,
    setSelectedColor,
    setGlobalSize,
    selectedimage,
    setframecolor,
  } = useColorContext();

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [module, setModule] = useState({
    type: "module1", // Set a default module type
    color: "",
  });
  const [open, setOpen] = useState(true);
  const handleMenuClick = (menu, event) => {
    event.stopPropagation();

    if (selectedMenu === menu) {
      closeNav();
    } else {
      setSelectedMenu(menu);
      setIsNavOpen(true);
    }
  };

  const closeNav = () => {
    setIsNavOpen(false);
    setSelectedMenu(null);
    setModule({ color: "" });
  };
  const { setGlobalModule } = useColorContext();
  const [boardsize, setboardsize] = useState("");
  const supportedModules = {
    box1: ["module1", "module2"],
    box2: ["module1", "module2", "module3"],
    box3: ["module1", "module2", "module3", "module4", "module5", "module6"],
    box4: [
      "module1",
      "module2",
      "module3",
      "module4",
      "module5",
      "module6",
      "module7",
      "module8",
      "module9",
      "module10",
    ],
    box5: [
      "module1",
      "module2",
      "module3",
      "module4",
      "module5",
      "module6",
      "module7",
      "module8",
      "module9",
      "module10",
    ],
  };
  const [errorMessage, setErrorMessage] = useState(null);
  const [canvasData, setCanvasData] = useState(null);

  useEffect(() => {
    if (errorMessage) {
      setOpen(true); // Set open to true when setting a new error message

      const timer = setTimeout(() => {
        setOpen(false); // Set open to false after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Clear the timer on component unmount or when open changes
    }
  }, [errorMessage]); // Dependency on errorMessage
  //
  const handleModuleClick = (modulesize, size, event) => {
    if (event) {
      event.stopPropagation();
    }
    if (
      canvasData &&
      typeof canvasData === "object" &&
      Object.keys(canvasData).length > 0
    ) {
      const { lights, fan, sockets, maxlights } = canvasData;
      const totallenght = lights + fan + sockets;
      if ((totallenght > 4 || sockets == 2) && modulesize === "box1") {
        setErrorMessage(
          "You cannot select size 2 when selected image count is more than 4"
        );
        setOpen(true); // Set open to true when setting a new error message

        return;
      } else if ((totallenght > 6 || sockets == 2) && modulesize === "box2") {
        setErrorMessage(
          "You cannot select size 4 when selected image count is more than 6"
        );
        setOpen(true); // Set open to true when setting a new error message

        return;
      } else if (totallenght > 10 && modulesize === "box3") {
        setErrorMessage(
          "You cannot select size 6 when selected image count is more than 10"
        );
        setOpen(true); // Set open to true when setting a new error message

        return;
      } else if (totallenght > 10 && modulesize === "box4") {
        setErrorMessage(
          "You cannot select size 8 when selected image count is more than 10"
        );
        setOpen(true); // Set open to true when setting a new error message

        return;
      }
    } else {
      console.error("canvasdata is not defined yet");
    }

    // Set a default module type if module.type is undefined
    const moduleType = module.type || "module1";

    if (supportedModules[modulesize].includes(moduleType)) {
      // The module is supported, proceed with the logic

      // Set the selected module image in the ColorContext
      setboardsize(modulesize);
      setGlobalModule({ type: moduleType });
      setGlobalSize(size);
      closeNav();
    } else {
      // The module is not supported for the selected size, you can show a message or handle it accordingly
      alert(`Module ${moduleType} is not supported for size ${modulesize}`);
    }
  };

  const handleColorOptionClick = (selectedColor) => {
    setSelectedColor(selectedColor);
  };
  const handleframecolor = (selectedColor) => {
    setframecolor(selectedColor);
  };

  const handleCreateClick = (lights, fan, sockets, maxlights) => {
    const data = { lights, fan, sockets, maxlights };
    setCanvasData(data);
    onCanvasDataChange(data); // Pass the data to the parent component
  };

  return (
    <>
      {errorMessage && (
        <div className="alert">
          <Collapse in={open}>
            <Alert severity="error" style={{ backgroundColor: "#eb4848" }}>
              <AlertTitle>!!!!!!</AlertTitle>
              {errorMessage}
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </Alert>
          </Collapse>
        </div>
      )}

      <div className={`size ${isNavOpen ? "nav-open" : ""}`}>
        <div
          className={`menu-fixed ${selectedMenu === "size" ? "selected" : ""}`}
          onClick={(event) => handleMenuClick("size", event)}
        >
          Size
        </div>
        <div
          className={`menu-fixed ${
            selectedMenu === "module" ? "selected" : ""
          }`}
          onClick={(event) => handleMenuClick("module", event)}
        >
          controls
        </div>
        <div
          className={`menu-fixed ${selectedMenu === "color" ? "selected" : ""}`}
          onClick={(event) => handleMenuClick("color", event)}
        >
          Color
        </div>
        <div
          className={`menu-fixed ${selectedMenu === "wall" ? "selected" : ""}`}
          onClick={(event) => handleMenuClick("wall", event)}
        >
          Wall
        </div>
      </div>
      <div className={`sizecomb ${isNavOpen ? "open" : ""}`}>
        {isNavOpen && (
          <div className="nav-content">
            {selectedMenu && (
              <div className={`sizecomb ${isNavOpen ? "open" : ""}`}>
                {selectedMenu === "size" && (
                  <div>
                    <div className="head">Module</div>
                    <div className="module-container">
                      <div
                        className={`module ${
                          boardsize === "box1" ? "selected" : ""
                        }`}
                        onClick={(event) =>
                          handleModuleClick(
                            "box1",
                            { height: "250px", width: "250px", size: "2" },
                            event
                          )
                        }
                      >
                        <div
                          className="box1"
                          style={{ height: "4px", width: "4px" }}
                        ></div>
                        2
                      </div>

                      <div
                        className={`module ${
                          boardsize === "box2" ? "selected" : ""
                        }`}
                        onClick={(event) =>
                          handleModuleClick(
                            "box2",
                            { height: "250px", width: "470px", size: "4" },
                            event
                          )
                        }
                      >
                        <div
                          className="box1"
                          style={{ height: "10px", width: "30px" }}
                        ></div>
                        4
                      </div>
                      <div
                        className={`module ${
                          boardsize === "box3" ? "selected" : ""
                        }`}
                        onClick={(event) =>
                          handleModuleClick(
                            "box3",
                            { height: "250px", width: "650px", size: "6" },
                            event
                          )
                        }
                      >
                        <div
                          className="box1"
                          style={{ height: "20px", width: "40px" }}
                        ></div>
                        6
                      </div>
                      <div
                        className={`module ${
                          boardsize === "box4" ? "selected" : ""
                        }`}
                        onClick={(event) =>
                          handleModuleClick(
                            "box4",
                            { height: "250px", width: "800px", size: "8" },
                            event
                          )
                        }
                      >
                        <div
                          className="box1"
                          style={{ height: "10px", width: "90px" }}
                        ></div>
                        8
                      </div>
                      <div
                        className={`module ${
                          boardsize === "box5" ? "selected" : ""
                        }`}
                        onClick={(event) =>
                          handleModuleClick(
                            "box5",
                            { height: "450px", width: "800px", size: "12" },
                            event
                          )
                        }
                      >
                        <div
                          className="box1"
                          style={{ height: "40px", width: "90px" }}
                        ></div>
                        12
                      </div>
                    </div>
                  </div>
                )}
                {selectedMenu === "module" && (
                  <Input onCreateClick={handleCreateClick} />
                )}
                {selectedMenu === "color" && (
                  <div>
                    <div className="head">Color</div>
                    <div
                      className="color"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        gap: "20px",
                      }}
                    >
                      <div
                        className="selected-color"
                        style={{
                          backgroundColor: selectedColor,
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      ></div>
                      <div
                        className="color-options"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          gap: "20px",
                        }}
                      >
                        outersurface color
                        <div className="colorop">
                          {colorOptions.map((option, index) => (
                            <div key={index}>
                              <div
                                className="selected-color"
                                style={{
                                  backgroundColor: selectedColor,
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              ></div>
                              <div
                                key={index}
                                className="color-option"
                                style={{
                                  backgroundColor: option,
                                  width: "20px",
                                  height: "20px",
                                  border:
                                    selectedColor === option
                                      ? "2px solid #000"
                                      : "none",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleColorOptionClick(option)}
                              ></div>
                            </div>
                          ))}
                        </div>
                        outer frame color
                        <div className="colorop">
                          {colorOptions.map((option, index) => (
                            <div key={index}>
                              <div
                                className="selected-color"
                                style={{
                                  backgroundColor: selectedColor,
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              ></div>
                              <div
                                key={index}
                                className="color-option"
                                style={{
                                  backgroundColor: option,
                                  width: "20px",
                                  height: "20px",
                                  border:
                                    setframecolor === option
                                      ? "2px solid #000"
                                      : "none",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleframecolor(option)}
                              ></div>
                            </div>
                          ))}
                        </div>
                        <ImageCropper />
                      </div>
                    </div>
                  </div>
                )}
                {selectedMenu === "wall" && (
                  <>
                    <div className="head"> Wall Color</div>

                    <div className="color">
                      <SketchPicker
                        color={color}
                        disableAlpha
                        enableHSB={false}
                        onChange={handleColorChange}
                      />
                    </div>
                  </>
                )}
                <div
                  className="overlay"
                  style={{
                    width: "100%",
                    height: "40px",
                    background: "aqua",
                    cursor: "pointer",
                    zIndex: "3000",
                  }}
                  onClick={closeNav}
                ></div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
