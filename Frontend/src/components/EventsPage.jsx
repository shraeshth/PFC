import React, { useState, useEffect } from "react";
import eventsData from "../data/events.json";
import EventsGrid from "../components/Events/EventsGrid";
import EventModal from "../components/Events/EventModal";

const categories = ["All", "Workshop", "Orientation", "Exhibition"];

const EventsPage = () => {
  const [tab, setTab] = useState("future");
  const [subcategory, setSubcategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(eventsData);
  }, []);

  const now = new Date();

  const filteredEvents = events.filter((e) => {
    const eventDate = new Date(e.date);
    const isFuture = eventDate >= now;
    const isPast = eventDate < now;

    if (tab === "future" && !isFuture) return false;
    if (tab === "past" && !isPast) return false;

    if (
      subcategory !== "All" &&
      e.subcategory.toLowerCase() !== subcategory.toLowerCase()
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="p-6 text-white relative">
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["future", "past"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              tab === t
                ? "bg-white text-black border-white"
                : "bg-transparent text-white/90 border-white/20 hover:bg-white/10"
            }`}
          >
            {t === "future" ? "Upcoming" : "Past"}
          </button>
        ))}
      </div>

      {/* Subcategory Dropdown */}
      <div className="mb-6">
        <select
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="px-4 py-2 bg-black border border-white/20 rounded-lg"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Events Grid */}
      <EventsGrid events={filteredEvents} onSelect={setSelectedEvent} />

      {/* Modal */}
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
};

export default EventsPage;
