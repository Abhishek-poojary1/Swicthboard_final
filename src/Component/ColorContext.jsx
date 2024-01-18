// ColorContext.jsx
import React, { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("#F3F2E1");
  const [selectedModule, setSelectedModule] = useState("defaultModule");
  const [selectedSize, setSelectedSize] = useState("defaultSize");
  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedModuleImage, setSelectedModuleImage] = useState(null);

  const setGlobalModule = (module) => {
    setSelectedModule(module);
  };

  const setGlobalSize = (size) => {
    setSelectedSize(size);
  };

  const setGlobalModuleImage = (image) => {
    setSelectedModuleImage(image);
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
    selectedModuleImage,
    setSelectedModuleImage,
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
