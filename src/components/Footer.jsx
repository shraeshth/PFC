import React, { useRef, useEffect } from "react";
import bgimg from "../assets/WE ARE PFC.png";

const lettersData = [
  {
    name: "Shreshth Sharma",
    role: "Secretary",
    insta: "@shreshth_insta",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    text: "We are excited to welcome all new members to explore photography and filmmaking with creativity and passion.",
  },
  {
    name: "Ananya Singh",
    role: "Coordinator",
    insta: "@ananya_insta",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    text: "Our club thrives on collaboration. Every project is a chance to learn and grow together as visual storytellers.",
  },
  {
    name: "Rohan Mehta",
    role: "Vice Secretary",
    insta: "@rohan_insta",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    text: "Capturing moments and framing stories is our passion. Join us in our photo walks and workshops to experience it firsthand.",
  },
  {
    name: "Priya Verma",
    role: "Co-Coordinator",
    insta: "@priya_insta",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    text: "We aim to create cinematic stories that resonate. Come join our filmmaking sessions and workshops.",
  },
];

const LetterCard = ({ name, role, insta, img, text }) => (
  <div className="letter-card w-80 p-3 flex-shrink-0 rounded-xl border border-white/20 bg-black/50 hover:bg-black/40 transition-all duration-300">
    <div className="flex items-center mb-2 gap-3 border-b border-white/20 pb-2">
      <img
        src={img}
        alt={name}
        className="w-25 h-16 rounded-full object-cover border-white/20"
      />
      <div className="flex flex-col justify-center text-sm">
        <span className="font-semibold">{name}</span>
        <span className="opacity-70">{role}</span>
        <a
          href={`https://instagram.com/${insta.replace("@", "")}`}
          className="opacity-60 hover:opacity-80 transition-opacity text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          {insta}
        </a>
      </div>
    </div>
    <p className="text-sm opacity-80 leading-snug">{text}</p>
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
        {lettersData.map((person, index) => (
          <LetterCard key={`first-${index}`} {...person} />
        ))}
        {lettersData.map((person, index) => (
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
