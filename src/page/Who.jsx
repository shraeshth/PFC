import React, { useEffect, useRef } from "react";
import "../index.css";
import SpotlightCard from "../components/SpotlightCard";
import TextTiltCard from "../components/TextTiltCard";

// Sidebar data with descriptive stats
const sidebarData = [
  {
    title: "Club Stats",
    icon: "ri-bar-chart-line",
    rows: [
      ["Founded", "2021 – Building a creative legacy"],
      ["Members", "120+ passionate photographers & filmmakers"],
      ["Awards", "8 – Recognized in competitions & exhibitions"],
      ["Annual Events", "5 – Celebrating creativity yearly"],
      ["Social Media Reach", "10k+ – Sharing our vision online"],
    ],
  },
];

// Activity / Approach cards
const cardData = [
  {
    title: "Our Approach to Photography",
    items: [
      "Observation – Training the eye to notice subtle details others might miss",
      "Expression – Using light, color, and composition to communicate emotion",
      "Connection – Capturing not just subjects, but the stories behind them",
    ],
  },
  {
    title: "Our Approach to Filmmaking",
    items: [
      "Narrative Craft – Building meaningful stories that resonate with audiences",
      "Experimentation – Exploring short films, documentaries, and creative formats",
      "Collaboration – Working as a team where every role shapes the final story",
    ],
  },
];

const TableCard = ({ title, icon, rows }) => (
  <TextTiltCard className="h-full">
    <SpotlightCard className="p-4 sm:p-6 border border-white/20 rounded-2xl bg-black/5 backdrop-blur-sm h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-white/90">
          <i className={icon}></i> {title}
        </h3>
        <table className="w-full text-left text-xs sm:text-sm">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-t border-white/20">
                <td className="py-2 font-medium text-white/80">{label}</td>
                <td className="py-2 text-white/60">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SpotlightCard>
  </TextTiltCard>
);

const Card = ({ title, items }) => (
  <TextTiltCard className="h-full">
    <SpotlightCard className="p-4 sm:p-6 border border-white/20 rounded-2xl space-y-4 bg-black/5 overflow-hidden h-full flex flex-col">
      <h4 className="text-xl sm:text-2xl font-bold mb-4 text-white text-center">
        {title}
      </h4>
      <ul className="space-y-2 text-xs sm:text-sm text-white/70 flex-1 flex flex-col justify-center">
        {items.map((item) => (
          <li
            key={item}
            className="hover:text-white/90 transition-colors duration-200 text-center"
          >
            {item}
          </li>
        ))}
      </ul>
    </SpotlightCard>
  </TextTiltCard>
);

function Who() {
  const refs = useRef({ header: null, main: null });

  useEffect(() => {
    if (!window.gsap) return;
    const { gsap } = window;

    const { header, main } = refs.current;
    gsap.set([header, main], { opacity: 0, y: 30 });

    const tl = gsap.timeline();
    tl.to([header, main], {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power2.out",
      stagger: 0.1,
    });
  }, []);

  return (
    <div className="min-h-screen text-white bg-black overflow-x-hidden mt-16 sm:mt-20">
      {/* Header */}
      <div
        ref={(el) => (refs.current.header = el)}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center"
      >
        <h1 className="text-3xl sm:text-5xl font-light mb-3 sm:mb-4">
          Who We Are?
        </h1>
        <p className="text-base sm:text-xl font-light text-white/80">
          A community of photographers and filmmakers turning moments into
          compelling stories through creativity and collaboration.
        </p>
      </div>

      {/* Main Content */}
      <div
        ref={(el) => (refs.current.main = el)}
        className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 sm:pb-40"
      >
        {/* Overview (Full Width, Center Aligned) */}
        <section className="mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white/90">
            Club Overview
          </h2>
          <p className="text-sm sm:text-lg text-white/75 max-w-4xl mx-auto">
            We are a passionate community of photographers and filmmakers
            capturing stories through the lens. Our club encourages creativity,
            collaboration, and continuous learning.
          </p>
        </section>

        {/* All three cards in one row with equal height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cardData.map((card) => (
            <Card key={card.title} {...card} />
          ))}
          {sidebarData.map((section) => (
            <TableCard key={section.title} {...section} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Who;
