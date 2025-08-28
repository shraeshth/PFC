import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import gsap from "gsap";
import imagesData from "../JSON/Images.json";

// Utility functions
const lerp = (a, b, n) => (1 - n) * a + n * b;
const getDistance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

const getPointerPosition = (e, rect) => {
  const touch = e.touches?.[0];
  const clientX = touch?.clientX ?? e.clientX;
  const clientY = touch?.clientY ?? e.clientY;
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
};

// Memoized CapsuleImage component
const CapsuleImage = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imagesData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentImage = imagesData[currentIndex];

  return (
    <span className="inline-block w-20 h-10 sm:w-24 sm:h-12 md:w-28 md:h-14 lg:w-30 lg:h-15 rounded-full overflow-hidden flex-shrink-0">
      <img
        src={currentImage.url}
        alt={currentImage.alt || "Capsule"}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </span>
  );
});

CapsuleImage.displayName = "CapsuleImage";

// Optimized ImageItem class
class ImageItem {
  constructor(element) {
    this.element = element;
    this.inner = element.querySelector(".content__img-inner");
    this.rect = null;
    this.defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };

    this.updateRect();
    this.bindEvents();
  }

  bindEvents() {
    this.handleResize = () => {
      gsap.set(this.element, this.defaultStyle);
      this.updateRect();
    };
    window.addEventListener("resize", this.handleResize, { passive: true });
  }

  updateRect() {
    this.rect = this.element.getBoundingClientRect();
  }

  cleanup() {
    window.removeEventListener("resize", this.handleResize);
  }
}

// Optimized ImageTrail class
class ImageTrail {
  constructor(container) {
    this.container = container;
    this.images = this.initializeImages();
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.threshold = this.getResponsiveThreshold();
    this.animationId = null;

    // Mouse tracking
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.bindEvents();
    this.handleResize();
  }

  getResponsiveThreshold() {
    // Adjust threshold based on screen size
    const width = window.innerWidth;
    if (width < 768) return 50; // Mobile
    if (width < 1024) return 65; // Tablet
    return 80; // Desktop
  }

  getResponsiveImageSize() {
    const width = window.innerWidth;
    if (width < 640) return { width: 120, aspectRatio: 1.2 }; // Small mobile
    if (width < 768) return { width: 140, aspectRatio: 1.15 }; // Mobile
    if (width < 1024) return { width: 165, aspectRatio: 1.1 }; // Tablet
    return { width: 190, aspectRatio: 1.1 }; // Desktop
  }

  handleResize() {
    this.threshold = this.getResponsiveThreshold();
    const { width } = this.getResponsiveImageSize();

    // Update all image sizes
    this.images.forEach((img) => {
      gsap.set(img.element, {
        width: width,
        height: width / this.getResponsiveImageSize().aspectRatio,
      });
      img.updateRect();
    });
  }

  initializeImages() {
    return [...this.container.querySelectorAll(".content__img")].map(
      (img) => new ImageItem(img)
    );
  }

  bindEvents() {
    const handlePointerMove = (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getPointerPosition(e, rect);
    };

    const initRender = (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getPointerPosition(e, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.startRenderLoop();

      // Remove init listeners
      this.container.removeEventListener("mousemove", initRender);
      this.container.removeEventListener("touchmove", initRender);
    };

    const handleResize = () => {
      this.handleResize();
    };

    // Use passive listeners for better performance
    this.container.addEventListener("mousemove", handlePointerMove, {
      passive: true,
    });
    this.container.addEventListener("touchmove", handlePointerMove, {
      passive: true,
    });
    this.container.addEventListener("mousemove", initRender, { passive: true });
    this.container.addEventListener("touchmove", initRender, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Store references for cleanup
    this.handlePointerMove = handlePointerMove;
    this.initRender = initRender;
    this.resizeHandler = handleResize;
  }

  startRenderLoop() {
    const render = () => {
      const distance = getDistance(this.mousePos, this.lastMousePos);

      // Smooth mouse position interpolation
      this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
      this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

      if (distance > this.threshold) {
        this.showNextImage();
        this.lastMousePos = { ...this.mousePos };
      }

      this.animationId = requestAnimationFrame(render);
    };

    this.animationId = requestAnimationFrame(render);
  }

  showNextImage() {
    this.zIndexVal++;
    this.imgPosition = (this.imgPosition + 1) % this.imagesTotal;
    const img = this.images[this.imgPosition];

    // Kill existing animations for performance
    gsap.killTweensOf(img.element);

    const centerX = img.rect.width / 2;
    const centerY = img.rect.height / 2;

    // Optimized timeline
    gsap
      .timeline()
      .fromTo(
        img.element,
        {
          opacity: 1,
          scale: 0,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - centerX,
          y: this.cacheMousePos.y - centerY,
        },
        {
          duration: 0.4,
          scale: 1,
          x: this.mousePos.x - centerX,
          y: this.mousePos.y - centerY,
          ease: "power2.out",
        }
      )
      .to(img.element, {
        duration: 0.4,
        opacity: 0,
        scale: 0.2,
        delay: 0.45,
        ease: "power2.in",
      });
  }

  cleanup() {
    // Cancel animation frame
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    // Remove event listeners
    this.container.removeEventListener("mousemove", this.handlePointerMove);
    this.container.removeEventListener("touchmove", this.handlePointerMove);
    window.removeEventListener("resize", this.resizeHandler);

    // Cleanup images
    this.images.forEach((img) => img.cleanup());

    // Kill all GSAP animations
    gsap.killTweensOf("*");
  }
}

const ImageTrailHero = () => {
  const containerRef = useRef(null);
  const trailRef = useRef(null);

  // Memoize images to prevent unnecessary re-renders with responsive sizing
  const trailImages = useMemo(
    () =>
      imagesData.map((img, i) => (
        <div
          key={`trail-${i}`}
          className="content__img w-[120px] sm:w-[140px] md:w-[165px] lg:w-[190px] aspect-[1.2] sm:aspect-[1.15] md:aspect-[1.1] lg:aspect-[1.1] rounded-[10px] sm:rounded-[12px] md:rounded-[15px] absolute top-0 left-0 opacity-0 overflow-hidden pointer-events-none"
          style={{
            willChange: "transform,filter",
            zIndex: 10,
            contain: "layout style paint",
          }}
        >
          <div
            className="content__img-inner bg-center bg-cover w-[calc(100%+20px)] h-[calc(100%+20px)] absolute top-[-10px] left-[-10px]"
            style={{
              backgroundImage: `url(${img.url})`,
              contain: "paint",
            }}
          />
        </div>
      )),
    []
  );

  useEffect(() => {
    if (!containerRef.current) return;

    trailRef.current = new ImageTrail(containerRef.current);

    return () => {
      trailRef.current?.cleanup();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden mt-6 sm:mt-8 md:mt-10"
      style={{ contain: "layout paint" }}
    >
      {/* Foreground Content */}
      <div className="backdrop-blur-[5px] relative z-200 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 pointer-events-none">
        <div className="pointer-events-auto max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-white leading-tight">
            Capturing Moments,
          </h1>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-white leading-tight flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-2">
            <span>Creating Stories</span>
            <CapsuleImage />
          </h1>

          <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-xl mx-auto mb-8 font-regular font-figtree leading-relaxed mt-4 sm:mt-5 px-2">
            The Photography & Filming Club is where passion meets lens. From
            timeless portraits to cinematic films, we turn every frame into art.
          </p>
        </div>
      </div>

      {/* Trail Images */}
      {trailImages}
    </section>
  );
};

export default ImageTrailHero;
