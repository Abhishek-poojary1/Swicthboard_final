import React, { useState } from "react";
import lights from "./assets/1.png";
import socket from "./assets/socket.jpg";
import fan from "./assets/6.png";
import { useColorContext } from "./ColorContext";

const Jod = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const { setSelectedLights } = useColorContext();

  // Separate state variables for each type of item
  const [lightsCount, setLightsCount] = useState(0);
  const [socketCount, setSocketCount] = useState(0);
  const [fanCount, setFanCount] = useState(0);

  const handleImageClick = (imageName) => {
    const updatedImages = [...selectedImages, { name: imageName }];
    setSelectedImages(updatedImages);
    setSelectedLights(updatedImages);

    // Remove the count updates from here
  };

  const handleDecrement = (type) => {
    let filteredImages = [...selectedImages]; // Create a copy of selectedImages

    switch (type) {
      case "lights": {
        const lastLightIndex = filteredImages.findIndex(
          (image) => image.name === lights
        );
        if (lastLightIndex !== -1) {
          filteredImages.splice(lastLightIndex, 1);
          setLightsCount((prevCount) => prevCount - 1); // Decrement the count
        }
        break;
      }
      case "socket": {
        const lastSocketIndex = filteredImages.findIndex(
          (image) => image.name === socket
        );
        if (lastSocketIndex !== -1) {
          filteredImages.splice(lastSocketIndex, 1);
          setSocketCount((prevCount) => prevCount - 1); // Decrement the count
        }
        break;
      }
      case "fan": {
        const lastFanIndex = filteredImages.findIndex(
          (image) => image.name === fan
        );
        if (lastFanIndex !== -1) {
          filteredImages.splice(lastFanIndex, 1);
          setFanCount((prevCount) => prevCount - 1); // Decrement the count
        }
        break;
      }
      default: {
        // Handle default case if needed
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
              onClick={(e) => {
                e.stopPropagation();
                handleDecrement("lights");
              }}
            >
              -
            </button>
            <input type="number" value={lightsCount} readOnly />
            <button
              onClick={() => {
                handleImageClick(lights);
                setLightsCount((prevCount) => prevCount + 1);
              }}
            >
              +
            </button>
          </div>
          <div>
            <label>Socket</label>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDecrement("socket");
              }}
            >
              -
            </button>
            <input type="number" value={socketCount} readOnly />
            <button
              onClick={() => {
                handleImageClick(socket);
                setSocketCount((prevCount) => prevCount + 1);
              }}
            >
              +
            </button>
          </div>
          <div>
            <label>Fan</label>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDecrement("fan");
              }}
            >
              -
            </button>
            <input type="number" value={fanCount} readOnly />
            <button
              onClick={() => {
                handleImageClick(fan);
                setFanCount((prevCount) => prevCount + 1);
              }}
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
