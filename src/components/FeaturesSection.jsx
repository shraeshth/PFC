import React from "react";
import useScrollAnimation from "./useScrollAnimation.js";

const FeaturesSection = () => {
  const featuresRef = useScrollAnimation();
  const features = [
    {
      title: "DESIGNED BY CREATORS",
      subtitle: "For creators",
      number: "01",
      image:
        "https://res.cloudinary.com/dbk50pszr/image/upload/v1756481180/ChatGPT_Image_Aug_27_2025_06_58_47_PM_hpszaa.png",
      type: "image",
    },
    {
      title: "LIMITED EDITION",
      subtitle: "Campus exclusive",
      number: "02",
      image:
        "https://res.cloudinary.com/dbk50pszr/image/upload/v1755506522/T1_znwgs6.png",
      type: "image",
    },
    {
      title: "FUNDS NEW PROJECTS",
      subtitle: "Support the vision",
      number: "03",
      image:
        "https://res.cloudinary.com/dbk50pszr/image/upload/v1756481178/generated-image-f3c72577-0414-4ffe-8472-0a67ff0b610b_kdpny0.png",
      type: "image",
    },
  ];

  return (
    <div
      ref={featuresRef}
      className="relative fade-in-up px-4 md:px-8 lg:px-16"
    >
      <div className="flex flex-col md:flex-row w-full gap-6">
        {features.map((feature, i) => (
          <div
            key={i}
            className="relative flex-1 h-64 md:h-80 lg:h-96 overflow-hidden rounded-3xl"
          >
            {/* Background media */}
            {feature.type === "image" ? (
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover opacity-20 bg-[#E95EB4]"
              />
            ) : (
              <iframe
                src={feature.video}
                title={feature.title}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                frameBorder="0"
                className="absolute inset-0 w-full h-full opacity-30"
                style={{
                  objectFit: "cover",
                  border: "none",
                }}
              />
            )}

            {/* Text content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
              <div className="text-5xl md:text-6xl font-light text-[#ea5eb4]">
                {feature.number}
              </div>
              <h3 className="font-medium font-figtree text-base md:text-lg tracking-wide mb-1 mt-2">
                {feature.title}
              </h3>
              <p className="text-white/60 font-figtree text-sm md:text-base tracking-wide">
                {feature.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
