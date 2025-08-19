import React, { useState } from "react";
import SpotlightCard from "./SpotlightCard";
import TextTiltCard from "./TextTiltCard"; // Make sure the path is correct

const AboutDescription = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      title: "Community",
      description:
        "A diverse community of artists capturing the world through their lenses",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
    {
      title: "Learning",
      description:
        "Workshops, photo walks, and hands-on experience for all skill levels",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 5v14H3V5h18m0-2H3c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V5c0-1.1-.9-2-2-2z" />
        </svg>
      ),
    },
    {
      title: "Excellence",
      description: "Participating in competitions and showcasing incredible talent",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.39 6.26L21 9l-5 3.64L17.78 21 12 17.77 6.22 21 7 12.64 2 9l6.61-.74L12 2z" />
        </svg>
      ),
    },
    {
      title: "Events",
      description: "Regular events, exhibitions, and collaborative projects",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H5V8h14v13z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-black text-white py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <div>
            <h2 className="text-4xl md:text-5xl font-thin mb-8 leading-tight">
              More than just a{" "}
              <span className="block text-gray-400">hobby</span>
            </h2>

            <div className="space-y-6 text-lg font-light leading-relaxed">
              <p>
                Our photography and filming club is a community of artists capturing the world 
                through their lenses. We've been busy freezing moments in time, painting stories 
                with light, and crafting narratives with our cameras.
              </p>

              <p>
                From the bustling streets of Kota to the serene countryside, our members have 
                explored, experimented, and expressed themselves in countless ways.
              </p>

              <p>
                Whether you're a seasoned shutterbug or just starting your journey, our club 
                offers a space to learn, grow, and connect with like-minded individuals.
              </p>
            </div>
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <TextTiltCard key={index}>
                <SpotlightCard className="p-6 border border-white/20 rounded-2xl transition-all duration-300 cursor-pointer">
                  <div
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-light mb-2">{feature.title}</h3>
                    <p className="text-sm font-light opacity-70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </SpotlightCard>
              </TextTiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDescription;
