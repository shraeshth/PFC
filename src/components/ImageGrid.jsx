import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ImageGrid = ({ images }) => {
  const gridRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const grid = gridRef.current;
    const imageElements = imageRefs.current;

    // Set initial states
    gsap.set(imageElements, {
      y: 60,
      opacity: 0,
      scale: 0.9,
    });

    // Create staggered animation
    gsap.to(imageElements, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: grid,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Hover animations
    imageElements.forEach((img, index) => {
      if (img) {
        img.addEventListener("mouseenter", () => {
          gsap.to(img, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        img.addEventListener("mouseleave", () => {
          gsap.to(img, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={gridRef} className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            ref={(el) => (imageRefs.current[index] = el)}
            className={`aspect-square rounded-lg overflow-hidden bg-blue-900/20 cursor-pointer ${
              index >= 2 ? "hidden md:block" : ""
            }`}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
