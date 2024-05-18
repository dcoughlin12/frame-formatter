import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import getCroppedImg from "./cropImage";

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onCropComplete,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    if (croppedArea) {
      const croppedImage = await getCroppedImg(image, croppedArea);
      onCropComplete(croppedImage);
    }
  }, [croppedArea, image, onCropComplete]);

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "50vh",
          bottom: 0,
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={3840 / 2160}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropCompleteHandler}
          style={{ containerStyle: { width: "100%", height: "100%" } }}
        />
      </div>
      <button className="mt-12 btn btn-primary" onClick={showCroppedImage}>
        Crop
      </button>
    </>
  );
};

export default ImageCropper;
