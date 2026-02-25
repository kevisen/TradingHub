"use client";

import { useEffect } from "react";

type LightboxProps = {
  images: { src: string; alt?: string }[];
  initialIndex: number;
  onClose: () => void;
};

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = (function () {
    const s = initialIndex;
    // tiny wrapper to keep this file simple; page will re-render Lightbox when needed
    return [s, (n: number) => {}] as unknown as [number, (n: number) => void];
  })();

  // The page will control index via remounting Lightbox with a different initialIndex.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        const prev = (initialIndex - 1 + images.length) % images.length;
        window.location.hash = `#lb-${prev}`; // trigger a small hint — page handles navigation
      }
      if (e.key === "ArrowRight") {
        const next = (initialIndex + 1) % images.length;
        window.location.hash = `#lb-${next}`;
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [images.length, initialIndex, onClose]);

  // Render a simple modal with the current image (initialIndex used as the image to show)
  const image = images[initialIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" role="dialog" aria-modal="true">
      <button
        className="absolute top-6 right-6 text-white bg-black/30 rounded-full p-2"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      <div className="max-w-[90%] max-h-[85%] flex items-center justify-center">
        <img src={image.src} alt={image.alt || ""} className="max-w-full max-h-full rounded-lg shadow-lg" />
      </div>
    </div>
  );
}
