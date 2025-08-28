import React, { useState, useEffect } from "react";

const DynamicTitle = () => {
  const words = ["Moments", "Memories", "Dreams", "Stories"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.1] tracking-tight mb-2">
      <span
        key={wordIndex}
        className="text-[#ff66c4] transition-opacity duration-700 ease-in-out"
      >
        {words[wordIndex]}
      </span>
    </h1>
  );
};

export default DynamicTitle;
