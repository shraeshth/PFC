import React, { useRef, useEffect } from "react";
import bgimg from "../assets/WE ARE PFC.png";
import team from "../JSON/Team.json"; // import your team.json file

const LetterCard = ({ name, position, instagram, image, description }) => (
  <div className="letter-card w-72 sm:w-80 p-3 flex-shrink-0 rounded-xl border border-white/20 bg-black/50 hover:bg-black/40 transition-all duration-300">
    <div className="flex items-center mb-2 gap-3 border-b border-white/20 pb-2">
      <img
        src={`/${image}`}
        alt={name}
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border border-white/20 flex-shrink-0"
        onError={(e) =>
          (e.target.src =
            "https://via.placeholder.com/150/333/fff?text=No+Image")
        }
      />
      <div className="flex flex-col justify-center text-sm min-w-0">
        <span className="font-semibold truncate">{name}</span>
        <span className="opacity-70 text-xs sm:text-sm truncate">{position}</span>
        {instagram && (
          <a
            href={instagram}
            className="opacity-60 hover:opacity-80 transition-opacity text-xs truncate"
            target="_blank"
            rel="noopener noreferrer"
          >
            {instagram
              .replace("https://www.instagram.com/", "@")
              .replace("/", "")}
          </a>
        )}
      </div>
    </div>
    <p className="text-xs sm:text-sm opacity-80 leading-snug line-clamp-3">{description}</p>
  </div>
);

const LettersCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let position = 0;
    const speed = 0.8;
    let animationId;

    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= container.scrollWidth / 2) {
        position = 0;
      }
      container.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32 z-20 overflow-hidden w-full py-8 sm:py-12 md:py-16 md:mb-50">
      <div className="flex gap-4 sm:gap-6 md:gap-8 w-max" ref={carouselRef}>
        {team.map((person, index) => (
          <LetterCard key={`first-${index}`} {...person} />
        ))}
        {team.map((person, index) => (
          <LetterCard key={`second-${index}`} {...person} />
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="w-full mx-auto text-center relative mt-12">
      {/* Carousel */}
      <LettersCarousel className="mb-20" />

      {/* Background + Footer */}
      <div className="flex justify-center w-full mt-5 relative">
        <div className="z-[-20] absolute inset-0 bg-black backdrop-blur-2xl"></div>
        <img
          src={bgimg}
          alt="We Are PFC"
          className="z-[-20] w-full h-auto max-w-full opacity-90 object-contain"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/400x200/333/fff?text=WE+ARE+PFC")
          }
        />
      </div>
    </div>
  );
};

export default Footer;