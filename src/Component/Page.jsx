import React, { createContext, useContext, useState } from "react";
import button1 from "./assets/2mod.png";
import button2 from "./assets/but6.png";
import button3 from "./assets/transp.png";
import button4 from "./assets/switch7.png";
import button5 from "./assets/2fan.png";
import { SketchPicker } from "react-color";
import { useColorContext } from "./ColorContext";
import Draggable from "react-draggable";

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
  "#a52a2a", // brown
];

const Page = () => {
  const { color, setColor, selectedColor, setSelectedColor, setGlobalSize } =
    useColorContext();

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
    setboardsize(modulesize);
    setGlobalModule(module);
    setGlobalSize(size);
  };
  const handlelayoutClick = (moduleType, size, event) => {
    if (event) {
      event.stopPropagation();
    }
    setModule((prevModule) => ({
      ...prevModule,
      type: moduleType,
    })); // setGlobalModule(module);
    // setGlobalSize(size);
  };

  const handleColorOptionClick = (selectedColor) => {
    setSelectedColor(selectedColor);
  };
  const handleWallClick = () => {
    setSelectedModuleImage(null); // Reset selectedModuleImage when changing color

    setback(selectedColor);
  };
  const { setSelectedModuleImage } = useColorContext(); // Correct function name

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
                          style={{ height: "20px", width: "60px" }}
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
                        <img src={button1} alt="" style={{ height: "60px" }} />4
                        switches
                      </div>
                      <div
                        className={`module ${
                          module.type === "box2" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box2", event)}
                      >
                        <img src={button2} alt="" style={{ height: "50px" }} />5
                        switches 1 fan
                      </div>
                      <div
                        className={`module ${
                          module.type === "box3" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box3", event)}
                      >
                        <img src={button3} alt="" style={{ height: "60px" }} />5
                        switch 2-way
                      </div>
                      <div
                        className={`module ${
                          module.type === "box4" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box4", event)}
                      >
                        <img src={button4} alt="" style={{ height: "60px" }} />9
                        switch 1-fan
                      </div>
                      <div
                        className={`module ${
                          module.type === "box5" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box5", event)}
                      >
                        <img src={button5} alt="" style={{ height: "60px" }} />8
                        switch 2-fan
                      </div>
                      <div
                        className={`module ${
                          module.type === "box6" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box6", event)}
                      >
                        <img src={button3} alt="" style={{ height: "60px" }} />5
                        switch 2-way
                      </div>
                      <div
                        className={`module ${
                          module.type === "box7" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("box7", event)}
                      >
                        <img src={button3} alt="" style={{ height: "60px" }} />5
                        switch 2-way
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
