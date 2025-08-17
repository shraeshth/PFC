import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const PreviewSection = ({ onShowMore }) => {
  const previewRef = useRef(null);
  const buttonRef = useRef(null);
  const blurredGridRef = useRef(null);

  useEffect(() => {
    const preview = previewRef.current;
    const button = buttonRef.current;
    const blurredGrid = blurredGridRef.current;

    // Set initial states
    gsap.set([blurredGrid, button], {
      y: 40,
      opacity: 0
    });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: preview,
        start: "top 90%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate blurred grid first
    tl.to(blurredGrid, {
      y: 0,
      opacity: 0.6,
      duration: 0.8,
      ease: "power3.out"
    })
    // Then animate button
    .to(button, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4");

    // Button hover animation
    if (button) {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out"
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={previewRef} className="relative">
      {/* Blurred Preview Row */}
      <div ref={blurredGridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 blur-sm mb-8">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index} 
            className={`aspect-square rounded-lg bg-blue-900/30 ${
              index >= 2 ? 'hidden md:block' : ''
            }`}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
          </div>
        ))}
      </div>
      
      {/* Show More Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button 
          ref={buttonRef}
          onClick={onShowMore}
          className="px-8 py-3 border border-white/30 text-white text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/50 transition-colors duration-300 backdrop-blur-sm bg-black/20 rounded-sm"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default PreviewSection;