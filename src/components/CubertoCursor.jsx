import React, { useRef, useEffect, useCallback } from "react";

const CubertoCursor = () => {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    (e) => {
      const { left, top } = updateOffset();
      const x = "clientX" in e ? e.clientX : e.touches[0].clientX;
      const y = "clientY" in e ? e.clientY : e.touches[0].clientY;
      
      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        
        if (window.gsap) {
          window.gsap.to(el, {
            x: x - left,
            y: y - top,
            duration: isLead ? 0.1 : 0.5,
            ease: isLead ? "power3.out" : "power1.out",
          });
        } else {
          // Fallback without GSAP
          el.style.transform = `translate(${x - left}px, ${y - top}px)`;
        }
      });
    },
    [updateOffset]
  );

  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateOffset]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 99 }}
    >
      <svg className="absolute w-0 h-0">
        <filter id="blob">
          <feGaussianBlur
            in="SourceGraphic"
            result="blur"
            stdDeviation={30}
          />
          <feColorMatrix in="blur" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10" />
        </filter>
      </svg>
      
      <div
        className="absolute inset-0 overflow-hidden select-none cursor-default"
        style={{ filter: "url(#blob)" }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (blobsRef.current[i] = el)}
            className="absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "white",
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CubertoCursor;