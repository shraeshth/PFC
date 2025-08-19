import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import useScrollAnimation from "./useScrollAnimation.js";

const HeroSection = () => {
  const featuresRef = useScrollAnimation();
  const [currentText, setCurrentText] = useState(0);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  
  const heroTexts = [
    "Capturing Moments in Time",
    "Painting Stories with Light", 
    "Crafting Narratives with Cameras",
    "Where Art Meets Technology",
  ];



  // Text change animation
  useEffect(() => {
    const animateTextChange = () => {
      if (!textRef.current) return;

      const tl = gsap.timeline();
      
      // Exit animation - subtle fade and slide
      tl.to(textRef.current, {
        duration: 0.4,
        opacity: 0,
        y: -20,
        scale: 0.95,
        ease: "power2.in",
      })
      // Update text in the middle of animation
      .call(() => {
        setCurrentText((prev) => (prev + 1) % heroTexts.length);
      })
      // Enter animation - fade in and slide up
      .to(textRef.current, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power2.out",
      });
    };

    const interval = setInterval(animateTextChange, 3500);
    return () => clearInterval(interval);
  }, [heroTexts.length]);



  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center text-white px-6"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center space-y-6 mt-20">
        <div className="relative overflow-hidden">
          <p 
            ref={textRef}
            className="text-5xl md:text-7xl font-bold tracking-widest text-white/90"
          >
            {heroTexts[currentText]}
          </p>
        </div>

        <div className="flex justify-evenly items-center mt-8 py-5 text-white backdrop-blur-2xl bg-black/10 border-[0.1px] border-white/10 rounded-4xl">
          <div className="flex items-center justify-center flex-col px-8 border-r border-white/50">
            <div className="text-3xl font-thin">50+</div>
            <div className="text-sm uppercase tracking-widest">
              Active Members
            </div>
          </div>

          <div className="flex pr-22 items-center justify-center flex-col px-8 border-r border-white/50">
            <div className="text-3xl font-thin">15+</div>
            <div className="text-sm uppercase tracking-widest">Events</div>
          </div>

          <div className="flex items-center justify-center flex-col px-8">
            <div className="text-3xl font-thin">3</div>
            <div className="text-sm uppercase tracking-widest">Years</div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default HeroSection;