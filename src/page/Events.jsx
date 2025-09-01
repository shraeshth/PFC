import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextTiltCard from "../components/TextTiltCard";
import eventsData from "../JSON/Events.json";

// Utility functions
const formatDate = (dateString) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// EventCard with fixed heights and responsive design
const EventCard = React.memo(({ event, isUpcoming }) => {
  const [expanded, setExpanded] = useState(false);

  const handleRegister = () => {
    console.log("Register for event:", event.title);
  };

  // Responsive description lengths based on screen size
  const getDescriptionLength = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 100; // lg screens
      if (window.innerWidth >= 768) return 80; // md screens
      return 60; // sm screens
    }
    return 80; // default
  };

  const [descLength, setDescLength] = useState(getDescriptionLength());

  useEffect(() => {
    const handleResize = () => {
      setDescLength(getDescriptionLength());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shortDescription =
    event.description.length > descLength
      ? event.description.substring(0, descLength) + "..."
      : event.description;

  const needsExpansion = event.description.length > descLength;

  return (
    <TextTiltCard>
      <div className="bg-white/5 backdrop-blur-xl min-h-[100px] sm:min-h-[250px] md:min-h-[280px] lg:h-[500px] border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/10 flex flex-col">
        {/* Fixed Banner Height */}
        <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden flex-shrink-0">
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Type Badge */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
            <div className="flex items-center gap-1 font-figtree px-2 py-1 sm:px-3 sm:py-1 bg-black/20 backdrop-blur-md rounded-full border border-white/20">
              {event.type.toLowerCase().includes("photo") ? (
                <i className="ri-camera-3-line text-white text-xs" />
              ) : (
                <i className="ri-video-line text-white text-xs" />
              )}
              <span className="text-white text-xs font-light uppercase tracking-wide hidden sm:inline">
                {event.type}
              </span>
            </div>
          </div>

          {/* Upcoming Badge */}
          {isUpcoming && (
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
              <div className="px-2 py-1 sm:px-3 sm:py-1 bg-emerald-500/80 backdrop-blur-md rounded-full">
                <span className="text-white text-xs font-figtree font-medium uppercase tracking-wide">
                  Live
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content - Flexible Height */}
        <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <h3 className="text-white text-base sm:text-lg font-medium leading-tight flex-1 mr-2 line-clamp-2">
              {event.title}
            </h3>
            <div className="text-xs text-white/60 text-right font-figtree whitespace-nowrap">
              {formatDate(event.date).split(",")[1]}
            </div>
          </div>

          {/* Date & Location */}
          <div className="flex items-center font-figtree gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs text-white/70">
            <div className="flex items-center justify-center gap-1">
              <i className="ri-time-line w-3 h-auto" />
              <span className="text-sm">{event.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <i className="ri-map-pin-line w-3 h-auto" />
              <span className="truncate max-w-full text-xs">
                {event.location}
              </span>
            </div>
          </div>

          {/* Description - Fixed Height Container */}
          <div className="mb-3 sm:mb-4 flex-1 w-full font-figtree">
            <div
              className={
                expanded ? "h-auto" : "max-h-16 sm:h-auto overflow-hidden"
              }
            >
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                {expanded ? event.description : shortDescription}
              </p>
            </div>

            {/* See More Toggle */}
            {needsExpansion && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-[#ff66c4] hover:text-[#ff80d0] mt-2 flex items-center gap-1"
              >
                <span>{expanded ? "Show Less" : "Read More"}</span>
                <i
                  className={`ri-arrow-${
                    expanded ? "up" : "down"
                  }-s-line text-xs`}
                />
              </button>
            )}
          </div>

          {/* Tags - Fixed Height */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 font-figtree sm:mb-4 h-auto overflow-hidden">
            {event.tags.slice(0, 2).map((tag, index) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60 font-light"
              >
                {tag}
              </span>
            ))}
            {event.tags.length > 2 && (
              <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/40 font-light">
                +{event.tags.length - 2}
              </span>
            )}
          </div>

          {/* Register button - Fixed at bottom */}
          {isUpcoming && (
            <motion.button
              onClick={handleRegister}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#ff66c4] text-white py-2 sm:py-3 px-4 sm:px-6 font-medium text-xs sm:text-sm rounded-2xl transition-all duration-300 mt-auto"
            >
              Register Now
            </motion.button>
          )}
        </div>
      </div>
    </TextTiltCard>
  );
});

// EventsGrid with improved animations
const EventsGrid = React.memo(({ events, isUpcomingTab }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.children;
    if (!cards) return;

    Array.from(cards).forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px) scale(0.95)";

      setTimeout(() => {
        card.style.transition = "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
        card.style.opacity = "1";
        card.style.transform = "translateY(0px) scale(1)";
      }, index * 100);
    });
  }, [events]);

  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 mx-auto mb-6 border border-white/10 rounded-3xl flex items-center justify-center bg-white/5 backdrop-blur-sm">
          <i className="ri-calendar-line text-3xl text-white/40" />
        </div>
        <h3 className="text-2xl font-light text-white mb-3">No Events Found</h3>
        <p className="text-white/60 font-light max-w-md mx-auto">
          No events match your current selection. Try adjusting your filters or
          check back later.
        </p>
      </motion.div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} isUpcoming={isUpcomingTab} />
      ))}
    </div>
  );
});

// Main Events Component with improved design
const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Use broad_filter for filtering
  const filteredEvents = useMemo(() => {
    let filtered = eventsData.filter(
      (event) => event.availability === activeTab
    );

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (event) => event.broad_filter === selectedCategory
      );
    }

    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [activeTab, selectedCategory]);

  // Build category list from broad_filter
  const categories = useMemo(() => {
    const uniqueBroadFilters = [
      ...new Set(eventsData.map((event) => event.broad_filter)),
    ];
    return ["all", ...uniqueBroadFilters].map((cat) => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dbk50pszr/image/upload/v1755506377/IMG_20221228_214630_oe19hk.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/90" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="relative w-full min-h-[60vh] mt-15 flex justify-center items-center overflow-hidden">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative text-center px-4 flex justify-center items-center flex-col"
          >
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-light mb-6 leading-tight text-white">
              Club Events
            </h1>
            <p className="text-lg md:text-xl font-figtree font-light text-white max-w-2xl mx-auto leading-relaxed">
              Masterclasses, workshops, and exhibitions crafted for visual
              storytellers
            </p>
          </motion.div>
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-4"
        >
          {/* Tabs + Filter Wrapper */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-between">
            {/* Tabs */}
            <div className="flex bg-white/5 backdrop-blur-sm items-center  border border-white/10 rounded-2xl overflow-hidden w-full sm:w-auto">
              {[
                { id: "upcoming", label: "Upcoming", icon: "ri-calendar-line" },
                { id: "archive", label: "Archive", icon: "ri-archive-line" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center h-full w-full gap-2 px-4 sm:px-6 py-2 sm:py-3 font-light text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-[#E95EB4] text-white"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <i className={`${tab.icon} text-sm`} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Filter Dropdown */}
            <div className="relative flex-1 sm:flex-none">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/10 transition-all duration-300 min-w-[160px] sm:min-w-[200px]"
              >
                <i className="ri-filter-3-line text-white/60" />
                <span className="flex-1 text-left font-light text-sm">
                  {categories.find((cat) => cat.value === selectedCategory)
                    ?.label || "All Categories"}
                </span>
                <i
                  className={`ri-arrow-down-s-line text-white/60 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden z-20"
                  >
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => {
                          setSelectedCategory(category.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-6 py-3 text-left font-light text-sm transition-colors ${
                          selectedCategory === category.value
                            ? "bg-white/10 text-white"
                            : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {category.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <EventsGrid
            events={filteredEvents}
            isUpcomingTab={activeTab === "upcoming"}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Events;
