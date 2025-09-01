import React, { useState } from "react";
import SpotlightCard from "./SpotlightCard";
import TextTiltCard from "./TextTiltCard";

const FutureOutlook = () => {
  const [activeCategory, setActiveCategory] = useState("innovation");

  const innovations = [
    {
      icon: <i className="ri-macbook-fill text-2xl"></i>,
      title: "Digital Evolution",
      description:
        "Embracing latest digital photography and videography techniques with cutting-edge equipment",
    },
    {
      icon: <i className="ri-flashlight-fill text-2xl"></i>,
      title: "New Genres",
      description:
        "Exploring documentary, experimental, and fine art photography and filmmaking",
    },
    {
      icon: <i className="ri-earth-fill text-2xl"></i>,
      title: "Emerging Tech",
      description:
        "Utilizing drones, VR, AR, and other technologies to enhance creative projects",
    },
    {
      icon: <i className="ri-leaf-fill text-2xl"></i>,
      title: "Sustainability",
      description:
        "Adopting eco-friendly equipment and reducing carbon footprint in our activities",
    },
  ];

  const futurePlans = [
    {
      icon: <i className="ri-user-star-fill text-2xl"></i>,
      title: "Expanding Membership",
      description:
        "Recruit passionate students fostering diverse and inclusive environment",
      timeline: "Ongoing",
    },
    {
      icon: <i className="ri-lightbulb-flash-fill text-2xl"></i>,
      title: "Enhanced Workshops",
      description:
        "Regular training sessions by experienced professionals with industry standards",
      timeline: "Every Month",
    },
    {
      icon: <i className="ri-shake-hands-fill text-2xl"></i>,
      title: "Cross-Club Collaborations",
      description:
        "Partner with other clubs and departments for unique projects and broader reach",
      timeline: "Frequently",
    },
    {
      icon: <i className="ri-trophy-fill text-2xl"></i>,
      title: "Competitions & Festivals",
      description:
        "Participate in various contests to showcase talent and gain recognition",
      timeline: "Throughout Year",
    },
  ];

  const categories = [
    {
      id: "innovation",
      label: "Innovation",
      icon: <i className="ri-lightbulb-fill"></i>,
    },
    {
      id: "plans",
      label: "Future Plans",
      icon: <i className="ri-user-fill"></i>,
    },
  ];

  return (
    <section className="text-white py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-thin mb-6">
            Future <span className="text-[#e95eb4]">Outlook</span>
          </h2>
          <p className="text-lg font-figtree font-light text-white/70 max-w-2xl mx-auto leading-relaxed">
            Our club envisions a future marked by growth, innovation, and a
            strong sense of community
          </p>
        </div>

        {/* Category Toggle */}
        <div className="flex justify-center mb-16">
          <div className="flex border border-white/20 rounded-2xl overflow-hidden">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-8 py-3 flex items-center space-x-2 font-bold transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-[#ff66c4] text-white"
                    : "bg-transparent text-white"
                }`}
              >
                {category.icon}
                <span className="font-light">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-96">
          {/* Innovation Tab */}
          {activeCategory === "innovation" && (
            <div>
              <h3 className="text-2xl font-light mb-12 text-center">
                Innovation at the <span className="text-[#e95eb4]">Core</span>
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {innovations.map((item, index) => (
                  <TextTiltCard key={index}>
                    <SpotlightCard className="rounded-xl">
                      <div className="p-8 border border-white/10 rounded-2xl h-[250px] flex flex-col justify-between">
                        <div className="text-center">
                          <div className="mb-6 flex justify-center text-[#ff66c4]">
                            {item.icon}
                          </div>
                          <h4 className="text-lg font-light mb-4">
                            {item.title}
                          </h4>
                          <p className="text-sm font-light font-figtree leading-relaxed text-white/70">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </SpotlightCard>
                  </TextTiltCard>
                ))}
              </div>
            </div>
          )}

          {/* Future Plans Tab */}
          {activeCategory === "plans" && (
            <div>
              <h3 className="text-2xl font-light mb-12 text-center">
                Strategic <span className="text-[#e95eb4]">Roadmap</span>
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {futurePlans.map((plan, index) => (
                  <TextTiltCard key={index}>
                    <SpotlightCard>
                      <div className="p-8 border border-white/10 rounded-2xl h-[320px] flex flex-col justify-between">
                        <div className="text-center">
                          <div className="mb-6 flex justify-center text-[#ff66c4]">
                            {plan.icon}
                          </div>
                          <h4 className="text-lg font-light mb-4">
                            {plan.title}
                          </h4>
                          <p className="text-sm font-light font-figtree leading-relaxed text-white/70">
                            {plan.description}
                          </p>
                          <span className="mt-4 text-white font-bold inline-block text-sm border border-[#e95eb4] bg-[#e95eb4] px-3 py-1 rounded-full">
                            {plan.timeline}
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </TextTiltCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FutureOutlook;
