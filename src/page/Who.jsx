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
      ["Photo Walks", "75+ – Exploring streets and landscapes"],
      ["Annual Events", "5 – Celebrating creativity yearly"],
      ["Social Media Reach", "10k+ – Sharing our vision online"],
    ],
  },
];

// Activity cards
const cardData = [
  {
    title: "Photography",
    items: [
      "City photo walks – Capture urban stories and moments",
      "Nature & landscape shoots – Explore the beauty of the outdoors",
    ],
  },
  {
    title: "Filmmaking",
    items: [
      "Short film workshops – Learn and create compelling stories",
      "Documentary projects – Highlight real-world narratives",
    ],
  },
];

const TableCard = ({ title, icon, rows }) => (
  <TextTiltCard>
    <SpotlightCard className="p-4 sm:p-6 border border-white/20 rounded-2xl bg-black/5 backdrop-blur-sm">
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
    </SpotlightCard>
  </TextTiltCard>
);

const Card = ({ title, items }) => (
  <TextTiltCard>
    <SpotlightCard className="p-4 sm:p-6 border border-white/20 rounded-2xl space-y-4 bg-black/5 overflow-hidden">
      <h4 className="text-xl sm:text-2xl font-bold mb-4 text-white">{title}</h4>
      <ul className="space-y-2 text-xs sm:text-sm text-white/70">
        {items.map((item) => (
          <li
            key={item}
            className="hover:text-white/90 transition-colors duration-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </SpotlightCard>
  </TextTiltCard>
);

function Who() {
  const refs = useRef({ header: null, main: null, sidebar: null });

  useEffect(() => {
    if (!window.gsap) return;
    const { gsap } = window;

    const { header, main, sidebar } = refs.current;
    gsap.set([header, main, sidebar], { opacity: 0, y: 30 });

    const tl = gsap.timeline();
    tl.to([header, main, sidebar], {
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
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20"
      >
        <h1 className="text-3xl sm:text-5xl font-light mb-3 sm:mb-4">
          Who we Are?
        </h1>
        <p className="text-base sm:text-xl font-light text-white/80">
          Photography & Filming Club
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 sm:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Main Preview */}
          <div
            ref={(el) => (refs.current.main = el)}
            className="lg:col-span-3 space-y-8 sm:space-y-12"
          >
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white/90">
                Club Overview
              </h2>
              <p className="text-sm sm:text-lg text-white/75">
                We are a passionate community of photographers and filmmakers
                capturing stories through the lens. Our club encourages
                creativity, collaboration, and continuous learning.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
              {cardData.map((card) => (
                <Card key={card.title} {...card} />
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <aside
            ref={(el) => (refs.current.sidebar = el)}
            className="lg:col-span-2 space-y-4 sm:space-y-5"
          >
            {sidebarData.map((section) => (
              <TableCard key={section.title} {...section} />
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Who;
