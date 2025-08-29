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
      video:
        "https://player.cloudinary.com/embed/?cloud_name=dbk50pszr&public_id=0829_1_do8l8t&profile=cld-default&autoplay=true&muted=true&loop=true&controls=false",
      type: "video",
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
    <div ref={featuresRef} className="relative fade-in-up mt-30 mb-20 p-15">
      <div className="flex w-full">
        {features.map((feature, i) => (
          <div key={i} className="relative w-1/3 h-96 overflow-hidden">
            {/* Background media */}
            {feature.type === "image" ? (
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30 rounded-3xl"
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
              <div className="text-6xl font-light text-[#ea5eb4] transition-colors duration-500">
                {feature.number}
              </div>
              <h3 className="font-medium font-figtree text-lg tracking-wide mb-1 mt-2">
                {feature.title}
              </h3>
              <p className="text-white/50 font-figtree text-sm tracking-wide">
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
