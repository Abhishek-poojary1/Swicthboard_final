import { useContext, useState } from "react";
import { useColorContext } from "./ColorContext";
// import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";

// const ASPECT_RATIO = 1;
// const MIN_DIMENSION = 150;
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const Imagecrop = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
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
    setimgglob(null);
  };

  return (
    <div className="imagecrop-container">
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onChange={handleFileChange}
          style={{ fontSize: "10px", width: "140px" }}
        >
          Upload image
          <VisuallyHiddenInput type="file" />
        </Button>
        <Button
          variant="contained"
          style={{ fontSize: "10px" }}
          size="medium"
          onClick={cancelCrop}
        >
          cancel{" "}
        </Button>{" "}
      </div>
    </div>
  );
};

export default Imagecrop;
