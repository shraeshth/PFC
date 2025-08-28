import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import gsap from "gsap";
import imagesData from "../JSON/Images.json";
import { NavLink } from "react-router-dom";

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
    const width = window.innerWidth;
    if (width < 768) return 40;
    if (width < 1024) return 55;
    return 70;
  }

  getResponsiveImageSize() {
    const width = window.innerWidth;
    if (width < 640) return { width: 140, aspectRatio: 1.3 };
    if (width < 768) return { width: 160, aspectRatio: 1.25 };
    if (width < 1024) return { width: 185, aspectRatio: 1.2 };
    return { width: 210, aspectRatio: 1.2 };
  }

  handleResize() {
    this.threshold = this.getResponsiveThreshold();
    const { width } = this.getResponsiveImageSize();

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

      this.container.removeEventListener("mousemove", initRender);
      this.container.removeEventListener("touchmove", initRender);
    };

    const handleResize = () => {
      this.handleResize();
    };

    this.container.addEventListener("mousemove", handlePointerMove, {
      passive: true,
    });
    this.container.addEventListener("touchmove", handlePointerMove, {
      passive: true,
    });
    this.container.addEventListener("mousemove", initRender, { passive: true });
    this.container.addEventListener("touchmove", initRender, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    this.handlePointerMove = handlePointerMove;
    this.initRender = initRender;
    this.resizeHandler = handleResize;
  }

  startRenderLoop() {
    const render = () => {
      const distance = getDistance(this.mousePos, this.lastMousePos);

      this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.12);
      this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.12);

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

    gsap.killTweensOf(img.element);

    const centerX = img.rect.width / 2;
    const centerY = img.rect.height / 2;

    gsap
      .timeline()
      .fromTo(
        img.element,
        {
          opacity: 1,
          scale: 0.3,
          rotation: Math.random() * 20 - 10,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - centerX,
          y: this.cacheMousePos.y - centerY,
        },
        {
          duration: 0.5,
          scale: 1,
          rotation: 0,
          x: this.mousePos.x - centerX,
          y: this.mousePos.y - centerY,
          ease: "power3.out",
        }
      )
      .to(img.element, {
        duration: 0.6,
        opacity: 0,
        scale: 0.8,
        rotation: Math.random() * 15 - 7.5,
        delay: 0.3,
        ease: "power2.inOut",
      });
  }

  cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    this.container.removeEventListener("mousemove", this.handlePointerMove);
    this.container.removeEventListener("touchmove", this.handlePointerMove);
    window.removeEventListener("resize", this.resizeHandler);

    this.images.forEach((img) => img.cleanup());
    gsap.killTweensOf("*");
  }
}

const ImageTrailHero = () => {
  const containerRef = useRef(null);
  const trailRef = useRef(null);

  // Words to rotate in title
  const words = [
    "Moments",
    "Memories",
    "Dreams",
    "Journeys",
    "Adventures",
    "Emotions",
    "Perspectives",
    "Visions",
    "Impressions",
    "Legacies",
  ];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Enhanced trail images with better styling
  const trailImages = useMemo(
    () =>
      imagesData.map((img, i) => (
        <div
          key={`trail-${i}`}
          className="content__img w-[140px] sm:w-[160px] md:w-[185px] lg:w-[210px] aspect-[1.3] sm:aspect-[1.25] md:aspect-[1.2] lg:aspect-[1.2] absolute top-0 left-0 opacity-0 pointer-events-none"
          style={{
            willChange: "transform,filter",
            zIndex: 10,
            contain: "layout style paint",
          }}
        >
          {/* Main image container */}
          <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-sm">
            <div
              className="content__img-inner bg-center bg-cover w-[calc(100%+10px)] h-[calc(100%+10px)] absolute top-[-5px] left-[-5px] transition-transform duration-300"
              style={{
                backgroundImage: `url(${img.url})`,
                contain: "paint",
              }}
            />
            {/* Overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-500/10"></div>
          </div>
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
      className="relative h-screen w-full overflow-hidden mt-6 sm:mt-8 md:mt-5 bg-gradient-to-br from-black via-gray-900 to-black"
      style={{ contain: "layout paint" }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-200 backdrop-blur-[5px] flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 pointer-events-none">
        <div className="pointer-events-auto max-w-6xl mx-auto">
          {/* Dynamic Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.1] tracking-tight mb-2 transition-all ease-in-out flex justify-center items-center w-full">
            <span className="whitespace-nowrap transition-all duration-[7000ms]">
              Capturing&nbsp;
            </span>

            <span
              key={wordIndex}
              className="text-[#ff66c4] inline-block transition-all duration-[100ms] ease-in-out opacity-0 blur-sm animate-fade-blur"
            >
              {words[wordIndex]}
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.1] tracking-tight">
              Creating Stories
            </h1>
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
            <p className="text-white/60 font-figtree text-sm sm:text-base md:text-lg leading-relaxed font-light tracking-wide">
              Where passion meets lens. From timeless portraits to cinematic
              films, we turn every frame into art.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <NavLink
              to="/gallery"
              className="group relative px-10 py-4 min-w-[200px] backdrop-blur-sm border border-white/30 text-white font-semibold rounded-full overflow-hidden transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl  flex items-center justify-center gap-0 group-hover:gap-3"
            >
              {/* Background rotating images */}
              <div className="absolute inset-0 -z-0">
                <img
                  src={imagesData[wordIndex % imagesData.length].url}
                  alt="Gallery preview"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale"
                />
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>

              {/* Button text (on top of image) */}
              <span className="relative z-10 transition-all duration-300">
                Explore Gallery
              </span>
            </NavLink>

            <button className="group relative px-10 py-4 bg-[#ff66c4] backdrop-blur-sm border border-white/10 text-white font-semibold rounded-full overflow-hidden transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 flex items-center justify-center gap-0 group-hover:gap-3 min-w-[200px]">
              {/* Button text (no overlay, clean gradient) */}
              <span className="bg-[#ff66c4] bg-clip-text transition-all duration-300">
                Join the Club
              </span>

              {/* Arrow (clean, no overlay) */}
              <div className="flex items-center justify-center w-0 group-hover:w-5 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                <div className="absolute right-2 flex items-center justify-center w-10 h-10 rounded-full bg-white">
                  <i className="ri-arrow-right-up-line text-[#ff66c4] text-3xl font-light"></i>
                </div>
              </div>
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/40 animate-bounce">
            <div className="w-5 h-8 flex justify-center items-start">
              <i className="ri-arrow-down-s-line text-white/70 text-xl mt-1 animate-pulse"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Trail Images */}
      {trailImages}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};

export default ImageTrailHero;
