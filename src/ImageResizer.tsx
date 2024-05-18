import React, { useRef } from "react";

interface ImageResizerProps {
  image: File;
}

const ImageResizer: React.FC<ImageResizerProps> = ({ image }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [resizedImageUrl, setResizedImageUrl] = React.useState<string | null>(
    null
  );

  const resizeImage = () => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = 3840;
            canvas.height = 2160;
            ctx.drawImage(img, 0, 0, 3840, 2160);
            setResizedImageUrl(canvas.toDataURL("image/png"));
          }
        }
      };
      if (event.target && event.target.result) {
        img.src = event.target.result.toString();
      }
    };
    reader.readAsDataURL(image);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={resizeImage}>
        Convert
      </button>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {resizedImageUrl && (
        <div>
          <a href={resizedImageUrl} download="resized-image.png">
            <button className="btn btn-primary">Download</button>
          </a>
          <img
            src={resizedImageUrl}
            alt="Resized"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
