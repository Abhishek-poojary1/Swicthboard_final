import React, { useState, useContext, useEffect } from "react";
import { useColorContext } from "./ColorContext";
import lights from "./assets/1.png";
import socket from "./assets/socket.jpg"; // Import the socket image
// import constantImage from "./assets/s3.png";
const Controls = () => {
  const { setlightimage, setSelectedLights, selectedSize } = useColorContext();
  const [lightsValue, setLightsValue] = useState(0);
  const [socketValue, setSocketValue] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageClick = (imageName) => {
    if (imageName === socket) {
      // If the socket is selected, clear all other lights and images
      setSelectedLights([{ name: socket, value: socketValue }]);
      setSelectedImages([]);
      setlightimage(socket); // Set selimage to socket
    } else if (imageName === lights) {
      // If lights is selected after socket, remove socket and set lights image
      if (selectedImages.length > 0 && selectedImages[0].name === socket) {
        setSelectedImages([]);
        setSelectedLights([{ name: lights, value: lightsValue }]);
        setlightimage(lights); // Set selimage to lights
      } else {
        // If a light is selected without selecting socket, set the constant image and add the light to selected images
        setSelectedImages([]);
        // setlightimage(constantImage); // Set selimage to constant image
      }
    } else {
      // If neither socket nor lights is selected, display the constant image
      setSelectedImages([]);
      // setlightimage(constantImage); // Set selimage to constant image
    }
  };
  const handleInputChange = (id, event) => {
    const inputValue = event.target.value;
    let maxValue = 10; // Default maximum value

    if (selectedSize.size === "2" && id === "lights") {
      maxValue = 4; // Set the maximum value to 4 when the selected size is 2
    }

    const newValue = Math.max(0, Math.min(maxValue, inputValue)); // Allow zero value for socket count

    if (id === "lights") {
      setLightsValue(newValue);
    } else if (id === "socket") {
      setSocketValue(newValue);
      if (newValue === 0) {
        // If socket count is reduced to zero, remove the socket image
        setSelectedImages([]);
        setSelectedLights([]);
        setlightimage(null); // Set selimage to null
      }
    }
  };

  const handleIncrement = (id) => {
    const currentValue = id === "lights" ? lightsValue : socketValue;
    let maxValue = 10; // Default maximum value

    if (selectedSize.size === "2" && id === "socket") {
      // Limit socket count to 1 for selected size 2
      maxValue = 1;
    } else if (selectedSize.size === "2" && id === "lights") {
      // Limit lights count to 4 for selected size 2
      maxValue = 4;
    }

    if (currentValue < maxValue) {
      const newValue = Math.min(maxValue, currentValue + 1);
      if (id === "lights") {
        setLightsValue(newValue);
        setSelectedLights((prevSelectedLights) => [
          ...prevSelectedLights,
          { name: lights, value: newValue },
        ]);
      } else if (id === "socket") {
        setSocketValue(newValue);
        setSelectedLights([{ name: socket, value: newValue }]);
      }
    }
  };
  useEffect(() => {
    if (socketValue === 0) {
      setSelectedImages([]);
      setSelectedLights([]);
      setlightimage(null); // Remove the socket image
    }
  }, [socketValue]);
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
        // If socket count is greater than 1, decrement normally
        setSocketValue((prevValue) => prevValue - 1);
      } else if (socketValue === 1) {
        // If socket count is 1, remove the socket
        if (selectedSize.size === "2") {
          setSocketValue(0);
          setSelectedImages([]);
          setSelectedLights([]);
          setlightimage(null); // Remove the socket image
        }
      } else if (socketValue === 0) {
        // If socket count is already 0, make sure the socket image is removed
        setSelectedImages([]);
        setSelectedLights([]);
        setlightimage(null); // Remove the socket image
      }
    }
  };

  const handleKeyDown = (event) => {
    // Allow only arrow key interactions
    if (![38, 40].includes(event.keyCode)) {
      event.preventDefault();
    }
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
          {/* Add more input boxes as needed */}
        </div>
      </div>
    </div>
  );
};

export default Controls;
