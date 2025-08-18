import React, { useState, useEffect } from "react";
import useScrollAnimation from "./useScrollAnimation";

const StatsSection = () => {
  const statsRef = useScrollAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={statsRef}
      className="py-24 text-white fade-in-up"
      // style={{
      //   backgroundImage:
      //     "url('https://images.unsplash.com/photo-1601926299866-6a5c9bfa6be0?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      {/* Overlay for better contrast */}
      <div className="bg-black/80 backdrop-blur-md bg-opacity-60 py-">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            {[
              { value: "2.5K", label: "SHOTS CAPTURED" },
              { value: "150", label: "ACTIVE CREATORS" },
              { value: "24/7", label: "CREATIVE PROCESS" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div
                  className={`text-5xl font-light transition-all duration-1000 delay-[${
                    i * 200
                  }ms] ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-400 tracking-widest text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
