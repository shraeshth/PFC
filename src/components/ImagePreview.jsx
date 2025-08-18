import React, { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";

const ImagePreview = ({ image, isOpen, onClose, allImages, onNavigate }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentIndex = image
    ? allImages.findIndex((img) => img.id === image.id)
    : -1;

  const navigateImage = useCallback(
    (direction) => {
      if (currentIndex === -1) return;
      let nextIndex;
      if (direction === "next") {
        nextIndex = currentIndex < allImages.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : allImages.length - 1;
      }
      onNavigate(allImages[nextIndex]);
    },
    [currentIndex, allImages, onNavigate]
  );

  const handleDownload = useCallback(async () => {
    if (!image) return;
    try {
      const response = await fetch(image.img);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${image.title.replace(/\s+/g, "_").toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }, [image]);

  const handleShare = useCallback(async () => {
    if (!image) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: `Check out this photo: ${image.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  }, [image]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, navigateImage]);

  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-120 flex items-center justify-center bg-black/90"
      onClick={onClose} // close if click anywhere in backdrop
    >
      {/* Stop click propagation on controls */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-white rounded-full transition-all"
        >
          <X size={20} />
        </button>

        {/* Navigation */}
        <button
          onClick={() => navigateImage("prev")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => navigateImage("next")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all"
        >
          <ChevronRight size={20} />
        </button>

        {/* Image */}
        <img
          src={image.img}
          alt={image.title}
          onLoad={() => setImageLoaded(true)}
          className={`max-h-[85vh] max-w-full object-contain transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Details (top-right corner) */}
        <div className="absolute top-4 right-16 text-right text-white z-20 px-3 py-2">
          <h2 className="text-lg font-bold">{image.title}</h2>
          <p className="text-sm text-white/70">{image.credits}</p>
        </div>

        {/* Actions (bottom-right corner) */}
        <div className="absolute bottom-0 right-0 p-4 z-20 flex gap-2">
          <button
            onClick={handleShare}
            className="p-3 text-white rounded-full transition-all"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={handleDownload}
            className="p-3 text-white rounded-full transition-all"
          >
            <Download size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
