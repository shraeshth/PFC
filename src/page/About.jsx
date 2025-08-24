import React, { useState, useEffect } from "react";
import { Users, Shield, Calendar, ChevronRight, Menu, X } from "lucide-react";
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
    setMobileMenuOpen(false); // Close mobile menu after navigation
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
        className="mobile-menu-button fixed top-4 left-4 z-[60] lg:hidden bg-black/20 backdrop-blur-md border border-white/20 text-white p-3 rounded-full hover:bg-white/10 transition-all duration-300"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id];
            const isActive = activeSection === section.id;
            return (
              <div key={section.id} className="flex flex-col">
                <button
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    sidebarExpanded ? "hover:bg-white/10" : ""
                  } ${isActive ? "bg-black/20 text-white/90" : ""}`}
                  onClick={() => {
                    scrollToSection(section.id);
                    toggleSection(section.id);
                  }}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Icon size={18} className="flex-shrink-0" />
                    <span
                      className={`font-light transition-all duration-300 whitespace-nowrap ${
                        sidebarExpanded ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {section.label}
                    </span>
                  </div>
                  {section.subcategories.length > 0 && sidebarExpanded && (
                    <ChevronRight
                      size={16}
                      className={`transition-transform duration-300 flex-shrink-0 ${
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
                        className="text-left px-3 py-1.5 text-sm rounded-lg hover:bg-black/10 transition-all duration-300 text-gray-400 hover:text-white/80"
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
              const Icon = section.icon;
              const isExpanded = expandedSections[section.id];
              const isActive = activeSection === section.id;
              return (
                <div key={section.id} className="flex flex-col">
                  <button
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 ${
                      isActive ? "bg-white/20 text-white" : "text-gray-300"
                    }`}
                    onClick={() => {
                      scrollToSection(section.id);
                      if (section.subcategories.length > 0) {
                        toggleSection(section.id);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <Icon size={20} className="flex-shrink-0" />
                      <span className="font-light text-base">
                        {section.label}
                      </span>
                    </div>
                    {section.subcategories.length > 0 && (
                      <ChevronRight
                        size={18}
                        className={`transition-transform duration-300 flex-shrink-0 ${
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
                          className="text-left px-4 py-2 text-sm rounded-lg hover:bg-white/5 transition-all duration-300 text-gray-400 hover:text-white/80"
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
        {/* Hero Section */}
        <div id="hero" className="w-full">
          <HeroSection />
        </div>

        {/* Content Sections */}
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

      {/* Bottom Navigation for Mobile (Alternative) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/20 z-40">
        <div className="flex justify-around items-center py-2 px-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 min-w-0 flex-1 ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-gray-400 hover:text-white/80"
                }`}
              >
                <Icon size={18} className="mb-1 flex-shrink-0" />
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
