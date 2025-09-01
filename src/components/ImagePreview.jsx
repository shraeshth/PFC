import React, { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ImagePreview = ({ image, isOpen, onClose, allImages, onNavigate }) => {
  const [loaded, setLoaded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

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
      setIsFlipped(false); // Reset flip when navigating
    },
    [currentIndex, allImages, onNavigate]
  );

  const handleImageClick = () => {
    if (image.story) {
      setIsFlipped(!isFlipped);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    const handler = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleImageClick();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handler);
    };
  }, [isOpen, onClose, navigate, isFlipped]);

  // Reset flip when image changes
  useEffect(() => {
    setIsFlipped(false);
  }, [image]);

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[250] bg-white/10 backdrop-blur-lg flex items-center justify-center"
          onClick={onClose}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-5 right-5 text-white p-2 rounded-full hover:bg-white/10 z-10 transition-colors"
              onClick={onClose}
            >
              <X size={22} />
            </button>

            <button
              onClick={() => navigate("prev")}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/40 hover:bg-black/60 z-10 transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => navigate("next")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/40 hover:bg-black/60 z-10 transition-colors"
            >
              <ChevronRight size={22} />
            </button>

            {/* Flip Container */}
            <div
              className="relative cursor-pointer flex items-center justify-center"
              style={{ perspective: "1000px" }}
              onClick={handleImageClick}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative"
              >
                {/* Front Side - Image */}
                <motion.div
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                  className="relative"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    onLoad={() => setLoaded(true)}
                    className={`max-h-[85vh] max-w-[92vw] object-contain transition-opacity duration-500 rounded-2xl shadow-2xl ${
                      loaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {/* Flip Indicator */}
                  {image.story && (
                    <div className="absolute bottom-4 font-figtree left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      Click to flip
                    </div>
                  )}
                </motion.div>

                {/* Back Side - Story */}
                <motion.div
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  className="flex items-center justify-center"
                >
                  <div
                    className="bg-amber-50 text-gray-800 p-8 font-homemade rounded-2xl shadow-2xl flex flex-col justify-center items-center relative"
                    style={{
                      width: "100%",
                      height: "100%",
                      minHeight: "400px",
                      minWidth: "300px",
                    }}
                  >
                    <div className="flex flex-col justify-evenly items-center h-full w-full px-6">
                      {/* Title */}
                      <div className="flex-1 flex items-center justify-center w-full">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#E95EB4] leading-tight">
                          {image.title}
                        </h2>
                      </div>

                      {/* Story */}
                      <div className="flex-1  flex items-center justify-center w-full px-4">
                        <p className="text-lg md:text-xl lg:text-2xl text-center leading-relaxed text-gray-500 italic max-w-full">
                          "{" "}
                          {image.story || "No story available for this image."}"
                        </p>
                      </div>

                      {/* Description */}
                      <div className="flex-1 flex items-center justify-center w-full px-4">
                        <p className="text-lg md:text-xl lg:text-2xl font-bold text-center capitalize leading-relaxed text-gray-700 max-w-full">
                          ~{" "}
                          {image.description ||
                            "No description available for this image."}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Title and Description */}
            {!isFlipped && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-5 right-20 text-right text-white z-10 max-w-xs"
              >
                <h2 className="text-lg font-medium tracking-wide mb-1">
                  {image.title}
                </h2>
                <p className="text-sm text-white/70 font-figtree  leading-relaxed">
                  {image.description}
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            {!isFlipped && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-4 right-4 flex gap-2 z-10"
              >
                <button
                  onClick={share}
                  className="p-3 text-white rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  <Share2 size={18} />
                </button>
                <button
                  onClick={download}
                  className="p-3 text-white rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  <Download size={18} />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImagePreview;
