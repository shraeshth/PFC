import React, { useRef, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Merch", path: "/merch" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
  ];

  const [isNavHovered, setIsNavHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-90 bg-black/40 backdrop-blur-xl text-white border-b border-white/20 transition-all duration-500 ease-in-out ${
        isNavHovered ? "h-40" : "h-20"
      }`}
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => setIsNavHovered(false)}
    >
      <div className="flex w-full h-full">
        {/* Left logo */}
        <div className="flex items-center w-[70%] px-7">
          <img
            src="/src/assets/pfclogo 1.png"
            alt="Logo"
            className="h-[70%] w-auto object-contain"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/120x60/333/fff?text=PFC";
            }}
          />
        </div>

        {/* Nav links */}
        <ul className="flex items-center w-[30%] h-full">
          {links.map((link, index) => (
            <li
              key={link.name}
              className={`h-full transition-all duration-500 ease-in-out ${
                index === 0 ? "" : "border-l border-white/20"
              } ${
                hoveredIndex === index && isNavHovered ? "flex-[1.5]" : "flex-1"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center flex-col justify-center h-full w-full transition-all duration-300 ${
                    isActive
                      ? "text-white font-bold border-b-2 border-white/60"
                      : "text-white/80 hover:text-white"
                  } ${
                    hoveredIndex === index && isNavHovered
                      ? "font-semibold scale-105"
                      : "font-normal"
                  }`
                }
              >
                <p className="mt-6">{link.name}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
