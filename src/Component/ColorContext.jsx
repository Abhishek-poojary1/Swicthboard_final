// ColorContext.jsx
import { createContext, useContext, useState } from "react";

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
  const [selectedimage, setSelectedimage] = useState([]); // Add this state
  const [img, setimg] = useState("");
  const [collectionData, setCollectionData] = useState(null); // State to store canvas data for collection

  const coldata = (e) => {
    setCollectionData(e);
  };
  const clearimage = () => {
    setSelectedimage([]);
  };
  const setSelectedLights = (e) => {
    setSelectedimage(e);
  };
  const setimgglob = (e) => {
    setimg(e);
  };
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
    selectedimage,
    setSelectedimage,
    setSelectedLights,
    img,
    setimgglob,
    setimg,
    collectionData,
    setCollectionData,
    coldata,
    clearimage,
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
