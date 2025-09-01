import React, { useEffect, useState } from "react";
import useScrollAnimation from "./useScrollAnimation.js";

const MerchHero = () => {
  const heroRef = useScrollAnimation();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative h-screen text-white flex items-center justify-center overflow-hidden fade-in-up"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://res.cloudinary.com/dbk50pszr/video/upload/q_auto,f_auto/0829_1_do8l8t.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="https://res.cloudinary.com/dbk50pszr/video/upload/so_0/0829_1_do8l8t.jpg"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black" />

      {/* Hero Text */}
      <div className="text-center z-20 px-4 mt-15 flex flex-col items-center justify-center">
        <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none">
          WEAR
        </h1>
        <h1 className="text-7xl md:text-8xl font-bold tracking-tighter leading-none text-[#ea5eb4]">
          VISION
        </h1>

        <button className="bg-black/10 backdrop-blur-md mt-7 text-white rounded-4xl border-[0.1px] border-white/20 px-7 py-4 font-figtree text-sm hover:bg-[#ea5eb4] hover:text-white transition-colors duration-300">
          Coming Soon
        </button>
      </div>
    </div>
  );
};

export default MerchHero;
