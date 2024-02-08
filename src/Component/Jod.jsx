import React, { useState, useEffect } from "react";
import lights from "./assets/1.png";
import socket from "./assets/socket.jpg";
import fan from "./assets/6.png";
import { useColorContext } from "./ColorContext";

const Jod = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const { setSelectedLights, selectedSize } = useColorContext();

  let maxLights = 0;
  let maxSockets = 0;
  let maxFans = 0;

  switch (selectedSize.size) {
    case "2":
      maxLights = 4;
      maxSockets = 1;
      maxFans = 0;
      break;
    case "4":
      maxLights = 6;
      maxSockets = 2;
      maxFans = 0;
      break;
    case "6":
    case "8":
      maxLights = 10;
      maxSockets = 2;
      maxFans = 0;
      break;
    case "12":
      maxLights = 20;
      maxSockets = 3;
      maxFans = 0;
      break;
    default:
      break;
  }

  const [lightsCount, setLightsCount] = useState(0);
  const [socketCount, setSocketCount] = useState(0);
  const [fanCount, setFanCount] = useState(0);

  useEffect(() => {
    // Automatically adjust lights to 4 if 3 lights are selected
    if (selectedSize.size === "2" && lightsCount === 3) {
      handleImageClick(lights);
      setLightsCount(4);
    }
  }, [lightsCount, selectedSize.size]);

  const handleImageClick = (imageName) => {
    const updatedImages = [...selectedImages, { name: imageName }];
    setSelectedImages(updatedImages);
    setSelectedLights(updatedImages);
  };

  const handleDecrement = (type) => {
    let filteredImages = [...selectedImages];

    switch (type) {
      case "lights": {
        if (lightsCount > 0) {
          filteredImages.pop(); // Remove the last added light
          setLightsCount((prevCount) => Math.max(prevCount - 1, 2)); // Ensure it doesn't go below 2
        }
        break;
      }
      case "socket": {
        if (socketCount > 0) {
          filteredImages.pop(); // Remove the last added socket
          setSocketCount((prevCount) => Math.max(prevCount - 1, 0));
        }
        break;
      }
      case "fan": {
        if (fanCount > 0) {
          filteredImages.pop(); // Remove the last added fan
          setFanCount((prevCount) => Math.max(prevCount - 1, 0));
        }
        break;
      }
      default: {
        break;
      }
    }

    setSelectedImages(filteredImages);
    setSelectedLights(filteredImages);
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <label>Lights</label>
            <button
              onClick={() => handleDecrement("lights")}
              disabled={lightsCount === 0}
            >
              -
            </button>
            <input
              type="number"
              className="inputofcont"
              value={lightsCount}
              readOnly
            />
            <button
              onClick={() => {
                if (lightsCount < maxLights) {
                  handleImageClick(lights);
                  setLightsCount((prevCount) => prevCount + 1);
                }
              }}
              disabled={lightsCount >= maxLights || socketCount > 0}
            >
              +
            </button>
          </div>
          <div>
            <label>Socket</label>
            <button
              onClick={() => handleDecrement("socket")}
              disabled={socketCount === 0}
            >
              -
            </button>
            <input
              type="number"
              className="inputofcont"
              value={socketCount}
              readOnly
            />
            <button
              onClick={() => {
                if (socketCount < maxSockets) {
                  handleImageClick(socket);
                  setSocketCount((prevCount) => prevCount + 1);
                }
              }}
              disabled={socketCount >= maxSockets || lightsCount > 0}
            >
              +
            </button>
          </div>
          <div>
            <label>Fan</label>
            <button
              onClick={() => handleDecrement("fan")}
              disabled={fanCount === 0}
            >
              -
            </button>
            <input
              type="number"
              className="inputofcont"
              value={fanCount}
              readOnly
            />
            <button
              onClick={() => {
                if (fanCount < maxFans) {
                  handleImageClick(fan);
                  setFanCount((prevCount) => prevCount + 1);
                }
              }}
              disabled={fanCount >= maxFans}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jod;
