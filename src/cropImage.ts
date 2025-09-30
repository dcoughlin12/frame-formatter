export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });

  // Step 1: Crop the image
  const cropCanvas = document.createElement("canvas");
  const cropCtx = cropCanvas.getContext("2d");

  if (!cropCtx) {
    throw new Error("Could not get canvas context");
  }

  cropCanvas.width = pixelCrop.width;
  cropCanvas.height = pixelCrop.height;

  // Draw the cropped portion from the source image
  cropCtx.drawImage(
    image,
    pixelCrop.x, // source x
    pixelCrop.y, // source y
    pixelCrop.width, // source width
    pixelCrop.height, // source height
    0, // destination x
    0, // destination y
    pixelCrop.width, // destination width
    pixelCrop.height // destination height
  );

  // Step 2: Resize to exactly 3840x2160 for Samsung Frame TV
  const finalCanvas = document.createElement("canvas");
  const finalCtx = finalCanvas.getContext("2d");

  if (!finalCtx) {
    throw new Error("Could not get canvas context");
  }

  finalCanvas.width = 3840;
  finalCanvas.height = 2160;

  // Draw the cropped image onto the final canvas at the exact dimensions
  finalCtx.drawImage(
    cropCanvas,
    0,
    0,
    cropCanvas.width,
    cropCanvas.height,
    0,
    0,
    3840,
    2160
  );

  return new Promise<string>((resolve) => {
    finalCanvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob));
      }
    }, "image/jpeg", 0.95);
  });
}