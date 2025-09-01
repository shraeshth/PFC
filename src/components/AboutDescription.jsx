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
      icon: <i className="ri-team-fill text-4xl text-[#e95eb4]"></i>,
    },
    {
      title: "Learning",
      description:
        "Workshops, photo walks, and hands-on experience for all skill levels",
      icon: <i className="ri-book-2-fill text-4xl text-[#e95eb4]"></i>,
    },
    {
      title: "Excellence",
      description:
        "Participating in competitions and showcasing incredible talent",
      icon: <i className="ri-star-fill text-4xl text-[#e95eb4]"></i>,
    },
    {
      title: "Events",
      description: "Regular events, exhibitions, and collaborative projects",
      icon: <i className="ri-calendar-event-fill text-4xl text-[#e95eb4]"></i>,
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
              <span className="block text-[#e95eb4]">Hobby</span>
            </h2>

            <div className="space-y-6 text-lg font-light leading-relaxed font-figtree">
              <p>
                Our photography and filming club is a community of artists
                capturing the world through their lenses. We've been busy
                freezing moments in time, painting stories with light, and
                crafting narratives with our cameras.
              </p>

              <p>
                From the bustling streets of Kota to the serene countryside, our
                members have explored, experimented, and expressed themselves in
                countless ways.
              </p>

              <p>
                Whether you're a seasoned shutterbug or just starting your
                journey, our club offers a space to learn, grow, and connect
                with like-minded individuals.
              </p>
            </div>
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <TextTiltCard key={index}>
                <SpotlightCard className="h-full min-h-[220px] flex flex-col justify-between items-center text-center p-6 border border-white/20 rounded-2xl transition-all duration-300 cursor-pointer">
                  <div
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="flex flex-col items-center justify-between h-full"
                  >
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-light mb-2">{feature.title}</h3>
                    <p className="text-sm font-light opacity-70 font-figtree leading-relaxed">
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
