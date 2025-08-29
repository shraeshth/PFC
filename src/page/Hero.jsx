import React from "react";
import ImageTrailHero from "../components/ImageTrailHero";
import VideoCarousel from "./VideoCarousel";
import Who from "./Who";
import Footer from "../components/Footer";
import LogoCarousel from "../components/LogoCarousel";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <ImageTrailHero />
      <VideoCarousel />
      <LogoCarousel />
      <Who />
      <Footer />
    </div>
  );
};

export default Hero;
