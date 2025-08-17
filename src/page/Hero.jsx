import React from "react";
import ImageTrailHero from "../components/ImageTrail";
import VideoCarousel from "./VideoCarousel";
import Background from "./Background";
import About from "./About";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Background />
      <ImageTrailHero />
      <VideoCarousel />
      <About />
    </div>
  );
};

export default Hero;
