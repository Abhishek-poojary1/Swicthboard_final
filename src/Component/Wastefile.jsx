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

                    --------
                    
  const constantImage = "src/Component/assets/s3.png";
  const renderChildDivs = () => {
    if (selectedimage.length > 0) {
      const socketSelected = selectedimage.some(
        (light) => light.name === socket
      );
      const lightsWithoutSocket = selectedimage.filter(
        (light) => light.name !== socket
      );
      if (selectedimage.length <= 4) {
        if (!socketSelected) {
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
            </div>
          );
        } else {
          // Render socket image if socket is selected
          return (
            <div className="child-div">
              <img src={socket} alt="Socket" style={{ height: "50px" }} />
            </div>
          );
        }
      } else if (selectedSize.size === "4") {
        return (
          <div className="child-div">
            <div style={{ display: "flex", gap: "20px" }}>
              <div className="butin">
                {selectedimage.slice(0, 2).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>
              <div className="butin">
                {selectedimage.slice(2, 4).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>
              <div className="butin">
                {selectedimage.slice(4, 6).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>

              <div
                className="master"
                style={{
                  alignContent: "flex-end",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <img src={constantImage} alt="" style={{ height: "50px" }} />
              </div>
            </div>
          </div>
        );
      } else if (selectedSize.size === "6") {
        return (
          <div className="child-div">
            <div style={{ display: "flex", gap: "20px" }}>
              <div className="butin">
                {selectedimage.slice(0, 2).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>
              <div className="butin">
                {selectedimage.slice(2, 4).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>
              <div className="butin">
                {selectedimage.slice(4, 6).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>
              <div className="butin">
                {selectedimage.slice(6, 8).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>
              <div className="butin">
                {selectedimage.slice(8, 10).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>

              <div
                className="master"
                style={{
                  alignContent: "flex-end",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <img src={constantImage} alt="" style={{ height: "50px" }} />
              </div>
            </div>
          </div>
        );
      } else if (selectedSize.size === "8") {
        return (
          <div className="child-div">
            <div style={{ display: "flex", gap: "20px" }}>
              <div className="butin">
                {selectedimage.slice(0, 2).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>
              <div className="butin">
                {selectedimage.slice(2, 4).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>
              <div className="butin">
                {selectedimage.slice(4, 6).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>
              <div className="butin">
                {selectedimage.slice(6, 8).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>
              <div className="butin">
                {selectedimage.slice(8, 10).map((light, index) => (
                  <div key={index} className="alldiv">
                    <img src={light.name} style={{ height: "50px" }} alt="" />
                  </div>
                ))}
              </div>

              <div
                className="master"
                style={{
                  alignContent: "flex-end",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <img src={constantImage} alt="" style={{ height: "50px" }} />
              </div>
            </div>
          </div>
        );
      } else if (selectedSize.size === "12") {
        return (
          <div>
            <div className="child-div">
              <div style={{ display: "flex", gap: "20px" }}>
                <div className="butin">
                  {selectedimage.slice(0, 2).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                <div className="butin">
                  {selectedimage.slice(2, 4).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                <div className="butin">
                  {selectedimage.slice(4, 6).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                <div className="butin">
                  {selectedimage.slice(6, 8).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                <div className="butin">
                  {selectedimage.slice(8, 10).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>

                <div
                  className="master"
                  style={{
                    alignContent: "flex-end",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <img src={constantImage} alt="" style={{ height: "50px" }} />
                </div>
              </div>
            </div>
            <div className="child-div">
              <div style={{ display: "flex", gap: "20px" }}>
                <div className="butin">
                  {selectedimage.slice(10, 12).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                <div className="butin">
                  {selectedimage.slice(12, 14).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                <div className="butin">
                  {selectedimage.slice(14, 16).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                <div className="butin">
                  {selectedimage.slice(16, 18).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>
                <div className="butin">
                  {selectedimage.slice(18, 20).map((light, index) => (
                    <div key={index} className="alldiv">
                      <img src={light.name} style={{ height: "50px" }} alt="" />
                    </div>
                  ))}
                </div>

                <div
                  className="master"
                  style={{
                    alignContent: "flex-end",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <img src={constantImage} alt="" style={{ height: "50px" }} />
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    // Render lights if socket is not selected or for other scenarios
    return (
      <div className="child-div">
        <div style={{ display: "flex", flexDirection: "column" }}>
          {selectedimage.map((light, index) => (
            <div key={index} className="subdiv">
              <img src={light.name} style={{ height: "50px" }} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  };
