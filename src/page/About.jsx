import React, { useState, useEffect } from "react";
import { Users, Shield, Calendar, ChevronRight } from "lucide-react";
import AboutDescription from "../components/AboutDescription.jsx";
import TeamSection from "../components/TeamSection.jsx";
import MembershipSection from "../components/MembershipSection.jsx";
import FutureOutlook from "../components/FutureOutlook.jsx";
import ContactSection from "../components/ContactSection.jsx";
import HeroSection from "../components/HeroSection.jsx";

import useScrollAnimation from "../components/useScrollAnimation.js";

const sections = [
  {
    id: "about",
    label: "About",
    icon: Users,
    subcategories: ["Overview", "Mission"],
  },
  {
    id: "team",
    label: "Team",
    icon: Shield,
    subcategories: ["Leadership", "Members"],
  },
  {
    id: "membership",
    label: "Membership",
    icon: Users,
    subcategories: ["Rules", "Process"],
  },
  {
    id: "future",
    label: "Future",
    icon: Calendar,
    subcategories: ["Innovation", "Plans"],
  },
  { id: "contact", label: "Contact", icon: Users, subcategories: [] },
];

const AboutPage = () => {
  const featuresRef = useScrollAnimation();

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeSection, setActiveSection] = useState("about");

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  // Track which section is in view
  useEffect(() => {
    const handleScroll = () => {
      let current = activeSection;
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= window.innerHeight / 2) {
            current = section.id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <div className="relative flex min-h-screen mt">
      {/* Sidebar */}
      <div
        className={`fixed mt-35 top-15 left-3 h-auto bg-white/10 border-[0.1px] border-white/10 backdrop-blur-2xl text-[#b0b0b0] z-50 transition-all duration-300 rounded-4xl ${
          sidebarExpanded ? "w-47" : "w-13"
        }`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div className="px-2 py-3 flex flex-col space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id];
            const isActive = activeSection === section.id;
            return (
              <div key={section.id} className="flex flex-col">
                <button
                  className={`flex items-center justify-between p-2 rounded-4xl cursor-pointer transition-all duration-300 ${
                    sidebarExpanded ? "hover:bg-white/10" : ""
                  } ${isActive ? "bg-black/20 text-white/80" : ""}`}
                  onClick={() => {
                    scrollToSection(section.id);
                    toggleSection(section.id);
                  }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Icon size={20} />
                    <span
                      className={`font-light transition-all duration-300 ${
                        sidebarExpanded ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {section.label}
                    </span>
                  </div>
                  {section.subcategories.length > 0 && sidebarExpanded && (
                    <ChevronRight
                      size={18}
                      className={`transition-transform duration-300 ${
                        isExpanded ? "rotate-90" : "rotate-0"
                      }`}
                    />
                  )}
                </button>
                {isExpanded && sidebarExpanded && (
                  <div className="ml-8 mt-2 flex flex-col space-y-1">
                    {section.subcategories.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSection(section.id)}
                        className="text-left px-3 py-2 text-sm rounded-2xl hover:bg-black/10 transition-all duration-300"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full">
        <div id="hero">
          <HeroSection />
        </div>
        <div id="about">
          <AboutDescription />
        </div>
        <div id="team">
          <TeamSection />
        </div>
        <div id="membership">
          <MembershipSection />
        </div>
        <div id="future">
          <FutureOutlook />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
