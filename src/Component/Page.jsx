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
  } = useColorContext();

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [module, setModule] = useState({
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

  const handleModuleClick = (modulesize, size, event) => {
    if (event) {
      event.stopPropagation();
    }
    let moduleImageURL = ""; // Set the appropriate image URL based on the module type

    // Set the selected module image in the ColorContext
    setSelectedModuleImage(moduleImageURL);
    setboardsize(modulesize);
    setGlobalModule(module);
    setGlobalSize(size);
  };
  const handlelayoutClick = (moduleType, size, event) => {
    let moduleImageURL = "";

    if (event) {
      event.stopPropagation();
    }
    switch (moduleType) {
      case "box1":
        moduleImageURL = button1;
        break;
      case "box2":
        moduleImageURL = socket;
        break;
      case "box3":
        moduleImageURL = s14l;
        break;
      case "box4":
        moduleImageURL = l4f2;
        break;
      case "box5":
        moduleImageURL = l5f1;
        break;
      case "box6":
        moduleImageURL = l6;
        break;
      case "box7":
        moduleImageURL = l10;
        break;
      case "box8":
        moduleImageURL = button5;
        break;
      case "box9":
        moduleImageURL = l9;
        break;
      case "box10":
        moduleImageURL = s14l;
        break;
      // Add cases for other module types as needed
      default:
        // Set a default image URL or handle unknown types
        moduleImageURL = ""; // Set a default image URL
    }
    setGlobalimage(moduleImageURL);
    setModule((prevModule) => ({
      ...prevModule,
      type: moduleType,
    }));
    // setGlobalModule(module);
    // setGlobalSize(size);
  };
  const handleColorOptionClick = (selectedColor) => {
    setSelectedColor(selectedColor);
  };
  const handleWallClick = () => {
    setSelectedModuleImage(null);

    setback(selectedColor);
  };
  const { setSelectedModuleImage } = useColorContext();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataURL = reader.result;
        setSelectedModuleImage(imageDataURL); // Update selectedModuleImage in ColorContext
      };
      reader.readAsDataURL(file);
    }
  };
  const butfun = () => {
    setSelectedModuleImage(null); // Update selectedModuleImage in ColorContext
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
          Module
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
                            { height: "200px", width: "200px" },
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
                            { height: "200px", width: "400px" },
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
                            { height: "250px", width: "600px" },
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
                            { height: "250px", width: "700px" },
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
                            { height: "450px", width: "700px" },
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
                  <div>
                    <div className="heading">Button custom</div>
                    <div className="module-container">
                      <div
                        className={`module ${
                          module.type === "box1" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box1", event)}
                      >
                        <img src={button1} alt="" style={{ height: "40px" }} />4
                        switches
                      </div>
                      <div
                        className={`module ${
                          module.type === "box2" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box2", event)}
                      >
                        <img src={socket} alt="" style={{ height: "40px" }} />
                        socket
                      </div>
                      <div
                        className={`module ${
                          module.type === "box3" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box3", event)}
                      >
                        <img src={s14l} alt="" style={{ height: "50px" }} />3
                        lights 1 socket
                      </div>
                      <div
                        className={`module ${
                          module.type === "box4" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box4", event)}
                      >
                        <img src={l4f2} alt="" style={{ height: "50px" }} />4
                        switches 2 fan
                      </div>
                      <div
                        className={`module ${
                          module.type === "box5" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box5", event)}
                      >
                        <img src={l5f1} alt="" style={{ height: "50px" }} />5
                        switches 1 fan
                      </div>
                      <div
                        className={`module ${
                          module.type === "box6" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box6", event)}
                      >
                        <img src={l6} alt="" style={{ height: "40px" }} />6
                        lights
                      </div>
                      <div
                        className={`module ${
                          module.type === "box7" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box7", event)}
                      >
                        <img src={l10} alt="" style={{ height: "60px" }} />
                        10 lights
                      </div>
                      <div
                        className={`module ${
                          module.type === "box8" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box8", event)}
                      >
                        <img src={button5} alt="" style={{ height: "60px" }} />8
                        switch 2-fan
                      </div>
                      <div
                        className={`module ${
                          module.type === "box9" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box9", event)}
                      >
                        <img src={l9} alt="" style={{ height: "70px" }} />9
                        switch 1-fan
                      </div>
                      <div
                        className={`module ${
                          module.type === "box10" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box10", event)}
                      >
                        <img src={l9} alt="" style={{ height: "40px" }} />9
                        switch 1-fan
                      </div>
                    </div>
                  </div>
                )}
                {selectedMenu === "color" && (
                  <div>
                    <div
                      className="color"
                      style={{ display: "flex", flexDirection: "column" }}
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
                        }}
                      >
                        {colorOptions.map((option, index) => (
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
                        ))}
                        <input type="file" onChange={handleFileChange} />
                        <button onClick={butfun}>cancle</button>
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
                    width: "100px",
                    height: "100px",
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
