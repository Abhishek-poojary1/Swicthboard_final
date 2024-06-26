import React, { useCallback, useContext, useEffect, useState } from "react";
import { useColorContext } from "./ColorContext";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import Tooltip from "@mui/material/Tooltip";
import { light } from "@mui/material/styles/createPalette";

const Input = ({ onCreateClick }) => {
  const { selectedSize } = useColorContext();
  const [lights, setLights] = useState(
    parseInt(localStorage.getItem("lightsCount")) || 0
  );
  const [fan, setFan] = useState(
    parseInt(localStorage.getItem("fanCount")) || 0
  );
  const [sockets, setSockets] = useState(
    parseInt(localStorage.getItem("socketCount")) || 0
  );
  const [maxfan, setmaxfan] = useState(0);
  const [maxlights, setmaxlights] = useState(0);
  const [maxsocket, setmaxsocket] = useState(0);

  useEffect(() => {
    localStorage.setItem("lightsCount", lights);
    localStorage.setItem("fanCount", fan);
    localStorage.setItem("socketCount", sockets);
  }, [lights, fan, sockets]);

  const handlesizetwo = useCallback(
    (lights, sockets) => {
      if (selectedSize.size === "2" && lights > 0) {
        setmaxsocket(0);
      } else if (selectedSize.size === "2" && sockets > 0) {
        setmaxlights(0);
      }
    },
    [selectedSize.size]
  );
  const handlesizefour = useCallback(
    (lights, fan, sockets) => {
      if (lights > 1) {
        setmaxsocket(0);
      }
      if (selectedSize.size === "4" && sockets > 0) {
        setmaxfan(0);
        setmaxlights(0);
      } else if (fan === 1 && lights === 5) {
        setmaxlights(0);
        setmaxsocket(0);
        setmaxfan(0);
      } else if (lights === 5) {
        setmaxfan(1);
        setmaxsocket(0);
      } else if (fan === 1) {
        setmaxlights(5);
        setmaxsocket(0);
      } else if (lights < 5 && sockets === 0) {
        setmaxfan(2);
      } else if (lights < 6 && sockets === 0) {
        setmaxfan(1);
      } else if (lights === 6) {
        setmaxfan(0);
        setmaxsocket(0);
      }
      if (fan === 2) {
        setmaxlights(4);
        setmaxsocket(0);
      }
    },
    [selectedSize.size]
  );
  const handlesixsize = useCallback(
    (lights, sockets, fan) => {
      if (selectedSize.size === "6" && lights > 2) {
        setmaxsocket(1);
      }
      if (sockets === 2) {
        setmaxfan(0);
        setmaxlights(0);
      }
      if (lights === 10) {
        setmaxfan(0);
        setmaxsocket(0);
      } else if (lights !== 0 && lights < 4 && fan === 2) {
        setmaxlights(8);
        setmaxsocket(1);
      } else if (selectedSize.size === "6" && lights === 9) {
        setmaxfan(1);
        setmaxsocket(0);
      } else if (selectedSize.size === "6" && lights === 8) {
        setmaxsocket(0);
        setmaxfan(2);
      } else if (sockets === 1 && lights === 0 && fan === 0) {
        setmaxlights(4);
        setmaxfan(2);
      } else if (sockets === 1 && fan === 2) {
        setmaxlights(2);
      } else if (sockets === 1 && lights === 7) {
        setmaxfan(0);
      }
      if (lights === 4 && sockets === 1) {
        setmaxlights(4);
        setmaxfan(0);
      }
      if (sockets === 1) {
        setmaxlights(5);
        setmaxfan(0);
      }
      if (fan === 2) {
        setmaxlights(8);
        setmaxsocket(0);
      }
      if (fan === 1) {
        setmaxlights(9);
        setmaxsocket(0);
      }
      if (sockets === 2) {
        setmaxlights(0);
        setmaxfan(0);
      }
    },
    [selectedSize.size]
  );

  const handleeightcontrol = useCallback((light, sockets, fan) => {
    if (sockets === 3) {
      setmaxlights(0);
      setmaxfan(0);
    }
    if (lights === 10) {
      setmaxfan(0);
      setmaxlights(0);
      setmaxsocket(0);
    } else if (lights > 0) {
      setmaxsocket(2);
    }
    if (sockets === 2 && lights === 4) {
      setmaxlights(4);
      setmaxfan(2);
    } else if (sockets === 2 && fan === 1) {
      setmaxlights(1);
      setmaxfan(1);
    }
    if (fan === 2) {
      setmaxlights(8);
      setmaxsocket(1);
    } else if (fan === 1) {
      setmaxlights(9);
    }
    if (sockets === 2) {
      setmaxfan(0);
      setmaxlights(4);
    }
    if (fan == 2 && sockets === 1) {
      setmaxlights(7);
    }
    if (fan == 1 && sockets === 1) {
      setmaxlights(6);
    }
    if (sockets === 1 && lights === 5) {
      setmaxfan(1);
    }
    if (sockets === 1 && lights === 6 && fan === 1) {
      setmaxfan(0);
      setmaxlights(0);
      setmaxsocket(0);
    }
    if (lights >= 6) {
      setmaxsocket(0);
    }
    if (sockets === 1 && lights === 6) {
      setmaxfan(1);
    }
    if (sockets === 1 && fan === 0) {
      setmaxlights(9);
    } else if (sockets === 1 && fan === 1) {
      setmaxlights(6);
    }
    if (sockets === 1 && lights > 6) {
      setmaxfan(0);
    }
  });
  const handletwevecontrol = useCallback((lights, sockets, fan) => {
    if (lights > 0) {
      setmaxsocket(3);
    }
    if (lights === 20) {
      setmaxfan(0);
      setmaxsocket(0);
    }
    if (lights <= 16) {
      setmaxfan(4);
    } else if (lights === 17) {
      setmaxsocket(1);
      setmaxfan(3);
    } else if (lights === 18) {
      setmaxsocket(1);
      setmaxfan(2);
    } else if (lights === 19) {
      setmaxsocket(1);
      setmaxfan(1);
    }
    if (sockets === 1) {
      setmaxlights(17);
    }
    if (sockets === 2) {
      setmaxlights(14);
    }
    if (fan === 1) {
      setmaxlights(19);
    } else if (fan === 2) {
      setmaxlights(18);
    } else if (fan === 3) {
      setmaxlights(17);
    } else if (fan === 4) {
      setmaxlights(16);
    }
    if (sockets === 6) {
      setmaxlights(0);
      setmaxfan(0);
    }
    if (lights > 10) {
      setmaxsocket(2);
    }
    if (lights > 17) {
      setmaxsocket(0);
    }
    if (lights === 14 && sockets === 2) {
      setmaxlights(14);
      setmaxfan(0);
    } else if (lights === 14) {
      setmaxsocket(2);
    }
    if (lights === 12 && fan === 2) {
      setmaxsocket(2);
      setmaxfan(2);
    }
    if (sockets > 4) {
      setmaxfan(0);
    } else if (sockets > 2) {
      setmaxfan(2);
    }
  });
  useEffect(() => {
    switch (selectedSize.size) {
      case "2":
        setmaxlights(4);
        setmaxsocket(1);
        setmaxfan(0);
        handlesizetwo(lights, sockets);
        break;
      case "4":
        setmaxlights(6);
        setmaxsocket(1);
        setmaxfan(2);
        handlesizefour(lights, fan, sockets);
        break;
      case "6":
        setmaxlights(10);
        setmaxsocket(2);
        setmaxfan(2);
        handlesixsize(lights, sockets, fan);
        break;

      case "8":
        setmaxlights(10);
        setmaxsocket(3);
        setmaxfan(2);
        handleeightcontrol(lights, sockets, fan);
        break;
      case "12":
        setmaxlights(20);
        setmaxsocket(6);
        setmaxfan(4);
        handletwevecontrol(lights, sockets, fan);

        break;
      default:
        break;
    }
  }, [selectedSize.size, lights, sockets, fan, handlesizefour, handlesizetwo]);

  const handleLightsChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setLights(Math.min(value, maxlights));
    } else {
      // If the input is NaN, set lights to 0
      setLights(0);
    }
  };

  const handleFanChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setFan(Math.min(value, maxfan));
    } else {
      // If the input is NaN, set fan to 0
      setFan(0);
    }
  };

  const handleSocketsChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setSockets(Math.min(value, maxsocket));
      localStorage.setItem("sockets", sockets);
    } else {
      // If the input is NaN, set sockets to 0
      setSockets(0);
    }
  };

  const handleButtonClick = () => {
    onCreateClick(lights, fan, sockets, maxlights);
  };
  const [resetHandled, setResetHandled] = useState(false); // Define resetHandled

  const handleResetClick = useCallback(() => {
    // Reset all values to 0
    setLights(0);
    setFan(0);
    setSockets(0);
    onCreateClick(0, 0, 0, 0); // Pass 0 for all values
    setResetHandled(true); // Set resetHandled to true after handling reset
  }, [onCreateClick, setLights, setFan, setSockets]);
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("lightsCount");
      localStorage.removeItem("fanCount");
      localStorage.removeItem("socketCount");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const resetValuesOnUnload = () => {
    localStorage.removeItem("lightsCount");
    localStorage.removeItem("fanCount");
    localStorage.removeItem("socketCount");
  };

  useEffect(() => {
    window.addEventListener("unload", resetValuesOnUnload);

    return () => {
      window.removeEventListener("unload", resetValuesOnUnload);
    };
  }, []);

  return (
    <div style={{ gap: "20px", display: "grid" }} className="inputs">
      <div className="head">Controls</div>
      <div className="inputsofthecontrols">
        <label htmlFor="">Lights</label>
        <Tooltip
          title={`max Lights: ${maxlights}`}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [80, -30],
                  },
                },
              ],
            },
          }}
        >
          <div>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={lights}
              onChange={handleLightsChange}
            />
          </div>
        </Tooltip>
      </div>
      <div className="inputsofthecontrols">
        <label htmlFor="">Fan</label>
        <Tooltip
          title={`max Fan: ${maxfan}`}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [80, -30],
                  },
                },
              ],
            },
          }}
        >
          <div>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={fan}
              onChange={handleFanChange}
            />{" "}
          </div>
        </Tooltip>
      </div>
      <div className="inputsofthecontrols">
        <label htmlFor="">Sockets</label>
        <Tooltip
          title={`max Socket: ${maxsocket}`}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [80, -30],
                  },
                },
              ],
            },
          }}
        >
          <div>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={sockets}
              onChange={handleSocketsChange}
            />{" "}
          </div>
        </Tooltip>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Button
          style={{ height: "30px" }}
          size="small"
          variant="contained"
          onClick={handleButtonClick}
        >
          Create
        </Button>
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          style={{ height: "20px", width: "35px" }}
          onClick={handleResetClick}
        >
          <RotateLeftRoundedIcon />
        </Fab>{" "}
      </div>
    </div>
  );
};

export default Input;
