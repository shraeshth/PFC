import React from "react";

const EventCard = ({ event, onClick }) => {
  return (
    <div
      className="rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow hover:shadow-lg transition cursor-pointer"
      onClick={() => onClick(event)}
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{event.title}</h2>
        <p className="text-sm text-white/70">{event.date}</p>
        <p className="text-sm mt-2 line-clamp-2">{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;
