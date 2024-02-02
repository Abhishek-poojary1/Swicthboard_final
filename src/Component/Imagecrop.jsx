import react, { useEffect, useState } from "react";
import { useColorContext } from "./ColorContext";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const Imagecrop = () => {
  const [crop, setCrop] = useState();
  // const { selectedModuleImage } = useColorContext();
  const [img, setimg] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageDataURL = reader.result?.toString() || "";
        setimg(imageDataURL);
      });
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = (image) => {
    const { naturalWidth, naturalHeight } = image;
    const crop = makeAspectCrop(
      { unit: "%", width: 25 },
      ASPECT_RATIO,
      naturalWidth,
      naturalHeight
    );
    const centeredCrop = centerCrop(crop, naturalWidth, naturalHeight);
    setCrop(centeredCrop);
  };

  const cancelCrop = () => {
    setimg(null); // Update selectedModuleImage in ColorContext
  };

  return (
    <div className="imagecrop-container">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={cancelCrop}>Cancel</button>
      </div>
      <div className="cust">
        {img && (
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              src={img}
              alt="upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
              className="center-image"
            />
          </ReactCrop>
        )}
      </div>
    </div>
  );
};

export default Imagecrop;
