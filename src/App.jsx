import { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";

import Page from "./Component/Page";
import Canvas from "./Component/Canvas";
import Imagecrop from "./Component/Imagecrop";

function App() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Canvas />
        <Page />
      </div>
    </>
  );
}

export default App;
