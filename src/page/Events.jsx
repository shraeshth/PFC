import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  ChevronDown,
  Filter,
  Camera,
  Video,
} from "lucide-react";
import TextTiltCard from "../components/TextTiltCard"; // make sure path is correct

// Mock Events Data
const eventsData = [
  {
    id: 1,
    title: "Master Class: Portrait Photography",
    date: "2025-09-10",
    time: "3:00 PM",
    location: "Studio A, Creative Arts Building",
    description:
      "An intimate masterclass with renowned portrait photographer Sarah Chen. Learn advanced lighting techniques, posing, and the art of capturing authentic emotions. Limited to 15 participants for personalized attention.",
    banner:
      "https://images.unsplash.com/photo-1554048612-b6a482b224f0?w=1200&h=600&fit=crop",
    tags: ["portrait", "masterclass", "lighting"],
    type: "photography",
  },
  {
    id: 2,
    title: "Cinematic Storytelling Workshop",
    date: "2025-08-25",
    time: "10:00 AM",
    location: "Black Box Theater",
    description:
      "Dive deep into the fundamentals of visual storytelling. From shot composition to color grading, learn how to craft compelling narratives through the lens. Featuring industry professionals from major film studios.",
    banner:
      "https://images.unsplash.com/photo-1489599735188-d76c80d9c9a3?w=1200&h=600&fit=crop",
    tags: ["cinematography", "workshop", "storytelling"],
    type: "filming",
  },
  {
    id: 3,
    title: "Street Photography Exhibition",
    date: "2025-08-15",
    time: "6:00 PM",
    location: "Main Gallery, Arts Center",
    description:
      "Our annual showcase of raw urban beauty captured by club members. Featuring 50+ photographs that tell the story of city life through different perspectives and techniques.",
    banner:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=600&fit=crop",
    tags: ["street", "exhibition", "urban"],
    type: "photography",
  },
  {
    id: 4,
    title: "Documentary Filmmaking Intensive",
    date: "2025-07-20",
    time: "9:00 AM",
    location: "Media Production Lab",
    description:
      "A comprehensive 3-day intensive covering pre-production, filming techniques, and post-production workflow for documentary projects. Work with professional-grade equipment and experienced mentors.",
    banner:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=600&fit=crop",
    tags: ["documentary", "intensive", "production"],
    type: "filming",
  },
  {
    id: 5,
    title: "Fine Art Photography Critique",
    date: "2025-09-05",
    time: "4:00 PM",
    location: "Conference Room 201",
    description:
      "Monthly portfolio review session where members present their work for constructive feedback from peers and visiting artists. A safe space to grow and refine your artistic vision.",
    banner:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop",
    tags: ["fineart", "critique", "portfolio"],
    type: "photography",
  },
  {
    id: 6,
    title: "Commercial Video Production",
    date: "2025-08-30",
    time: "1:00 PM",
    location: "Studio B & C",
    description:
      "Learn the business side of video production. From client communication to delivering polished commercial content. Includes hands-on project with real client brief.",
    banner:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop",
    tags: ["commercial", "business", "client"],
    type: "filming",
  },
];

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

const isUpcoming = (dateString) => {
  const eventDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
};

// EventCard with Tilt
const EventCard = React.memo(({ event, isUpcoming }) => {
  const handleRegister = () => {
    console.log("Register for event:", event.title);
  };

  return (
    <TextTiltCard>
      <div className="bg-black border-[0.1px] border-white/20 rounded-2xl overflow-hidden transition-all duration-500">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-full object-cover filter transition-all duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60  transition-opacity duration-500" />

          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 px-2 py-1 bg-black/10 backdrop-blur-md border-[0.1px] border-white/20 rounded-2xl">
              {event.type === "photography" ? (
                <Camera className="w-3 h-3 text-white" />
              ) : (
                <Video className="w-3 h-3 text-white" />
              )}
              <span className="text-white text-xs font-light uppercase tracking-wider">
                {event.type}
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="space-y-1">
              <div className="flex items-center text-white text-xs font-light">
                <Clock className="w-3 h-3 mr-1" />
                {formatDate(event.date).split(",")[0]} • {event.time}
              </div>
              <div className="flex items-center text-white text-xs font-light">
                <MapPin className="w-3 h-3 mr-1" />
                {event.location}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-white text-lg font-light leading-tight">
            {event.title}
          </h3>
          <p className="text-gray-400 text-sm font-light leading-relaxed">
            {event.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {event.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-gray-500 text-xs font-light uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>

          {isUpcoming && (
            <div className="pt-2">
              <button
                onClick={handleRegister}
                className="w-full bg-white text-black py-3 px-6 font-light uppercase tracking-widest text-sm hover:scale-[1.02] transition-all duration-300 rounded-lg"
              >
                Register Now
              </button>
            </div>
          )}
        </div>
      </div>
    </TextTiltCard>
  );
});

// EventsGrid
const EventsGrid = React.memo(({ events, isUpcomingTab }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.children;
    if (!cards) return;

    Array.from(cards).forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";

      setTimeout(() => {
        card.style.transition = "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
        card.style.opacity = "1";
        card.style.transform = "translateY(0px)";
      }, index * 150);
    });
  }, [events]);

  if (events.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="w-16 h-16 mx-auto mb-8 border-[0.1px] border-white/20 rounded-2xl flex items-center justify-center">
          <Camera className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-2xl font-light text-white mb-3">No Events Found</h3>
        <p className="text-gray-400 font-light">
          No events match your current selection
        </p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12"
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} isUpcoming={isUpcomingTab} />
      ))}
    </div>
  );
});

// Main Events Component
const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    let filtered = eventsData.filter((event) =>
      activeTab === "upcoming"
        ? isUpcoming(event.date)
        : !isUpcoming(event.date)
    );

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (event) =>
          event.tags.some((tag) =>
            tag.toLowerCase().includes(selectedCategory.toLowerCase())
          ) || event.type.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    return filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [activeTab, selectedCategory]);

  const categories = useMemo(() => {
    const allTags = eventsData.flatMap((event) => event.tags);
    const types = [...new Set(eventsData.map((event) => event.type))];
    const uniqueCategories = [...new Set([...allTags, ...types])];
    return ["all", ...uniqueCategories].map((cat) => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="relative min-h-[50vh] flex items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extralight mb-6 leading-tight text-white">
            Club Events
          </h1>
          <p className="text-xl font-light text-white/80 max-w-2xl mx-auto leading-relaxed">
            Masterclasses, workshops, and exhibitions crafted for visual
            storytellers
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16 mt-10 gap-8">
          <div className="flex border border-white/20 rounded-2xl overflow-hidden w-full max-w-xs sm:max-w-md md:max-w-lg">
            {[
              { id: "upcoming", label: "Upcoming" },
              { id: "past", label: "Archive" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 
        font-light uppercase tracking-wide text-xs sm:text-sm md:text-base 
        transition-all duration-300 text-center
        ${
          activeTab === tab.id
            ? "bg-white text-black"
            : "text-white/80 hover:text-white hover:bg-white/5"
        }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-4 px-6 py-4 border-[0.1px] border-white/20 rounded-2xl hover:border-white/40 transition-colors min-w-[240px] group"
            >
              <Filter className="w-4 h-4 text-white/40 group-hover:text-white/60" />
              <span className="flex-1 text-left font-light">
                {categories.find((cat) => cat.value === selectedCategory)
                  ?.label || "All Categories"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-white/40 transition-all duration-300 ${
                  isDropdownOpen
                    ? "rotate-180 text-white"
                    : "group-hover:text-white/60"
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-black border-[0.1px] border-white/20 rounded-2xl overflow-hidden z-20">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      setSelectedCategory(category.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-6 py-4 text-left font-light transition-colors ${
                      selectedCategory === category.value
                        ? "bg-white text-black"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <EventsGrid
          events={filteredEvents}
          isUpcomingTab={activeTab === "upcoming"}
        />
      </div>
    </div>
  );
};

export default Events;
