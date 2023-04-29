import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../components/getCroppedImage";

function Cropeasy({ picUrl, setOpenCrop, setPicUrl, setFile }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    setLoading(true);
    try {
      const { file, url } = await getCroppedImg(
        picUrl,
        croppedAreaPixels,
        rotation
      );
      setPicUrl(url);
      setFile(file);
    } catch (error) {
      
    }
    setLoading(false);
  };
  return (
    <div>
      <Cropper
        image={picUrl}
        crop={crop}
        zoom={zoom}
        rotation={rotation}
        // aspect={4 / 3}
        aspect={1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onRotationChange={setRotation}
        onZoomChange={setZoom}
        cropShape={"round"}
        cropSize={{ width: 300, height: 300 }}
        showGrid={false}
        objectFit="auto-cover"
        onCropAreaChange={onCropComplete}
      />
      <button className="reswd" onClick={cropImage}>
        Result
      </button>
    </div>
  );
}

export default Cropeasy;
