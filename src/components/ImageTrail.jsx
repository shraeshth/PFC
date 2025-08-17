import React, { createRef, useRef } from "react";
import pfclogo from "../assets/pfclogo 1.png"; // Adjust the path as necessary
import CubertoCursor from "./CubertoCursor"; // Ensure this path is correct
import img1 from "../assets/random/DSC02844.jpg";
import img2 from "../assets/random/DSC02846.jpg";
import img3 from "../assets/random/DSC02861.jpg";
import img4 from "../assets/random/DSC02882.jpg";

const ImageTrailHero = () => {
  const images = [img1, img2, img3, img4];

  const containerRef = useRef(null);
  const refs = useRef(images.map(() => createRef()));
  const currentZIndexRef = useRef(1);
  let globalIndex = 0;
  let last = { x: 0, y: 0 };

  const activate = (image, x, y) => {
    if (!image || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeX = x - containerRect.left;
    const relativeY = y - containerRect.top;
    
    // Direct DOM manipulation for better performance
    image.style.left = `${relativeX}px`;
    image.style.top = `${relativeY}px`;
    image.style.transform = `translate(-50%, -50%) scale(1) rotate(${Math.random() * 10 - 5}deg)`;
    
    // Z-index management
    if (currentZIndexRef.current > 40) {
      currentZIndexRef.current = 1;
    }
    image.style.zIndex = String(currentZIndexRef.current);
    currentZIndexRef.current++;
    
    // Set active state
    image.dataset.status = "active";
    
    // Auto fade after delay
    setTimeout(() => {
      if (image.dataset.status === "active") {
        image.dataset.status = "inactive";
      }
    }, 2000);

    last = { x, y };
  };

  const distanceFromLast = (x, y) => {
    return Math.hypot(x - last.x, y - last.y);
  };

  const deactivate = (image) => {
    if (image) {
      image.dataset.status = "inactive";
    }
  };

  const handleMouseMove = (e) => {
    // Optimized distance threshold
    if (distanceFromLast(e.clientX, e.clientY) > window.innerWidth / 20) {
      const lead = refs.current[globalIndex % refs.current.length].current;
      const tail = refs.current[(globalIndex - 5) % refs.current.length]?.current;

      if (lead) activate(lead, e.clientX, e.clientY);
      if (tail && globalIndex >= 5) deactivate(tail);
      globalIndex++;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      handleMouseMove(e.touches[0]);
    }
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      ref={containerRef}
      className="relative h-screen w-full border-white/40 mt-20 rounded-7xl overflow-hidden"
    >
      <CubertoCursor />
      {/* Content - Higher z-index */}
      <div className="relative z-50 flex flex-col items-center justify-center min-h-screen text-center mt-0">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-white leading-tight mb-6 max-w-3xl">
          Capturing Moments, Creating Stories
        </h1>

        <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto mb-8 font-light leading-relaxed">
          The Photography & Filming Club is where passion meets lens. From
          timeless portraits to cinematic films, we turn every frame into art.
        </p>

        <button className="bg-transparent border border-white/30 text-white px-8 py-3 rounded-full text-base font-medium hover:bg-white hover:text-black transition-all duration-300 mb-16 tracking-wide">
          Join
        </button>

        <div className="group cursor-pointer animate-bounce hover:animate-none transition-all duration-300 hover:scale-110 hover:bg">
          <i className="ri-arrow-down-s-line text-2xl text-white/80 group-hover:text-white group-hover:translate-y-1 transition-all duration-300 ease-out"></i>
        </div>
      </div>

      {/* Image Trail - Behind content */}
      {images.map((src, index) => (
        <img
          key={index}
          ref={refs.current[index]}
          src={src}
          alt=""
          className="absolute w-40 h-48 object-cover pointer-events-none rounded-md opacity-0 scale-0 transition-all duration-500 ease-out data-[status='active']:opacity-100 data-[status='active']:scale-100 data-[status='inactive']:opacity-0 data-[status='inactive']:scale-75"
          style={{
            filter: "saturate(0.9) contrast(1.1)",
            transform: "translate(-50%, -50%) scale(0)",
            willChange: "transform, opacity",
            zIndex: 1,
          }}
          data-index={index}
          data-status="inactive"
        />
      ))}
    </section>
  );
};

export default ImageTrailHero;