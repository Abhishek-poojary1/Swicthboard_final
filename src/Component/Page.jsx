import React, { useState } from "react";
import button1 from "./assets/2mod.png";
import button2 from "./assets/but6.png";
import button3 from "./assets/transp.png";
import button4 from "./assets/switch7.png";
const Page = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [module, setModule] = useState(null);

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
    setModule(null);
  };

  const handleModuleClick = (module, event) => {
    event.stopPropagation();
    setModule(module);
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
      {isNavOpen && (
        <div className="nav-container nav-slide-left">
          <div className="nav-content">
            {selectedMenu && (
              <div className={`sizecomb ${isNavOpen ? "nav-open" : ""}`}>
                {selectedMenu === "size" && (
                  <div>
                    <div className="heading">Module</div>
                    <div className="module-container">
                      <div
                        className={`module ${
                          module === "box1" ? "selected" : ""
                        }`}
                        onClick={(event) => handleModuleClick("box1", event)}
                      >
                        <div
                          className="box1"
                          style={{ height: "4px", width: "4px" }}
                        ></div>
                        2
                      </div>
                      <div
                        className={`module ${
                          module === "box2" ? "selected" : ""
                        }`}
                        onClick={(event) => handleModuleClick("box2", event)}
                      >
                        <div
                          className="box1"
                          style={{ height: "10px", width: "30px" }}
                        ></div>
                        4
                      </div>
                      <div
                        className={`module ${
                          module === "box3" ? "selected" : ""
                        }`}
                        onClick={(event) => handleModuleClick("box3", event)}
                      >
                        <div
                          className="box1"
                          style={{ height: "10px", width: "60px" }}
                        ></div>
                        6
                      </div>
                      <div
                        className={`module ${
                          module === "box4" ? "selected" : ""
                        }`}
                        onClick={(event) => handleModuleClick("box4", event)}
                      >
                        <div
                          className="box1"
                          style={{ height: "10px", width: "90px" }}
                        ></div>
                        8
                      </div>
                      <div
                        className={`module ${
                          module === "box5" ? "selected" : ""
                        }`}
                        onClick={(event) => handleModuleClick("box5", event)}
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
                          module === "box1" ? "selected" : ""
                        }`}
                        onClick={(event) => handleModuleClick("box1", event)}
                      >
                        <img src={button1} alt="" style={{ height: "60px" }} />4
                        switces
                      </div>
                      <div
                        className={`module ${
                          module === "box2" ? "selected" : ""
                        }`}
                        onClick={(event) => handleModuleClick("box2", event)}
                      >
                        <img src={button2} alt="" style={{ height: "50px" }} />5
                        swicthes 1 fan
                      </div>
                      <div
                        className={`module ${
                          module === "box3" ? "selected" : ""
                        }`}
                        onClick={(event) => handleModuleClick("box3", event)}
                      >
                        <img src={button3} alt="" style={{ height: "60px" }} />5
                        swicth 2-way
                      </div>
                      <div
                        className={`module ${
                          module === "box4" ? "selected" : ""
                        }`}
                        onClick={(event) => handleModuleClick("box4", event)}
                      >
                        <img src={button4} alt="" style={{ height: "60px" }} />9
                        swicth 1-fan
                      </div>
                      <div
                        className={`module ${
                          module === "box5" ? "selected" : ""
                        }`}
                        onClick={(event) => handleModuleClick("box5", event)}
                      >
                        <img src={button3} alt="" style={{ height: "60px" }} />5
                        swicth 2-way
                      </div>
                      <div
                        className={`module ${
                          module === "box6" ? "selected" : ""
                        }`}
                        onClick={(event) => handleModuleClick("box6", event)}
                      >
                        <img src={button3} alt="" style={{ height: "60px" }} />5
                        swicth 2-way
                      </div>
                      <div
                        className={`module ${
                          module === "box7" ? "selected" : ""
                        }`}
                        onClick={(event) => handleModuleClick("box7", event)}
                      >
                        <img src={button3} alt="" style={{ height: "60px" }} />5
                        swicth 2-way
                      </div>
                    </div>
                  </div>
                )}
                {selectedMenu === "color" && <div>Content for Color</div>}
                {selectedMenu === "wall" && <div>Content for Wall</div>}{" "}
              </div>
            )}
          </div>
          <div className="overlay" onClick={closeNav}></div>
        </div>
      )}
    </>
  );
};

export default Page;
