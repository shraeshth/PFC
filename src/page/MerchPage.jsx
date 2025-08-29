import React, { useEffect } from "react";
import MerchHero from "../components/MerchHero";
import MerchGrid from "../components/MerchGrid";
import StatsSection from "../components/StatsSection";
import ManifestoSection from "../components/ManifestoSection";
import FeaturesSection from "../components/FeaturesSection";
import FooterCTA from "../components/FooterCTA";

const MerchPage = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .fade-in-up {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .fade-in-up.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen">
      <MerchHero />
      <FeaturesSection />
      <MerchGrid />
      <ManifestoSection />
      <FooterCTA />
    </div>
  );
};

export default MerchPage;
