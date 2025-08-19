import React from "react";
import useScrollAnimation from "./useScrollAnimation.js";

const ManifestoSection = () => {
  const manifestoRef = useScrollAnimation();

  return (
    <div
      ref={manifestoRef}
      className="relative py-32 fade-in-up text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1586396847415-2c76ae7e79fc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional overlay for readability */}
      <div className=" bg-opacity-50 py-32">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-6xl md:text-7xl font-light tracking-tight leading-tight">
              ONLY FOR
              <br />
              <span className="text-gray-300">VISIONARIES</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Every frame tells a story. Every piece in this collection carries
              the vision of creators who dare to see differently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManifestoSection;
