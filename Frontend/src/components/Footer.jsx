import React, { useRef, useEffect } from "react";
import bgimg from "../assets/WE ARE PFC.png";
import team from "../JSON/Team.json"; // import your team.json file

const LetterCard = ({ name, position, instagram, image, description }) => (
  <div className="letter-card w-80 p-3 flex-shrink-0 rounded-xl border border-white/20 bg-black/50 hover:bg-black/40 transition-all duration-300">
    <div className="flex items-center mb-2 gap-3 border-b border-white/20 pb-2">
      <img
        src={`/${image}`}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border border-white/20"
        onError={(e) =>
          (e.target.src =
            "https://via.placeholder.com/150/333/fff?text=No+Image")
        }
      />
      <div className="flex flex-col justify-center text-sm">
        <span className="font-semibold">{name}</span>
        <span className="opacity-70">{position}</span>
        {instagram && (
          <a
            href={instagram}
            className="opacity-60 hover:opacity-80 transition-opacity text-xs"
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
    <p className="text-sm opacity-80 leading-snug">{description}</p>
  </div>
);

const LettersCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let position = 0;
    const speed = 0.8;

    const animate = () => {
      position -= speed;
      if (Math.abs(position) >= container.scrollWidth / 2) {
        position = 0;
      }
      container.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="absolute bottom-70 z-20 overflow-hidden w-full py-16">
      <div className="flex gap-8 w-max" ref={carouselRef}>
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
    <div className="w-full mx-auto text-center relative">
      {/* Carousel */}
      <LettersCarousel />

      {/* Background + Footer */}
      <div className="flex justify-center w-full mt-5 relative">
        <div className="z-[-20] absolute bottom-100 backdrop-blur-2xl inset-0 bg-black"></div>
        <img
          src={bgimg}
          alt="We Are PFC"
          className="z-[-20] w-full opacity-90"
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
