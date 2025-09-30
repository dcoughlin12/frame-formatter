import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
}

export default function ImageCropper({
  image,
  onCropComplete,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const onCropCompleteHandler = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );

  const handleCrop = useCallback(async () => {
    if (croppedArea) {
      const croppedImage = await getCroppedImg(image, croppedArea);
      onCropComplete(croppedImage);
    }
  }, [croppedArea, image, onCropComplete]);

  return (
    <div className="space-y-3">
      <div className="relative w-full h-[55vh] bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={3840 / 2160}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteHandler}
        />
      </div>
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-3">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-gray-700">
            Zoom
          </label>
          <span className="text-xs font-black text-purple-600 bg-white px-2.5 py-1 rounded-lg shadow-sm">
            {zoom.toFixed(1)}×
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, rgb(147 51 234) 0%, rgb(236 72 153) ${((zoom - 1) / 2) * 100}%, rgb(229 231 235) ${((zoom - 1) / 2) * 100}%, rgb(229 231 235) 100%)`
          }}
        />
      </div>
      <button
        onClick={handleCrop}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 shadow-lg active:scale-95"
      >
        Crop Image
      </button>
    </div>
  );
}