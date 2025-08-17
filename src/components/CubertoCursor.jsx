import React, { useEffect, useRef } from "react";

const CubertoCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      const speed = 0.2; // lower = more delay
      dotX += (mouseX - dotX) * speed;
      dotY += (mouseY - dotY) * speed;

      cursor.style.transform = `translate(${dotX}px, ${dotY}px)`;

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-3 h-3 rounded-full pointer-events-none"
      style={{
        background: "white",
        top: "-6px",
        left: "-6px",
        zIndex: 99,
      }}
    />
  );
};

export default CubertoCursor;
