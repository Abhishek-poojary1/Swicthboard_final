import React, { createContext, useContext, useState } from "react";
import button1 from "./assets/2m4l.png";
import button5 from "./assets/2fan.png";
import socket from "./assets/socket.jpg";
import s14l from "./assets/4l+1s.png";
import l4f2 from "./assets/4l+2f.png";
import l5f1 from "./assets/5l+1f.png";
import l6 from "./assets/4m6l.png";
import l9 from "./assets/l9+1f.png";
import l10 from "./assets/l10.png";
import { SketchPicker } from "react-color";
import { useColorContext } from "./ColorContext";
import Controls from "./Controls";

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

const Page = () => {
  const {
    color,
    setColor,
    selectedColor,
    setSelectedColor,
    setGlobalSize,
    setGlobalimage,
    setSelectedModuleImage,
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

  const handleModuleClick = (modulesize, size, event) => {
    if (event) {
      event.stopPropagation();
    }

    // Set a default module type if module.type is undefined
    const moduleType = module.type || "module1";

    if (supportedModules[modulesize].includes(moduleType)) {
      // The module is supported, proceed with the logic
      let moduleImageURL = ""; // Set the appropriate image URL based on the module type

      // Set the selected module image in the ColorContext
      setboardsize(modulesize);
      setGlobalModule({ type: moduleType });
      setGlobalSize(size);
    } else {
      // The module is not supported for the selected size, you can show a message or handle it accordingly
      alert(`Module ${moduleType} is not supported for size ${modulesize}`);
    }
  };

  const handlelayoutClick = (moduleType, size, event) => {
    let moduleImageURL = "";

    if (event) {
      event.stopPropagation();
    }
    switch (moduleType) {
      case "module1":
        moduleImageURL = button1;
        break;
      case "module2":
        moduleImageURL = socket;
        break;
      case "module3":
        moduleImageURL = s14l;
        break;
      case "module4":
        moduleImageURL = l4f2;
        break;
      case "module5":
        moduleImageURL = l5f1;
        break;
      case "module6":
        moduleImageURL = l6;
        break;
      case "module7":
        moduleImageURL = l10;
        break;
      case "module8":
        moduleImageURL = button5;
        break;
      case "module9":
        moduleImageURL = l9;
        break;
      case "module10":
        moduleImageURL = s14l;
        break;
      default:
        // Set a default image URL or handle unknown types
        moduleImageURL = ""; // Set a default image URL
    }
    setGlobalimage(moduleImageURL);

    // Use the latest module type from the state
    setModule((prevModule) => ({
      ...prevModule,
      type: moduleType,
    }));

    // Set the selected module image in the ColorContext
    setSelectedModuleImage(moduleImageURL);

    // setGlobalModule({ type: moduleType });
    // setGlobalSize(size);
  };

  const handleColorOptionClick = (selectedColor) => {
    setSelectedColor(selectedColor);
  };
  const handleframecolor = (selectedColor) => {
    setframecolor(selectedColor);
  };

  const { setGlobalmoduleimage } = useColorContext();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataURL = reader.result;
        setGlobalmoduleimage(imageDataURL); // Update selectedModuleImage in ColorContext
      };
      reader.readAsDataURL(file);
    }
  };
  const butfun = () => {
    setGlobalmoduleimage(null); // Update selectedModuleImage in ColorContext
  };

  return (
    <>
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
                    <div className="heading">Module</div>
                    <div className="module-container">
                      <div
                        className={`module ${
                          boardsize === "box1" ? "selected" : ""
                        }`}
                        onClick={(event) =>
                          handleModuleClick(
                            "box1",
                            { height: "200px", width: "200px", size: "2" },
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
                            { height: "200px", width: "400px", size: "4" },
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
                            { height: "250px", width: "600px", size: "6" },
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
                            { height: "250px", width: "700px", size: "8" },
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
                            { height: "450px", width: "700px", size: "12" },
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
                {selectedMenu === "module" && <Controls />}
                {selectedMenu === "color" && (
                  <div>
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
                            <div>
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
                            <div>
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
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={butfun}>cancel</button>
                      </div>
                    </div>
                  </div>
                )}
                {selectedMenu === "wall" && (
                  <div>
                    <div className="color">
                      <SketchPicker
                        color={color}
                        disableAlpha
                        onChange={handleColorChange}
                      />
                    </div>
                  </div>
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
