// ColorContext.jsx
import React, { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("#F0F0F0");
  const [selectedModule, setSelectedModule] = useState("defaultModule");
  const [selectedSize, setSelectedSize] = useState("defaultSize");
  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedModuleImage, setSelectedModuleImage] = useState(null);
  const [selimage, setselimage] = useState("");
  const [frameclr, setframeclr] = useState("");
  const [light, setlight] = useState("");
  const [selectedLights, setSelectedLights] = useState([]); // Add this state

  const setGlobalModule = (module) => {
    setSelectedModule(module);
  };
  const setlightimage = (img) => {
    setlight(img);
  };
  const setGlobalSize = (size) => {
    setSelectedSize(size);
  };

  const setGlobalmoduleimage = (image) => {
    setSelectedModuleImage(image);
  };
  const setGlobalimage = (img) => {
    setselimage(img);
  };

  const setframecolor = (color) => {
    setframeclr(color);
  };
  const contextValue = {
    color,
    setColor,
    selectedModule,
    setGlobalModule,
    selectedSize,
    setGlobalSize,
    selectedColor,
    setSelectedColor,
    setGlobalmoduleimage,
    selectedModuleImage,
    setSelectedModuleImage,
    selimage,
    setselimage,
    setGlobalimage,
    frameclr,
    setframeclr,
    setframecolor,
    setlightimage,
    light,
    setlight,
    selectedLights,
    setSelectedLights,
    setlightimage,
  };

  return (
    <ColorContext.Provider value={contextValue}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  return useContext(ColorContext);
};
