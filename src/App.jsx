import "react-image-crop/dist/ReactCrop.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Page from "./Component/Page";
import Canvas from "./Component/Canvas";

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
