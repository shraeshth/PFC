import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

// ===== Number Slot =====
function Number({ mv, number, height }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) memo -= 10 * height;
    return memo;
  });

  return (
    <motion.span
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        y,
      }}
    >
      {number}
    </motion.span>
  );
}

// ===== Single Digit =====
function Digit({ place, value, height }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace, {
    duration: 2000,
    bounce: 0,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div
      style={{
        height,
        position: "relative",
        width: "1ch",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

// ===== Counter (Slot Machine) =====
function Counter({ value, fontSize = 64, places = [1000, 100, 10, 1] }) {
  const height = fontSize;

  return (
    <div
      style={{
        fontSize,
        display: "flex",
        gap: 2,
        overflow: "hidden",
        lineHeight: 1,
        color: "white",
        fontWeight: "300",
      }}
    >
      {places.map((place) => (
        <Digit key={place} place={place} value={value} height={height} />
      ))}
    </div>
  );
}

// ===== Main Stats Section =====
const StatsSection = () => {
  const statsRef = useRef(null);
  const [animatedValues, setAnimatedValues] = useState({
    shots: 0,
    creators: 0,
    projects: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  const finalValues = {
    shots: 2500,
    creators: 150,
    projects: 30,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);

            setAnimatedValues({
              shots: Math.floor(finalValues.shots * easeOutCubic),
              creators: Math.floor(finalValues.creators * easeOutCubic),
              projects: Math.floor(finalValues.projects * easeOutCubic),
            });

            if (progress < 1) requestAnimationFrame(animate);
          };
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const statsData = [
    {
      value: animatedValues.shots,
      label: "SHOTS CAPTURED",
      places: [1000, 100, 10, 1],
    },
    {
      value: animatedValues.creators,
      label: "ACTIVE CREATORS",
      places: [100, 10, 1],
    },
    {
      value: animatedValues.projects,
      label: "PROJECTS DELIVERED",
      places: [100, 10, 1],
    },
  ];

  return (
    <div
      ref={statsRef}
      className="w-full bg-black text-white flex flex-col md:flex-row justify-center items-center"
    >
      {statsData.map((stat, i) => (
        <motion.div
          key={i}
          className="flex-1 flex flex-col items-center justify-center py-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 30 }}
          transition={{ duration: 0.8, delay: i * 0.2 }}
        >
          <Counter value={stat.value} places={stat.places} />
          <div className="mt-6 text-[#ea5eb4] font-figtree text-sm tracking-widest">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;
