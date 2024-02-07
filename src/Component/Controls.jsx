import React, { useState, useContext, useEffect } from "react";
import { useColorContext } from "./ColorContext";
import lights from "./assets/1.png";
import socket from "./assets/socket.jpg"; // Import the socket image
// import constantImage from "./assets/s3.png";
import fan from "./assets/6.png";
const Controls = () => {
  const { setlightimage, setSelectedLights, selectedSize } = useColorContext();
  const [lightsValue, setLightsValue] = useState(0);
  const [socketValue, setSocketValue] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [fanValue, setFanValue] = useState(0); // State for fan value
  const handleImageClick = (imageName) => {
    if (imageName === socket) {
      if (selectedSize.size === "2") {
        setSocketValue(socketValue === 0 ? 1 : 0);
        setSelectedLights([{ name: socket, value: socketValue === 0 ? 1 : 0 }]);
        setLightsValue(0);
        setSelectedImages([]);
        setlightimage(socket); // Here you set the socket image
      } else {
        setSocketValue(socketValue === 0 ? 1 : 0);
        setSelectedImages([]);
        const lightsToSet = [];
        for (let i = 1; i <= lightsValue; i++) {
          lightsToSet.push({ name: lights, value: i });
        }
        setSelectedLights(lightsToSet);
        setlightimage(socket); // Here you also set the socket image
      }
    } else if (imageName === lights) {
      setSocketValue(0);
      setSelectedImages([]);
      const lightsToSet = [];
      for (let i = 1; i <= lightsValue; i++) {
        lightsToSet.push({ name: lights, value: i });
      }
      setSelectedLights(lightsToSet);
      setlightimage(lights);
    } else {
      setSelectedImages([]);
      setSocketValue(0);
    }
  };

  const handleInputChange = (id, event) => {
    const inputValue = event.target.value;
    let maxValue = 10; // Default maximum value

    if (selectedSize.size === "2" && id === "lights") {
      maxValue = 4; // Set the maximum value to 4 when the selected size is 2
    } else if (selectedSize.size === "4" && id === "lights") {
      maxValue = 6; // Set the maximum value to 6 when the selected size is 4
    } else if (selectedSize.size === "2" && id === "socket") {
      maxValue = 1; // Set the maximum value to 1 when the selected size is 2 for socket
    }

    const newValue = Math.max(0, Math.min(maxValue, inputValue));

    if (id === "lights") {
      setLightsValue(newValue);
      if (newValue > 0) {
        const lightsToSet = [];
        for (let i = 1; i <= newValue; i++) {
          lightsToSet.push({ name: lights, value: i });
        }
        setSelectedLights(lightsToSet);
      } else {
        setSelectedLights([]);
      }
    } else if (id === "socket") {
      setSocketValue(newValue);
      if (newValue === 0) {
        setSelectedImages([]);
        setSelectedLights([]);
        setlightimage(null);
      }
    }
  };

  const handleIncrement = (id) => {
    const currentValue = id === "lights" ? lightsValue : socketValue;
    let maxValue = 20;
    if (selectedSize.size === "2" && id === "lights") {
      maxValue = 4;
    } else if (selectedSize.size === "4" && id === "lights") {
      maxValue = 6;
    } else if (selectedSize.size === "6" && id === "lights") {
      maxValue = 10;
    } else if (selectedSize.size === "8" && id === "lights") {
      maxValue = 10;
    } else if (selectedSize.size === "12" && id === "lights") {
      maxValue = 20;
    } else if (selectedSize.size === "2" && id === "socket") {
      maxValue = 1;
    } else if (selectedSize.size === "4" && id === "socket") {
      maxValue = 1;
    } else if (selectedSize.size === "6" && id === "socket") {
      maxValue = 2;
    } else if (selectedSize.size === "8" && id === "socket") {
      maxValue = 2;
    } else if (selectedSize.size === "12" && id === "socket") {
      maxValue = 3;
    }

    if (currentValue < maxValue) {
      const newValue = currentValue + 1;
      // if (id === "lights") {
      //   setLightsValue(newValue);
      //   if (newValue > 0) {
      //     const lightsToSet = [];
      //     for (let i = 1; i <= newValue; i++) {
      //       lightsToSet.push({ name: lights, value: i });
      //     }
      //     setSelectedLights(lightsToSet);
      //   } else {
      //     setSelectedLights([]);
      //   }
      // } else if (id === "socket") {
      //   setSocketValue(newValue);
      //   if (newValue > 0) {
      //     setSelectedLights([{ name: socket, value: newValue }]);
      //   } else {
      //     setSelectedLights([]);
      //   }
      // }
      const lightsToSet = [];
      for (let i = 1; i <= newValue; i++) {
        if (id === "lights") {
          setLightsValue(newValue);
          lightsToSet.push({ name: lights, value: i });
          setSelectedLights(lightsToSet);
        } else if (id === "socket") {
          //   setSocketValue(newValue);
          lightsToSet.push({ name: socket, value: i });
          setSelectedLights(lightsToSet);
        } else if (id === "fan") {
          //   setSocketValue(newValue);
          lightsToSet.push({ name: fan, value: i });
          setSelectedLights(lightsToSet);
        }
      }
    }
  };

  // useEffect(() => {
  //   if (socketValue === 0) {
  //     setSelectedImages([]);
  //     setSelectedLights([]);
  //     setlightimage(null);
  //   }
  // }, [socketValue, setSelectedLights, setlightimage]);
  const handleDecrement = (id) => {
    if (id === "lights") {
      if (lightsValue > 1) {
        setLightsValue((prevValue) => prevValue - 1);
        setSelectedLights((prevSelectedLights) =>
          prevSelectedLights.slice(0, -1)
        );
      } else {
        setLightsValue(0);
        setSelectedLights([]);
        setSelectedImages([]);
      }
    } else if (id === "socket") {
      if (socketValue > 1) {
        setSocketValue((prevValue) => prevValue - 1);
      } else if (socketValue === 1) {
        if (selectedSize.size === "2") {
          setSocketValue(0);
          setSelectedImages([]);
          setSelectedLights([]);
          setlightimage(null);
        }
      } else if (socketValue === 0) {
        setSelectedImages([]);
        setSelectedLights([]);
        setlightimage(null);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (![38, 40].includes(event.keyCode)) {
      event.preventDefault();
    }
  };
  const handleFanClick = () => {
    setSelectedImages([fan]);
    setlightimage(fan);
  };
  return (
    <div>
      <div style={{ display: "grid" }}>
        <div className="inputcontrols">
          <div className="boxcon" onClick={() => handleImageClick(lights)}>
            <label htmlFor="lights" className="label">
              Lights
            </label>
            <button onClick={() => handleDecrement("lights")}>-</button>
            <input
              type="number"
              id="lights"
              className="controls"
              value={lightsValue}
              min={1}
              max={10}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleInputChange("lights", e)}
            />
            <button onClick={() => handleIncrement("lights")}>+</button>
          </div>
          <div className="boxcon" onClick={() => handleImageClick(socket)}>
            <label htmlFor="socket" className="label">
              Socket
            </label>
            <button onClick={() => handleDecrement("socket")}>-</button>
            <input
              type="number"
              id="socket"
              className="controls"
              value={socketValue}
              min={1}
              max={10}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleInputChange("socket", e)}
            />
            <button onClick={() => handleIncrement("socket")}>+</button>
          </div>
          <div className="boxcon" onClick={handleFanClick}>
            {" "}
            {/* Add onClick handler for fan */}
            <label htmlFor="fan" className="label">
              Fan
            </label>
            <button onClick={() => handleDecrement("fan")}>-</button>
            <input
              type="number"
              id="fan"
              className="controls"
              value={fanValue}
              min={1}
              max={5}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleInputChange("fan", e)}
            />
            <button onClick={() => handleIncrement("fan")}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
