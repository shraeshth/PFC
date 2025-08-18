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
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1734581720105-79b670992e46?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Minimal nav */}
      <nav className="absolute top-8 left-8 right-8 flex justify-between items-center z-20 text-sm">
        <div className="flex items-center space-x-8">
          <span className="font-light tracking-widest">PHOTO CLUB</span>
          <span className="text-gray-300">{time}</span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-gray-300">LIMITED DROP</span>
        </div>
      </nav>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-white/20"></div>
          ))}
        </div>
      </div>

      {/* Hero Text */}
      <div className="text-center z-20 px-4 flex flex-col items-center justify-center">
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-none">
          FRAME
        </h1>
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-none text-gray-300">
          VISION
        </h1>

        <div className="mt-12 flex items-center justify-center gap-4 text-sm tracking-widest uppercase">
          <span>LIMITED</span>
          <div className="flex-1 h-px bg-white"></div>
          <span>MERCH</span>
          <div className="flex-1 h-px bg-white"></div>
          <span>DROP</span>
        </div>

        <button className="bg-white mt-7 text-black rounded-2xl px-5 py-2 text-sm tracking-widest hover:bg-gray-100 transition-colors duration-300">
          Coming Soon
        </button>
      </div>
    </div>
  );
};

export default MerchHero;
