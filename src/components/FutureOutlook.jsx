import React, { useState, useRef } from "react";
import {
  Lightbulb,
  Users,
  Handshake,
  Globe,
  Trophy,
  Leaf,
  Monitor,
  Zap,
} from "lucide-react";

// Spotlight wrapper
const SpotlightCard = ({ children, className = "" }) => {
  const ref = useRef();

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--mouse-x", `${x}px`);
    ref.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      className={`card-spotlight relative ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
};

const FutureOutlook = () => {
  const [activeCategory, setActiveCategory] = useState("innovation");

  const innovations = [
    {
      icon: <Monitor size={24} />,
      title: "Digital Evolution",
      description:
        "Embracing latest digital photography and videography techniques with cutting-edge equipment",
    },
    {
      icon: <Zap size={24} />,
      title: "New Genres",
      description:
        "Exploring documentary, experimental, and fine art photography and filmmaking",
    },
    {
      icon: <Globe size={24} />,
      title: "Emerging Tech",
      description:
        "Utilizing drones, VR, AR, and other technologies to enhance creative projects",
    },
    {
      icon: <Leaf size={24} />,
      title: "Sustainability",
      description:
        "Adopting eco-friendly equipment and reducing carbon footprint in our activities",
    },
  ];

  const futurePlans = [
    {
      icon: <Users size={24} />,
      title: "Expanding Membership",
      description:
        "Recruit passionate students fostering diverse and inclusive environment",
      timeline: "Ongoing",
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Enhanced Workshops",
      description:
        "Regular training sessions by experienced professionals with industry standards",
      timeline: "Every Month",
    },
    {
      icon: <Handshake size={24} />,
      title: "Cross-Club Collaborations",
      description:
        "Partner with other clubs and departments for unique projects and broader reach",
      timeline: "Each Semester",
    },
    {
      icon: <Trophy size={24} />,
      title: "Competitions & Festivals",
      description:
        "Participate in various contests to showcase talent and gain recognition",
      timeline: "Throughout Year",
    },
  ];

  const categories = [
    { id: "innovation", label: "Innovation", icon: <Lightbulb size={18} /> },
    { id: "plans", label: "Future Plans", icon: <Users size={18} /> },
  ];

  return (
    <section className="bg-black text-white py-24 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-thin mb-6">
            Future <span className="text-white/70">Outlook</span>
          </h2>
          <p className="text-lg font-light text-white/70 max-w-2xl mx-auto leading-relaxed">
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
                className={`px-8 py-3 flex items-center space-x-2 transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-white text-black"
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
                Innovation at the <span className="text-white/70">Core</span>
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {innovations.map((item, index) => (
                  <SpotlightCard
                    key={index}
                    className="p-8 border border-white/20 rounded-2xl"
                  >
                    <div className="text-center">
                      <div className="mb-6 flex justify-center text-white">
                        {item.icon}
                      </div>
                      <h4 className="text-lg font-light mb-4">{item.title}</h4>
                      <p className="text-sm font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          )}

          {/* Future Plans Tab */}
          {activeCategory === "plans" && (
            <div>
              <h3 className="text-2xl font-light mb-12 text-center">
                Strategic <span className="text-white/70">Roadmap</span>
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {futurePlans.map((plan, index) => (
                  <SpotlightCard
                    key={index}
                    className="p-8 border border-white/20 rounded-2xl"
                  >
                    <div className="text-center">
                      <div className="mb-6 flex justify-center text-white">
                        {plan.icon}
                      </div>
                      <h4 className="text-lg font-light mb-4">{plan.title}</h4>
                      <p className="text-sm font-light leading-relaxed">
                        {plan.description}
                      </p>
                      <span className="mt-4 inline-block text-sm font-light border border-white/20 px-3 py-1 rounded-full">
                        {plan.timeline}
                      </span>
                    </div>
                  </SpotlightCard>
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
