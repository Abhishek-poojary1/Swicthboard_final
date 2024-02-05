import { useContext, useState } from "react";
import { useColorContext } from "./ColorContext";
// import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

// const ASPECT_RATIO = 1;
// const MIN_DIMENSION = 150;

const Imagecrop = () => {
  const [img, setimg] = useState();
  const { setimgglob } = useColorContext();
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageDataURL = reader.result?.toString() || "";
        setimg(imageDataURL);
        setimgglob(imageDataURL);
      });
      reader.readAsDataURL(file);
    }
  };

  const cancelCrop = () => {
    setimg(null);
  };

  return (
    <div className="imagecrop-container">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={cancelCrop}>Cancel</button>
      </div>
    </div>
  );
};

export default Imagecrop;
