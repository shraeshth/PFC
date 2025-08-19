import React, { useRef, useState, useCallback, memo } from "react";

const TextTiltCard = memo(({ children }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / (rect.height / 2)) * -4; // reduced intensity
    const rotateY = (mouseX / (rect.width / 2)) * 4; // reduced intensity

    setTransform(
      `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    );
  }, []);

  const handleMouseEnter = useCallback(
    (e) => {
      setIsHovered(true);
      handleMouseMove(e);
    },
    [handleMouseMove]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform("perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)");
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-full h-full"
      style={{
        transform: transform,
        transformStyle: "preserve-3d",
        transition: "transform 0.2s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
});

export default TextTiltCard;
