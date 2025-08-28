import React from "react";
import ImageTrailHero from "../components/ImageTrail";
import VideoCarousel from "./VideoCarousel";
import Who from "./Who";
import Footer from "../components/Footer";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <ImageTrailHero />
      <VideoCarousel />
      <Who />
      <Footer />
    </div>
  );
};

export default Hero;
