import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import ImageCropper from "./ImageCropper";

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppingComplete, setCroppingComplete] = useState<boolean>(false);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        setSelectedImage(file);
        setCroppingComplete(false);
        setCroppedImage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImage: string) => {
    setCroppedImage(croppedImage);
    setCroppingComplete(true);
  };

  return (
    <div className="max-w-[800px] mx-auto p-5 flex gap-4 flex-col">
      <div className="hero bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Frame TV Formatter</h1>
          </div>
        </div>
      </div>
      {!selectedImage ? (
        <ImageUploader onImageUpload={handleImageUpload} />
      ) : croppingComplete && croppedImage ? (
        <div className="flex gap-4 flex-col">
          <img src={croppedImage} alt="Cropped" style={{ maxWidth: "100%" }} />
          <div className="flex gap-4">
            <a href={croppedImage} download="cropped-image.jpg">
              <button className="btn btn-primary">
                Download Cropped Image
              </button>
            </a>
            <button
              className="btn btn-primary"
              onClick={() => setSelectedImage(null)}
            >
              Upload Another Image
            </button>
          </div>
        </div>
      ) : (
        <ImageCropper
          image={URL.createObjectURL(selectedImage)}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
};

export default App;
