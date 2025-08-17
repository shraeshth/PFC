import React from "react";
import ImageTrailHero from "../components/ImageTrail";
import VideoCarousel from "./VideoCarousel";
import About from "./About";
import Footer from "./footer";
import Navbar from "../components/Navbar";
import Background from "./Background";
import FooterText from "../components/FooterText";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Background />
      <Navbar />
      <ImageTrailHero />
      <VideoCarousel />
      <About />
      <Footer />
      <FooterText />
    </div>
  );
};

export default Hero;
