import { useState, useEffect } from "react";
import lights from "./assets/1.png";
import socket from "./assets/socket.jpg";
import fan from "./assets/6.png";
import { useColorContext } from "./ColorContext";
const Jod = () => {
  const [selectedImages, setSelectedImages] = useState(() => {
    const storedImages = JSON.parse(localStorage.getItem("selectedImages"));
    return storedImages || [];
  });
  const { setSelectedLights, selectedSize } = useColorContext();

  const [maxLights, setMaxLights] = useState(0);
  const [maxSockets, setMaxSockets] = useState(0);
  const [maxFans, setMaxFans] = useState(0);
  const [lightsCount, setLightsCount] = useState(
    parseInt(localStorage.getItem("lightsCount")) || 0
  );
  const [socketCount, setSocketCount] = useState(
    parseInt(localStorage.getItem("socketCount")) || 0
  );
  const [fanCount, setFanCount] = useState(
    parseInt(localStorage.getItem("fanCount")) || 0
  );
  const [lightsDisable, setLightsDisable] = useState(false);
  const [socketDisable, setSocketDisable] = useState(false);
  const [fanDisable, setFanDisable] = useState(false);

  useEffect(() => {
    localStorage.setItem("selectedImages", JSON.stringify(selectedImages));
    localStorage.setItem("lightsCount", lightsCount);
    localStorage.setItem("socketCount", socketCount);
    localStorage.setItem("fanCount", fanCount);
    switch (selectedSize.size) {
      case "2":
        setMaxLights(4);
        setMaxSockets(1);
        setMaxFans(0);
        break;
      case "4":
        setMaxLights(6);
        setMaxSockets(1);
        setMaxFans(2);
        break;
      case "6":
      case "8":
        setMaxLights(10);
        setMaxSockets(1);
        setMaxFans(2);
        break;
      case "12":
        setMaxLights(20);
        setMaxSockets(3);
        setMaxFans(4);
        break;
      default:
        break;
    }
  }, [selectedSize, fanCount, lightsCount, socketCount, selectedImages]);

  useEffect(() => {
    setLightsDisable(
      lightsCount === maxLights ||
        (selectedSize.size === "2" && socketCount > 0) ||
        (selectedSize.size === "4" && lightsCount === 4 && fanCount === 2) ||
        (selectedSize.size === "4" && lightsCount === 5 && fanCount === 1) ||
        (selectedSize.size === "4" && socketCount === 1 && lightsCount === 3) ||
        (selectedSize.size === "6" && socketCount === 1 && lightsCount === 7) ||
        (selectedSize.size === "6" &&
          fanCount === 2 &&
          socketCount === 1 &&
          lightsCount === 3) ||
        (selectedSize.size === "6" &&
          fanCount === 1 &&
          socketCount === 1 &&
          lightsCount === 3) ||
        (selectedSize.size === "6" &&
          fanCount === 2 &&
          socketCount === 1 &&
          lightsCount === 5) ||
        (selectedSize.size === "6" &&
          fanCount === 1 &&
          socketCount === 1 &&
          lightsCount === 6) ||
        (selectedSize.size === "6" && fanCount === 2 && lightsCount === 8) ||
        (selectedSize.size === "6" && fanCount === 1 && lightsCount === 9) ||
        (selectedSize.size === "8" && fanCount === 1 && lightsCount === 9) ||
        (selectedSize.size === "8" && fanCount === 2 && lightsCount === 8) ||
        (selectedSize.size === "8" && socketCount === 1 && lightsCount === 7) ||
        (selectedSize.size === "8" && socketCount === 1 && lightsCount === 7) ||
        (selectedSize.size === "8" &&
          socketCount === 1 &&
          lightsCount === 6 &&
          fanCount === 1) ||
        (selectedSize.size === "12" &&
          socketCount === 3 &&
          lightsCount === 7) ||
        (selectedSize.size === "12" &&
          socketCount === 2 &&
          lightsCount === 8) ||
        (selectedSize.size === "12" &&
          socketCount === 3 &&
          lightsCount === 9) ||
        (selectedSize.size === "12" && lightsCount === 16 && fanCount === 4) ||
        (selectedSize.size === "12" && lightsCount === 17 && fanCount === 3) ||
        (selectedSize.size === "12" &&
          socketCount === 2 &&
          lightsCount === 7 &&
          fanCount === 1) ||
        (selectedSize.size === "12" &&
          lightsCount === 9 &&
          socketCount === 1) ||
        (selectedSize.size === "12" &&
          lightsCount === 8 &&
          socketCount === 1 &&
          fanCount === 1) ||
        (selectedSize.size === "12" &&
          lightsCount === 7 &&
          socketCount === 1 &&
          fanCount === 2)
    );
    setSocketDisable(
      socketCount === maxSockets ||
        (selectedSize.size === "2" && lightsCount > 0) ||
        (selectedSize.size === "4" && lightsCount > 3) ||
        (selectedSize.size === "4" && lightsCount === 5 && fanCount === 1) ||
        (selectedSize.size === "4" && lightsCount === 4 && fanCount === 2) ||
        (selectedSize.size === "4" && fanCount > 0) ||
        (selectedSize.size === "6" && socketCount === 1 && lightsCount === 7) ||
        (selectedSize.size === "6" && lightsCount > 7) ||
        (selectedSize.size === "6" &&
          fanCount === 2 &&
          socketCount === 1 &&
          lightsCount === 5) ||
        (selectedSize.size === "6" &&
          fanCount === 1 &&
          socketCount === 1 &&
          lightsCount === 6) ||
        (selectedSize.size === "8" && lightsCount === 10) ||
        (selectedSize.size === "8" && lightsCount === 7 && fanCount === 1) ||
        (selectedSize.size === "8" && lightsCount === 8 && fanCount === 2) ||
        (selectedSize.size === "8" && lightsCount === 9) ||
        (selectedSize.size !== "12" && lightsCount === 10) ||
        (selectedSize.size === "12" &&
          socketCount === 3 &&
          lightsCount === 10) ||
        (selectedSize.size === "12" && lightsCount === 20) ||
        (selectedSize.size === "12" &&
          socketCount === 2 &&
          lightsCount === 8) ||
        (selectedSize.size === "12" && lightsCount === 16 && fanCount === 4) ||
        (selectedSize.size === "12" &&
          socketCount === 2 &&
          lightsCount === 7 &&
          fanCount === 1) ||
        (selectedSize.size === "12" && lightsCount > 9) ||
        (selectedSize.size === "12" &&
          socketCount === 1 &&
          lightsCount === 9) ||
        (selectedSize.size === "12" &&
          lightsCount === 8 &&
          socketCount === 1 &&
          fanCount === 1) ||
        (selectedSize.size === "12" &&
          lightsCount === 7 &&
          socketCount === 1 &&
          fanCount === 2)
    );
    setFanDisable(
      lightsCount === maxLights ||
        fanCount === maxFans ||
        selectedSize.size === "2" ||
        (selectedSize.size === "4" && lightsCount === 5 && fanCount === 1) ||
        (selectedSize.size === "4" && socketCount === 1) ||
        (selectedSize.size === "4" && lightsCount === 4 && fanCount === 2) ||
        (selectedSize.size === "6" && fanCount === 1 && lightsCount === 9) ||
        (selectedSize.size === "6" && socketCount === 1 && lightsCount === 7) ||
        (selectedSize.size === "6" && fanCount === 2) ||
        (selectedSize.size === "6" &&
          fanCount === 1 &&
          socketCount === 1 &&
          lightsCount === 6) ||
        (selectedSize.size === "8" &&
          socketCount === 1 &&
          lightsCount === 7 &&
          fanCount === 2) ||
        (selectedSize.size === "8" &&
          socketCount === 1 &&
          lightsCount === 6 &&
          fanCount === 1) ||
        (selectedSize.size === "8" && lightsCount === 9 && fanCount === 1) ||
        (selectedSize.size === "12" &&
          socketCount === 3 &&
          lightsCount === 9) ||
        (selectedSize.size === "12" && socketCount === 3 && fanCount === 2) ||
        (selectedSize.size === "12" &&
          socketCount === 2 &&
          lightsCount === 8) ||
        (selectedSize.size === "12" &&
          socketCount === 3 &&
          lightsCount === 7) ||
        (selectedSize.size === "12" && socketCount === 2 && lightsCount < 11) ||
        (selectedSize.size === "12" &&
          socketCount === 2 &&
          lightsCount === 7 &&
          fanCount === 1) ||
        (selectedSize.size === "12" && lightsCount === 17 && fanCount === 3) ||
        (selectedSize.size === "12" &&
          lightsCount === 9 &&
          socketCount === 1) ||
        (selectedSize.size === "12" &&
          lightsCount === 8 &&
          socketCount === 1 &&
          fanCount === 1) ||
        (selectedSize.size === "12" &&
          lightsCount === 7 &&
          socketCount === 1 &&
          fanCount === 2)
    );
  }, [
    lightsCount,
    maxLights,
    socketCount,
    maxSockets,
    selectedSize,
    fanCount,
    maxFans,
  ]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("selectedImages");
      localStorage.removeItem("lightsCount");
      localStorage.removeItem("socketCount");
      localStorage.removeItem("fanCount");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleImageClick = (imageName) => {
    const updatedImages = [...selectedImages, { name: imageName }];
    setSelectedImages(updatedImages);
    setSelectedLights(updatedImages);
  };

  const handleDecrement = (type) => {
    let filteredImages = [...selectedImages];

    switch (type) {
      case "lights":
        if (lightsCount > 0) {
          // Find the index of the last added light
          const lastLightIndex = filteredImages
            .slice()
            .reverse()
            .findIndex((image) => image.name === lights);
          if (lastLightIndex !== -1) {
            // Remove the last added light
            filteredImages.splice(
              filteredImages.length - 1 - lastLightIndex,
              1
            );
            setLightsCount((prevCount) => Math.max(prevCount - 1, 0)); // Decrement lights count
            setSocketDisable(false); // Enable socket button when lights count decreases
          }
        }
        break;
      case "socket":
        if (socketCount > 0) {
          // Find the index of the last added socket
          const lastSocketIndex = filteredImages
            .slice()
            .reverse()
            .findIndex((image) => image.name === socket);
          if (lastSocketIndex !== -1) {
            // Remove the last added socket
            filteredImages.splice(
              filteredImages.length - 1 - lastSocketIndex,
              1
            );
            setSocketCount((prevCount) => Math.max(prevCount - 1, 0)); // Decrement socket count
            setLightsDisable(false); // Enable lights button when socket count decreases
          }
        }
        break;
      case "fan":
        if (fanCount > 0) {
          // Find the index of the last added fan
          const lastFanIndex = filteredImages
            .slice()
            .reverse()
            .findIndex((image) => image.name === fan);
          if (lastFanIndex !== -1) {
            // Remove the last added fan
            filteredImages.splice(filteredImages.length - 1 - lastFanIndex, 1);
            setFanCount((prevCount) => Math.max(prevCount - 1, 0)); // Decrement fan count
          }
        }
        break;
      default:
        break;
    }

    setSelectedImages(filteredImages);
    setSelectedLights(filteredImages);
  };

  const handleLightsIncrement = () => {
    if (lightsCount < maxLights) {
      handleImageClick(lights);
      setLightsCount((prevCount) => prevCount + 1);
    }
  };

  const handleSocketIncrement = () => {
    if (selectedSize.size === "2" && socketCount < maxSockets) {
      handleImageClick(socket);
      setSocketCount((prevCount) => prevCount + 1);
      setLightsDisable(true); // Disable lights button when socket is selected
    } else if (selectedSize.size === "4" && socketCount < maxSockets) {
      handleImageClick(socket);
      setSocketCount((prevCount) => prevCount + 1);
    } else if (selectedSize.size === "6" && socketCount < maxSockets) {
      handleImageClick(socket);
      setSocketCount((prevCount) => prevCount + 1);
    } else if (selectedSize.size === "8" && socketCount < maxSockets) {
      handleImageClick(socket);
      setSocketCount((prevCount) => prevCount + 1);
    } else if (selectedSize.size === "12" && socketCount < maxSockets) {
      handleImageClick(socket);
      setSocketCount((prevCount) => prevCount + 1);
    }
  };

  const handleFanIncrement = () => {
    if (fanCount < maxFans) {
      handleImageClick(fan);
      setFanCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <div>
      <div className="joddiv">
        <div>
          <label>Lights</label>
        </div>
        <button
          onClick={() => handleDecrement("lights")}
          disabled={lightsCount === 0}
          className="buttonofjod"
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
          onClick={handleLightsIncrement}
          className="buttonofjod"
          disabled={lightsDisable}
        >
          +
        </button>
      </div>
      <div className="joddiv">
        <div>
          <label>Socket</label>
        </div>
        <button
          onClick={() => handleDecrement("socket")}
          disabled={socketCount === 0}
          className="buttonofjod"
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
          onClick={handleSocketIncrement}
          className="buttonofjod"
          disabled={socketDisable}
        >
          +
        </button>
      </div>
      <div className="joddiv">
        <div>
          <label>Fan</label>
        </div>
        <button
          onClick={() => handleDecrement("fan")}
          disabled={fanCount === 0}
          className="buttonofjod"
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
          onClick={handleFanIncrement}
          className="buttonofjod"
          disabled={fanDisable}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Jod;
