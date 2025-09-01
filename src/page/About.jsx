import React, { useState, useEffect } from "react";
import AboutDescription from "../components/AboutDescription.jsx";
import TeamSection from "../components/TeamSection.jsx";
import MembershipSection from "../components/MembershipSection.jsx";
import FutureOutlook from "../components/FutureOutlook.jsx";
import ContactSection from "../components/ContactSection.jsx";
import HeroSection from "../components/HeroSection.jsx";
import useScrollAnimation from "../components/useScrollAnimation.js";

// Using Remix Icon classes instead of lucide-react
const sections = [
  {
    id: "about",
    label: "About",
    icon: "ri-user-3-fill",
    subcategories: ["Overview", "Mission"],
  },
  {
    id: "team",
    label: "Team",
    icon: "ri-shield-user-fill",
    subcategories: ["Leadership", "Members"],
  },
  {
    id: "membership",
    label: "Membership",
    icon: "ri-group-fill",
    subcategories: ["Rules", "Process"],
  },
  {
    id: "future",
    label: "Future",
    icon: "ri-calendar-fill",
    subcategories: ["Innovation", "Plans"],
  },
  {
    id: "contact",
    label: "Contact",
    icon: "ri-contacts-book-2-fill",
    subcategories: [],
  },
];

const AboutPage = () => {
  const featuresRef = useScrollAnimation();

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeSection, setActiveSection] = useState("about");

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMobileMenuOpen(false);
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".mobile-menu-button")
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="relative flex min-h-screen">
      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-button fixed top-4 left-4 z-[60] lg:hidden bg-black/20 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-[#e95eb4]/30 transition-all duration-300"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <i
          className={`ri-${mobileMenuOpen ? "close-fill" : "menu-fill"} text-xl`}
        />
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" />
      )}

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block fixed top-55 left-3 h-auto bg-white/10 border border-white/10 backdrop-blur-2xl text-gray-300 z-50 transition-all duration-300 rounded-2xl ${
          sidebarExpanded ? "w-48" : "w-13"
        }`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div className="px-2 py-3 flex flex-col space-y-2">
          {sections.map((section) => {
            const isExpanded = expandedSections[section.id];
            const isActive = activeSection === section.id;
            return (
              <div key={section.id} className="flex flex-col">
                <button
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    sidebarExpanded ? "hover:bg-[#e95eb4]/20" : ""
                  } ${isActive ? "bg-[#e95eb4]/30 text-[#e95eb4]" : ""}`}
                  onClick={() => {
                    scrollToSection(section.id);
                    toggleSection(section.id);
                  }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <i className={`${section.icon} text-lg`} />
                    <span
                      className={`font-light transition-all duration-300 whitespace-nowrap ${
                        sidebarExpanded ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {section.label}
                    </span>
                  </div>
                  {section.subcategories.length > 0 && sidebarExpanded && (
                    <i
                      className={`ri-arrow-right-s-fill text-sm transition-transform duration-300 ${
                        isExpanded ? "rotate-90" : "rotate-0"
                      }`}
                    />
                  )}
                </button>
                {isExpanded && sidebarExpanded && (
                  <div className="ml-7 mt-2 flex flex-col space-y-1">
                    {section.subcategories.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSection(section.id)}
                        className="text-left px-3 py-1.5 text-sm rounded-lg hover:bg-[#e95eb4]/20 transition-all duration-300 text-gray-400 hover:text-[#e95eb4]"
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

      {/* Mobile Navigation Menu */}
      <div
        className={`mobile-menu fixed top-0 left-0 h-full bg-black/90 backdrop-blur-xl text-white z-50 transition-transform duration-300 lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-72 sm:w-80`}
      >
        <div className="p-6 pt-20">
          <h3 className="text-xl font-light mb-6 text-white/90">Navigation</h3>
          <div className="flex flex-col space-y-3">
            {sections.map((section) => {
              const isExpanded = expandedSections[section.id];
              const isActive = activeSection === section.id;
              return (
                <div key={section.id} className="flex flex-col">
                  <button
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#e95eb4]/20 ${
                      isActive
                        ? "bg-[#e95eb4]/30 text-[#e95eb4]"
                        : "text-gray-300"
                    }`}
                    onClick={() => {
                      scrollToSection(section.id);
                      if (section.subcategories.length > 0) {
                        toggleSection(section.id);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <i className={`${section.icon} text-xl`} />
                      <span className="font-light text-base">
                        {section.label}
                      </span>
                    </div>
                    {section.subcategories.length > 0 && (
                      <i
                        className={`ri-arrow-right-s-fill text-sm transition-transform duration-300 ${
                          isExpanded ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="ml-12 mt-2 flex flex-col space-y-2">
                      {section.subcategories.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => scrollToSection(section.id)}
                          className="text-left px-4 py-2 text-sm rounded-lg hover:bg-[#e95eb4]/20 transition-all duration-300 text-gray-400 hover:text-[#e95eb4]"
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
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full">
        <div id="hero" className="w-full">
          <HeroSection />
        </div>
        <div className="w-full">
          <div id="about" className="scroll-mt-20">
            <AboutDescription />
          </div>
          <div id="team" className="scroll-mt-20">
            <TeamSection />
          </div>
          <div id="membership" className="scroll-mt-20">
            <MembershipSection />
          </div>
          <div id="future" className="scroll-mt-20">
            <FutureOutlook />
          </div>
          <div id="contact" className="scroll-mt-20">
            <ContactSection />
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/20 z-40">
        <div className="flex justify-around items-center py-2 px-2">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 min-w-0 flex-1 ${
                  isActive
                    ? "text-[#e95eb4] bg-[#e95eb4]/20"
                    : "text-gray-400 hover:text-[#e95eb4]"
                }`}
              >
                <i className={`${section.icon} text-lg mb-1`} />
                <span className="text-xs font-light truncate w-full text-center">
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
