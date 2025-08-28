import React from "react";
import CapsuleImage from "./CapsuleImage";
import DynamicTitle from "./DynamicTitle";

const HeroContent = () => {
  return (
    <div className="relative z-200 backdrop-blur-[5px] flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 pointer-events-none">
      <div className="pointer-events-auto max-w-6xl mx-auto">
        {/* ✅ Only this one animates */}
        <DynamicTitle />

        {/* ✅ This is static (no animation) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.1] tracking-tight">
            Creating Stories
          </h1>
          <CapsuleImage />
        </div>

        {/* Subtitle */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <p className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed font-light tracking-wide">
            Where passion meets lens. From timeless portraits to cinematic
            films, we turn every frame into art.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button className="group relative px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            <span className="relative z-10">Explore Gallery</span>
          </button>
          <button className="group px-8 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Join the Club
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
