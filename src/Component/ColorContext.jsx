// ColorContext.jsx
import React, { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("defaultColor");
  const [selectedModule, setSelectedModule] = useState("defaultModule");
  const [selectedSize, setSelectedSize] = useState("defaultSize");

  const setGlobalModule = (module) => {
    setSelectedModule(module);
  };

  const setGlobalSize = (size) => {
    setSelectedSize(size);
  };

  const contextValue = {
    color,
    setColor, // Updated function name
    selectedModule,
    setGlobalModule,
    selectedSize,
    setGlobalSize,
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
