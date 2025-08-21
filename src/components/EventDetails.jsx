import React from "react";

const EventDetails = ({ event }) => {
  if (!event) return null;

  return (
    <div className="p-6">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
      <p className="text-sm text-white/70 mb-4">{event.date}</p>
      <p className="mb-6">{event.description}</p>

      {event.location && (
        <p className="text-white/80">
          📍 <span className="font-medium">{event.location}</span>
        </p>
      )}
    </div>
  );
};

export default EventDetails;
