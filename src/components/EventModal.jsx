import React from "react";
import EventDetails from "./EventDetails";

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black rounded-2xl max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-lg"
        >
          ✕
        </button>
        <EventDetails event={event} />
      </div>
    </div>
  );
};

export default EventModal;
