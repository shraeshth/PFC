import React from "react";
import EventCard from "./EventCard";

const EventsGrid = ({ events, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.length > 0 ? (
        events.map((event) => (
          <EventCard key={event.id} event={event} onClick={onSelect} />
        ))
      ) : (
        <p className="text-white/50">No events found.</p>
      )}
    </div>
  );
};

export default EventsGrid;
