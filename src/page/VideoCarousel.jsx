import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

// Constants
const AUTOPLAY_INTERVAL = 4000;
const TRANSITION_DURATION = 500;
const MAX_VISIBLE_DISTANCE = 2;

// Video data - could be moved to external config
const VIDEOS = [
  {
    id: 1,
    url: "https://www.youtube.com/embed/k_skwRTFSYI?start=27",
    title: "Video 1",
  },
  {
    id: 2,
    url: "https://www.youtube-nocookie.com/embed/3-_9ATMiCus",
    title: "Video 2",
  },
  {
    id: 3,
    url: "https://www.youtube-nocookie.com/embed/y2_hCymvMO8",
    title: "Video 3",
  },
  {
    id: 4,
    url: "https://www.youtube-nocookie.com/embed/7RwdG-CDo8E",
    title: "Video 4",
  },
  {
    id: 5,
    url: "https://www.youtube-nocookie.com/embed/Ddj7FOI0XSQ",
    title: "Video 5",
  },
];

// Utility functions
const modIndex = (index, length) => ((index % length) + length) % length;

const getResponsiveTranslateX = () => {
  if (typeof window === "undefined") return 80;
  const width = window.innerWidth;
  if (width < 480) return 60; // Small mobile
  if (width < 640) return 70; // Mobile
  if (width < 1024) return 85; // Tablet
  return 100; // Desktop
};

// Memoized video item component
const VideoItem = React.memo(
  ({ video, index, currentIndex, style, isVisible, onClick, isActive }) => {
    const iframeUrl = useMemo(
      () =>
        `${video.url}?controls=0&mute=1&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`,
      [video.url]
    );

    return (
      <div
        className={`absolute w-full aspect-video rounded-lg cursor-pointer transition-opacity duration-300 overflow-hidden ${
          isVisible ? "block" : "hidden"
        }`}
        style={{
          ...style,
          contain: "layout style paint",
          willChange: isVisible ? "transform, opacity" : "auto",
        }}
        onClick={() => onClick(index)}
        role="button"
        tabIndex={isVisible ? 0 : -1}
        aria-label={`Play ${video.title}`}
      >
        <iframe
          className="w-full h-full rounded-lg border-0 block"
          src={iframeUrl}
          title={video.title}
          frameBorder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            pointerEvents: isActive ? "auto" : "none",
            contain: "strict",
            aspectRatio: "16/9",
          }}
        />
      </div>
    );
  }
);

VideoItem.displayName = "VideoItem";

// Memoized navigation buttons
const NavigationButton = React.memo(({ direction, onClick, className }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 text-[#ff66c4] hover:text-white text-lg sm:text-2xl transition-colors duration-200 focus:outline-none focus:text-white z-20 ${className}`}
    aria-label={`${direction === "prev" ? "Previous" : "Next"} video`}
    type="button"
  >
    {direction === "prev" ? (
      <i className="ri-arrow-left-s-line"></i>
    ) : (
      <i className="ri-arrow-right-s-line"></i>
    )}
  </button>
));

NavigationButton.displayName = "NavigationButton";

export default function VideoCarousel({ videos = VIDEOS, autoplay = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [translateX, setTranslateX] = useState(getResponsiveTranslateX());
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  // Memoized video calculations
  const videoStyles = useMemo(() => {
    return videos.map((_, index) => {
      const total = videos.length;
      let diff = index - currentIndex;

      // Handle circular positioning
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const distance = Math.abs(diff);
      const x = diff * translateX;
      const rotateY = diff * -10;

      // Performance: Use discrete values instead of smooth scaling
      let scale = 0.6;
      let opacity = 0.5;
      let zIndex = 5;

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
        transform: `translate3d(${x}px, 0, 0) scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        zIndex,
        transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), opacity 400ms ease`,
        backfaceVisibility: "hidden", // Prevent flickering
        transformOrigin: "center center",
      };
    });
  }, [currentIndex, videos.length, translateX]);

  // Autoplay management
  const startAutoplay = useCallback(() => {
    if (!autoplay || intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => modIndex(prev + 1, videos.length));
    }, AUTOPLAY_INTERVAL);
  }, [autoplay, videos.length]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Navigation handlers
  const goNext = useCallback(() => {
    setCurrentIndex((prev) => modIndex(prev + 1, videos.length));
  }, [videos.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => modIndex(prev - 1, videos.length));
  }, [videos.length]);

  const goToIndex = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Hover handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          goNext();
          break;
        case "Escape":
          e.preventDefault();
          containerRef.current?.blur();
          break;
      }
    },
    [goNext, goPrev]
  );

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      setTranslateX(getResponsiveTranslateX());
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay effects
  useEffect(() => {
    if (autoplay) {
      startAutoplay();
      return stopAutoplay;
    }
  }, [autoplay, startAutoplay, stopAutoplay]);

  useEffect(() => {
    if (autoplay) {
      isHovered ? stopAutoplay() : startAutoplay();
    }
  }, [isHovered, autoplay, startAutoplay, stopAutoplay]);

  // Touch handling for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;
    let isDragging = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault(); // Prevent scrolling
    };

    const handleTouchEnd = (e) => {
      if (!isDragging) return;

      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        // Minimum swipe distance
        if (diff > 0) {
          goNext();
        } else {
          goPrev();
        }
      }

      isDragging = false;
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  return (
    <div
      className="w-full h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] xl:h-[80vh] flex items-center justify-center overflow-hidden bg-black/5"
      style={{ contain: "layout paint" }}
    >
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 focus:outline-none"
        style={{
          perspective: "800px",
          contain: "layout style paint",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Video carousel"
      >
        {/* Video Container */}
        <div className="relative flex items-center w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
          {videos.map((video, index) => {
            const total = videos.length;
            let diff = index - currentIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const distance = Math.abs(diff);
            const isVisible = distance <= MAX_VISIBLE_DISTANCE;
            const isActive = index === currentIndex;

            return (
              <div
                key={video.id}
                className="absolute w-full h-full flex items-center justify-center"
              >
                <VideoItem
                  video={video}
                  index={index}
                  currentIndex={currentIndex}
                  style={videoStyles[index]}
                  isVisible={isVisible}
                  isActive={isActive}
                  onClick={goToIndex}
                />
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <NavigationButton
          direction="prev"
          onClick={goPrev}
          className="left-2 sm:left-4 text-[#ff66c4]"
        />

        <NavigationButton
          direction="next"
          onClick={goNext}
          className="right-2 sm:right-4"
        />
      </div>
    </div>
  );
}
