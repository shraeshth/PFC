import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import bgImage from "../assets/image47.png";

function Background() {
  const bgRef = useRef(null);

  useEffect(() => {
    // Timeline so both scale + movement are synced
    gsap
      .timeline({ repeat: -1, yoyo: true })
      .to(bgRef.current, {
        scale: 1.5,
        x: 100, // move right
        y: -100, // move up
        duration: 10,
        ease: "power1.inOut",
      })
      .to(bgRef.current, {
        scale: 1,
        x: -100, // move left
        y: 100, // move down
        duration: 10,
        ease: "power1.inOut",
      });
  }, []);

  return (
    <div className="absolute inset-0 z-[-10] overflow-hidden">
      <img
        ref={bgRef}
        src={bgImage}
        alt="Background"
        className="w-[80%] h-auto object-cover"
      />
    </div>
  );
}

export default Background;
