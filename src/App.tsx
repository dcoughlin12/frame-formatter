import { useState } from "react";
import ImageUploader from "./ImageUploader";
import ImageCropper from "./ImageCropper";

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        setCroppedImage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImage: string) => {
    setCroppedImage(croppedImage);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setCroppedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-3">
      <div className="max-w-md mx-auto pt-2 pb-3">
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-2xl shadow-lg">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-black text-white drop-shadow-lg">
            Frame TV
          </h1>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-4 space-y-3">
          {!selectedImage ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : croppedImage ? (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  id="cropped-image"
                  src={croppedImage}
                  alt="Cropped"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs text-center text-gray-500 font-medium">
                  💡 Tip: Long-press image to save to Photos directly
                </p>
                <a
                  href={croppedImage}
                  download="frame-tv-image.jpg"
                  className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3.5 px-6 rounded-2xl text-center transition-all duration-200 shadow-lg active:scale-95"
                >
                  Download Image
                </a>
                <button
                  onClick={handleReset}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 px-6 rounded-2xl transition-all duration-200 active:scale-95"
                >
                  Upload Another
                </button>
              </div>
            </div>
          ) : (
            <ImageCropper
              image={selectedImage}
              onCropComplete={handleCropComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;