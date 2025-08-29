import React from "react";
import useScrollAnimation from "./useScrollAnimation.js";

const FooterCTA = () => {
  const footerRef = useScrollAnimation();

  const marketingSections = [
    {
      title: "LIMITED EDITION DROPS",
      content:
        "Don’t follow the crowd—stand out. Each piece is crafted to flex your creativity and style. Once it’s gone, it’s gone.",
    },
    {
      title: "TRUSTED BY CREATORS",
      content:
        "From campus legends to online visionaries, thousands of creators rock this gear. Wear it, rep it, join the movement.",
    },
    {
      title: "SUPPORT YOUR PASSION",
      content:
        "Every purchase fuels new projects, fresh ideas, and bold experiments. Your style creates opportunity—own it.",
    },
  ];

  return (
    <div ref={footerRef} className="bg-black text-white py-16 fade-in-up">
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row gap-12">
        {/* Left Column: Heading + Button */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight leading-tight mb-8 text-left">
            WEAR THE
            <br />
            <span className="text-white">VISION</span>
          </h2>
          <button className="bg-[#ea5eb4] text-white rounded-4xl px-12 py-4 font-extrabold tracking-widest hover:scale-[1.02] transition-all duration-500 self-start">
            SHOP COLLECTION
          </button>
        </div>

        {/* Right Column: Marketing Content */}
        <div className="md:w-1/2 flex flex-col justify-center space-y-8 text-right">
          {marketingSections.map((section, i) => (
            <div key={i}>
              <h3 className="text-xl font-semibold tracking-wide mb-2">
                {section.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterCTA;
