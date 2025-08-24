import React, { useState, useEffect, useRef } from "react";

export default function VideoCarousel() {
  const videos = [
    { id: 1, url: "https://www.youtube.com/embed/k_skwRTFSYI?start=27", title: "Video 1" },
    { id: 2, url: "https://www.youtube-nocookie.com/embed/3-_9ATMiCus", title: "Video 2" },
    { id: 3, url: "https://www.youtube-nocookie.com/embed/y2_hCymvMO8", title: "Video 3" },
    { id: 4, url: "https://www.youtube-nocookie.com/embed/7RwdG-CDo8E", title: "Video 4" },
    { id: 5, url: "https://www.youtube-nocookie.com/embed/Ddj7FOI0XSQ", title: "Video 5" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const modIndex = (i) => ((i % videos.length) + videos.length) % videos.length;

  const startAutoplay = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((p) => modIndex(p + 1));
      }, 4000);
    }
  };

  const stopAutoplay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  useEffect(() => {
    isHovered ? stopAutoplay() : startAutoplay();
  }, [isHovered]);

  const getVideoStyle = (index) => {
    const total = videos.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const distance = Math.abs(diff);
    const x = diff * 120; // smaller translate for phone
    const rotateY = diff * -10;

    let scale = 0.6, opacity = 0.5, zIndex = 5;
    if (index === currentIndex) {
      scale = 1;
      opacity = 1;
      zIndex = 10;
    } else if (distance === 1) {
      scale = 0.8;
      opacity = 0.8;
      zIndex = 8;
    }

    return {
      transform: `translateX(${x}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      transition: "transform 0.5s ease, opacity 0.4s ease",
    };
  };

  const goNext = () => setCurrentIndex((p) => modIndex(p + 1));
  const goPrev = () => setCurrentIndex((p) => modIndex(p - 1));

  return (
    <div className="w-full h-[50vh] sm:h-[65vh] lg:h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="relative w-full h-[85%] flex items-center justify-center px-2 sm:px-6"
        style={{ perspective: "900px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Videos */}
        <div className="relative flex items-center w-full max-w-md sm:max-w-2xl lg:max-w-5xl aspect-video">
          {videos.map((video, i) => {
            const total = videos.length;
            let diff = i - currentIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const distance = Math.abs(diff);
            const isVisible = distance <= 2;

            return (
              <div
                key={video.id}
                className={`absolute w-full h-full rounded-lg ${
                  isVisible ? "block" : "hidden"
                }`}
                style={getVideoStyle(i)}
                onClick={() => setCurrentIndex(i)}
              >
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`${video.url}?controls=0&mute=1&modestbranding=1&rel=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ pointerEvents: i === currentIndex ? "auto" : "none" }}
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition ${
                currentIndex === i
                  ? "bg-white scale-110"
                  : "bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Prev/Next */}
        <button
          onClick={goPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-lg sm:text-2xl"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-lg sm:text-2xl"
        >
          ›
        </button>
      </div>
    </div>
  );
}
