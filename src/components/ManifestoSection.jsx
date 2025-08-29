import React from "react";
import useScrollAnimation from "./useScrollAnimation.js";

const ManifestoSection = () => {
  const manifestoRef = useScrollAnimation();

  return (
    <div
      ref={manifestoRef}
      className="relative h-screen text-white flex items-center justify-center overflow-hidden fade-in-up"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover grayscale"
        src="https://res.cloudinary.com/dbk50pszr/video/upload/q_auto,f_auto/0829_2_nvwun6.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="https://res.cloudinary.com/dbk50pszr/video/upload/so_0/0829_2_nvwun6.jpg"
      />

      {/* Foreground Content */}
      <div className="relative z-20 text-center px-8">
        <h2 className="text-6xl md:text-7xl font-light tracking-tight leading-tight">
          ONLY FOR
          <br />
          <span className="text-[#ea5eb4]">VISIONARIES</span>
        </h2>
        <p className="mt-8 text-lg font-figtree text-white leading-relaxed max-w-2xl mx-auto">
          Every frame tells a story. Every piece in this collection carries the
          vision of creators who dare to see differently.
        </p>
      </div>
    </div>
  );
};

export default ManifestoSection;
