# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frame TV Formatter is a React-based web application that allows users to prepare images for Samsung Frame TVs by cropping and resizing them to the exact specifications (3840x2160 pixels).

## Commands

Development:
```bash
npm start           # Start development server on http://localhost:3000
npm test            # Run tests in interactive watch mode
npm run build       # Build production bundle to build/ folder
```

## Architecture

### Application Flow

The app follows a three-stage workflow managed in `App.tsx`:

1. **Upload Stage** (`ImageUploader.tsx`): Drag-and-drop or file selection interface using `react-dropzone`
2. **Crop Stage** (`ImageCropper.tsx`): Interactive crop interface using `react-easy-crop` with fixed 3840:2160 aspect ratio
3. **Download Stage**: Display and download the processed image

State management in `App.tsx` tracks:
- `selectedImage`: The uploaded file
- `croppedImage`: The final processed image data URL
- `croppingComplete`: Controls transition from crop to download stage

### Image Processing Pipeline

The core image processing happens in `cropImage.ts`:

1. Loads the source image into an HTMLImageElement
2. Creates a crop canvas and extracts the selected region based on pixel coordinates from `react-easy-crop`
3. Creates a final canvas sized at exactly 3840x2160 pixels
4. Draws the cropped image onto the final canvas (scales as needed)
5. Exports as JPEG with 0.95 quality

**Critical**: The final output is always 3840x2160 regardless of the input image dimensions or crop area size. The cropped region is scaled to fit these exact dimensions.

### Styling

The project uses:
- Tailwind CSS for utility classes
- DaisyUI for component styling (buttons use `btn`, `btn-primary` classes)

### Unused Components

`ImageResizer.tsx` is currently unused in the app flow but provides standalone resize functionality without cropping.