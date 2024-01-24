<div className="heading">Button custom</div>
                    <div className="module-container">
                      <div
                        className={`module ${
                          module.type === "module1" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("module1", event)}
                      >
                        <img src={button1} alt="" style={{ height: "40px" }} />4
                        switches
                      </div>
                      <div
                        className={`module ${
                          module.type === "module2" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("module2", event)}
                      >
                        <img src={socket} alt="" style={{ height: "40px" }} />
                        socket
                      </div>
                      <div
                        className={`module ${
                          module.type === "module3" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("module3", event)}
                      >
                        <img src={s14l} alt="" style={{ height: "50px" }} />3
                        lights 1 socket
                      </div>
                      <div
                        className={`module ${
                          module.type === "module4" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("module4", event)}
                      >
                        <img src={l4f2} alt="" style={{ height: "50px" }} />4
                        switches 2 fan
                      </div>
                      <div
                        className={`module ${
                          module.type === "module5" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("module5", event)}
                      >
                        <img src={l5f1} alt="" style={{ height: "50px" }} />5
                        switches 1 fan
                      </div>
                      <div
                        className={`module ${
                          module.type === "module6" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("module6", event)}
                      >
                        <img src={l6} alt="" style={{ height: "40px" }} />6
                        lights
                      </div>
                      <div
                        className={`module ${
                          module.type === "module7" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("module7", event)}
                      >
                        <img src={l10} alt="" style={{ height: "60px" }} />
                        10 lights
                      </div>
                      <div
                        className={`module ${
                          module.type === "module8" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("module8", event)}
                      >
                        <img src={button5} alt="" style={{ height: "60px" }} />8
                        switch 2-fan
                      </div>
                      <div
                        className={`module ${
                          module.type === "module9" ? "selected" : ""
                        }`}
                        onClick={(event) => handlelayoutClick("module9", event)}
                      >
                        <img src={l9} alt="" style={{ height: "70px" }} />9
                        switch 1-fan
                      </div>
                      <div
                        className={`module ${
                          module.type === "module10" ? "selected" : ""
                        }`}
                        onClick={(event) =>
                          handlelayoutClick("module10", event)
                        }
                      >
                        <img src={l9} alt="" style={{ height: "40px" }} />9
                        switch 1-fan
                      </div>
                    </div>