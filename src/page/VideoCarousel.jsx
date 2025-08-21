import React, { useState, useEffect, useRef } from "react";

export default function VideoCarousel() {
  const videos = [
    {
      id: 1,
      url: "https://www.youtube.com/embed/k_skwRTFSYI?si=fcHJjD28S4K8U4HY&amp;start=27",
      title: "Video 1",
    },
    {
      id: 2,
      url: "https://www.youtube-nocookie.com/embed/3-_9ATMiCus?si=XZqx5Bpcmk9RX8S9",
      title: "Video 2",
    },
    {
      id: 3,
      url: "https://www.youtube-nocookie.com/embed/y2_hCymvMO8?si=rxb0v-vRUDB5WjaL",
      title: "Video 3",
    },
    {
      id: 4,
      url: "https://www.youtube-nocookie.com/embed/7RwdG-CDo8E?si=05JJrvUlf6bhDiN6",
      title: "Video 4",
    },
    {
      id: 5,
      url: "https://www.youtube-nocookie.com/embed/Ddj7FOI0XSQ?si=3CGCWpt614bWSEkL",
      title: "Video 5",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const modIndex = (index) =>
    ((index % videos.length) + videos.length) % videos.length;

  // Start autoplay safely
  const startAutoplay = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => modIndex(prev + 1));
      }, 3000);
    }
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Start autoplay once on mount
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  // Pause autoplay on hover
  useEffect(() => {
    if (isHovered) stopAutoplay();
    else startAutoplay();
  }, [isHovered]);

  // Calculate smooth, efficient 3D transform for each video
  const getVideoStyle = (index) => {
    const total = videos.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const distance = Math.abs(diff);
    const x = diff * 200;
    const rotateY = diff * -15;

    let scale, opacity, zIndex;
    if (index === currentIndex) {
      scale = 1;
      opacity = 1;
      zIndex = 10;
    } else if (distance === 1) {
      scale = 0.8;
      opacity = 0.9;
      zIndex = 8;
    } else if (distance === 2) {
      scale = 0.6;
      opacity = 0.6;
      zIndex = 6;
    } else {
      scale = 0.4;
      opacity = 0.3;
      zIndex = 4;
    }

    const blur = distance > 1 ? `blur(${distance * 2}px)` : "blur(0px)";
    const brightness = distance > 1 ? 0.7 - distance * 0.1 : 1;

    return {
      transform: `translateX(${x}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      filter: `${blur} brightness(${brightness})`,
      transition:
        "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease, filter 0.5s ease",
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      willChange: "transform, opacity, filter",
    };
  };

  const goNext = () => setCurrentIndex((prev) => modIndex(prev + 1));
  const goPrev = () => setCurrentIndex((prev) => modIndex(prev - 1));

  return (
    <div className="w-full h-[90vh] flex items-center justify-center bg-gradient-to-b overflow-x-hidden">
      <div
        className="relative w-full h-[90%] flex items-center justify-center"
        style={{ perspective: "1200px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center relative w-140 h-80">
          {videos.map((video, index) => {
            const total = videos.length;
            let diff = index - currentIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const distance = Math.abs(diff);
            const isVisible = distance <= 2;

            return (
              <div
                key={video.id}
                className={`absolute flex items-center w-full h-full rounded-xl cursor-pointer ${
                  isVisible ? "block" : "hidden"
                }`}
                style={getVideoStyle(index)}
                onClick={() => setCurrentIndex(index)}
              >
                <iframe
                  className="w-full h-full"
                  src={`${video.url}?controls=0&mute=1&modestbranding=1&rel=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    pointerEvents: index === currentIndex ? "auto" : "none",
                    borderRadius: "12px",
                  }}
                />

                {index !== currentIndex && (
                  <div
                    className={`absolute inset-0 rounded-xl backdrop-blur-[2px] ${
                      distance === 1
                        ? "bg-black/50 backdrop-grayscale"
                        : "bg-black/50 backdrop-grayscale"
                    }`}
                  />
                )}

                {distance > 1 && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex items-center w-1 h-1 cursor-pointer rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/20 bg-opacity-50 hover:bg-opacity-80 hover:scale-110"
              }`}
            />
          ))}
        </div>

        {/* Prev/Next Buttons */}
        <button
          onClick={goPrev}
          className="z-10 absolute left-20 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-3xl"
        >
          <i class="ri-arrow-drop-left-line"></i>
        </button>
        <button
          onClick={goNext}
          className="z-10 absolute right-20 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-3xl"
        >
          <i class="ri-arrow-drop-right-line"></i>
        </button>
      </div>
    </div>
  );
}
