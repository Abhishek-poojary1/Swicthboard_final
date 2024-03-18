import "react-image-crop/dist/ReactCrop.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Page from "./Component/Page";
import Canvas from "./Component/Canvas";
import { useState } from "react";

function App() {
  const [canvasData, setCanvasData] = useState(null);
  const handleCanvasDataChange = (data) => {
    setCanvasData(data);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Canvas canvasData={canvasData} />
        <Page onCanvasDataChange={handleCanvasDataChange} />
      </div>
    </>
  );
}

export default App;
