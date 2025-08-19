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
        "https://images.unsplash.com/photo-1626781309887-cdfb9f258c64?q=80&w=1323&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "LIMITED EDITION",
      subtitle: "Campus exclusive",
      number: "02",
      image:
        "https://images.unsplash.com/photo-1721637686340-de9f8cebda5a?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "FUNDS NEW PROJECTS",
      subtitle: "Support the vision",
      number: "03",
      image:
        "https://images.unsplash.com/photo-1631902112544-2271267abb73?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div ref={featuresRef} className="relative fade-in-up">
      <div className="flex w-full">
        {features.map((feature, i) => (
          <div key={i} className="relative w-1/3 h-96">
            {/* Background image */}
            <img
              src={feature.image}
              alt={feature.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            {/* Text content */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
              <div className="text-6xl font-light text-gray-300 group-hover:text-black transition-colors duration-500">
                {feature.number}
              </div>
              <h3 className="font-medium text-lg tracking-wide mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm tracking-wide">
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
