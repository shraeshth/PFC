import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function BackgroundBlob() {
  const blobRef = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;

    // Animate random movement and scaling
    gsap.to(blob, {
      x: "random(-200,200)",
      y: "random(-150,150)",
      scale: "random(1,1.5)",
      duration: 8,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div className="absolute inset-0 z-[-10] flex justify-center items-center overflow-hidden">
      <div
        ref={blobRef}
        className="w-96 h-96 bg-purple-500 rounded-full opacity-40"
      ></div>
    </div>
  );
}

export default BackgroundBlob;
