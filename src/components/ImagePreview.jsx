import React, { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";

const ImagePreview = ({ image, isOpen, onClose, allImages, onNavigate }) => {
  const [loaded, setLoaded] = useState(false);

  const currentIndex = image
    ? allImages.findIndex((i) => i.id === image.id)
    : -1;

  const navigate = useCallback(
    (dir) => {
      if (currentIndex < 0) return;
      const nextIndex =
        dir === "next"
          ? (currentIndex + 1) % allImages.length
          : (currentIndex - 1 + allImages.length) % allImages.length;
      onNavigate(allImages[nextIndex]);
      setLoaded(false);
    },
    [currentIndex, allImages, onNavigate]
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    const handler = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handler);
    };
  }, [isOpen, onClose, navigate]);

  if (!isOpen || !image) return null;

  const download = async () => {
    try {
      const res = await fetch(image.url);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${image.title.replace(/\s+/g, "_")}.jpg`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (e) {
      console.error("Download failed:", e);
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.title,
          url: window.location.href,
        });
      } catch (e) {
        console.error("Share cancelled/failed", e);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[250] bg-white/5 backdrop-blur-lg flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-5 right-5 text-white p-2 rounded-full hover:bg-white/10"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <button
          onClick={() => navigate("prev")}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/40 hover:bg-black/60"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => navigate("next")}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg:black/40 hover:bg-black/60"
        >
          <ChevronRight size={22} />
        </button>

        <img
          src={image.url}
          alt={image.title}
          onLoad={() => setLoaded(true)}
          className={`max-h-[85vh] max-w-[92vw] object-contain transition-opacity duration-500 rounded-2xl ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="absolute top-5 right-20 text-right text-white">
          <h2 className="text-lg font-medium tracking-wide">{image.title}</h2>
          <p className="text-sm text-white/70">{image.description}</p>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={share}
            className="p-3 text-white rounded-full hover:bg-white/10"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={download}
            className="p-3 text-white rounded-full hover:bg-white/10"
          >
            <Download size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
