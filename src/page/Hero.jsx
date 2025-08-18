import React from "react";
import ImageTrailHero from "../components/ImageTrail";
import VideoCarousel from "./VideoCarousel";
import Background from "./Background";
import Who from "./Who";
import Footer from "../components/Footer";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Background />
      <ImageTrailHero />
      <VideoCarousel />
      <Who />
      <Footer />
    </div>
  );
};

export default Hero;
