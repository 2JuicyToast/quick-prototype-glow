import { useState, useRef, useCallback } from "react";
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { X, Check, ZoomIn, ZoomOut } from "lucide-react";

interface ImageCropperProps {
  file: File;
  aspect: number;
  shape?: "round" | "rect";
  onDone: (blob: Blob) => void;
  onCancel: () => void;
  title?: string;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight,
  );
}

export function ImageCropper({ file, aspect, shape = "rect", onDone, onCancel, title }: ImageCropperProps) {
  const [imgSrc, setImgSrc] = useState<string>(() => URL.createObjectURL(file));
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const imgRef = useRef<HTMLImageElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, aspect));
  }

  const getCroppedBlob = useCallback((): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const image = imgRef.current;
      if (!image || !completedCrop) { reject(new Error("No crop")); return; }

      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const outputWidth = Math.round(completedCrop.width * scaleX);
      const outputHeight = Math.round(completedCrop.height * scaleY);

      canvas.width = outputWidth;
      canvas.height = outputHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas ctx failed")); return; }

      if (shape === "round") {
        ctx.beginPath();
        ctx.arc(outputWidth / 2, outputHeight / 2, Math.min(outputWidth, outputHeight) / 2, 0, Math.PI * 2);
        ctx.clip();
      }

      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        outputWidth,
        outputHeight,
      );

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      }, "image/jpeg", 0.92);
    });
  }, [completedCrop, shape]);

  async function handleConfirm() {
    try {
      const blob = await getCroppedBlob();
      onDone(blob);
      URL.revokeObjectURL(imgSrc);
    } catch {
      onCancel();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(2,6,23,0.85)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col"
        style={{ background: "#0f172a", border: "1px solid #1e293b", maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #1e293b" }}>
          <h2 className="font-semibold text-base" style={{ color: "#dae2fd" }}>
            {title ?? "Crop image"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-1.5 transition-colors hover:bg-white/10"
            style={{ color: "#958ea0" }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Crop area */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-4" style={{ background: "#020617", minHeight: 0 }}>
          <ReactCrop
            crop={crop}
            onChange={(_, pct) => setCrop(pct)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            circularCrop={shape === "round"}
            minWidth={40}
            minHeight={40}
            keepSelection
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Crop preview"
              onLoad={onImageLoad}
              style={{
                maxWidth: "100%",
                maxHeight: "60vh",
                transform: `scale(${scale})`,
                transformOrigin: "center",
                transition: "transform 0.15s ease",
              }}
            />
          </ReactCrop>
        </div>

        {/* Controls */}
        <div className="px-5 py-4 flex items-center justify-between gap-4" style={{ borderTop: "1px solid #1e293b" }}>
          {/* Zoom */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setScale((s) => Math.max(0.5, +(s - 0.1).toFixed(1)))}
              className="rounded-lg p-2 transition-colors hover:bg-white/10"
              style={{ color: "#958ea0" }}
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-xs w-12 text-center" style={{ color: "#cbc3d7", fontFamily: "'JetBrains Mono', monospace" }}>
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setScale((s) => Math.min(3, +(s + 0.1).toFixed(1)))}
              className="rounded-lg p-2 transition-colors hover:bg-white/10"
              style={{ color: "#958ea0" }}
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-white/10"
              style={{ color: "#cbc3d7", border: "1px solid #1e293b" }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!completedCrop?.width}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-40"
              style={{ background: "linear-gradient(135deg,#a078ff 0%,#0566d9 100%)" }}
            >
              <Check className="h-4 w-4" />
              Apply crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
