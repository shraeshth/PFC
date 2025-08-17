import React from 'react';

const TshirtDisplay = () => {
  return (
    <div className="relative mb-6">
      <div className="flex justify-center gap-4">
        <div className="w-32 h-40 bg-black opacity-50"></div>
        <div className="w-32 h-40 bg-black"></div>
        <div className="w-32 h-40 bg-black opacity-50"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <button className="text-white">&lt;</button>
        <button className="text-white">&gt;</button>
      </div>
    </div>
  );
};

export default TshirtDisplay;