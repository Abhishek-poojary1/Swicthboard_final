import React, { useState, useEffect } from "react";

const Page = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

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
  };

  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     const isSizeComb = event.target.closest(".sizecomb");

  //     if (isNavOpen && !isSizeComb) {
  //       closeNav();
  //     }
  //   };

  //   document.addEventListener("click", handleOutsideClick);

  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, [isNavOpen]);
  const [module, setmodule] = useState(null);
  const handlemenuclick = (module, event) => {
    event.stopPropagation();
    setmodule(module);
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
                    <div>
                      <div
                        className={`module ${
                          module === "box1" ? "selected" : ""
                        }`}
                        onClick={(event) => handlemenuclick("box1", event)}
                      >
                        <div className="box1"></div>1 module
                      </div>
                      <div
                        className={`module ${
                          module === "box2" ? "selected" : ""
                        }`}
                        onClick={(event) => handlemenuclick("box2", event)}
                      >
                        <div style={{ display: "flex" }}>
                          <div
                            className="box1"
                            style={{ borderRight: "2px solid #ededed" }}
                          ></div>
                          <div className="box1"></div>
                        </div>
                        2 module
                      </div>
                      <div
                        className={`module ${
                          module === "box3" ? "selected" : ""
                        }`}
                        onClick={(event) => handlemenuclick("box3", event)}
                      >
                        <div style={{ display: "flex" }}>
                          <div
                            className="box1"
                            style={{ height: "10px" }}
                          ></div>
                          <div className="box1"></div>
                          <div className="box1"></div>
                        </div>
                        3 module
                      </div>
                    </div>
                  </div>
                )}
                {selectedMenu === "module" && <div>Content for Module</div>}
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
