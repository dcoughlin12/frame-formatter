import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onImageUpload(acceptedFiles[0]);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 active:scale-95 ${
        isDragActive
          ? "border-purple-500 bg-purple-50"
          : "border-gray-300 hover:border-purple-400 bg-gray-50"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        <div className={`p-4 rounded-full transition-all duration-200 ${
          isDragActive ? "bg-purple-500 scale-110" : "bg-gradient-to-br from-purple-500 to-pink-500"
        }`}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <p className="text-base font-bold text-gray-800">
            {isDragActive ? "Drop it!" : "Choose Image"}
          </p>
          <p className="text-xs text-gray-500 font-medium">
            Tap here or drag & drop
          </p>
        </div>
      </div>
    </div>
  );
}