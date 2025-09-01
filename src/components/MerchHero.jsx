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
      <div className="relative z-20 w-full flex flex-col items-center mt-10 px-4">
        {/* Main Title */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none">
            WEAR
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none text-[#ea5eb4]">
            VISION
          </h1>
        </div>

        {/* Subtitle */}
        <p className="absolute top-1/2 -translate-y-1/2 text-3xl sm:text-4xl md:text-5xl font-homemade whitespace-nowrap">
          the
        </p>
      </div>
    </div>
  );
};

export default MerchHero;
