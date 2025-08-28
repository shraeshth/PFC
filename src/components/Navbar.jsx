import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger & close icons

export default function Navbar() {
  const links = [
    { name: "Gallery", path: "/gallery" },
    { name: "Merch", path: "/merch" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
  ];

  const [isNavHovered, setIsNavHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[200] bg-black/40 backdrop-blur-xl text-white border-b border-white/20 transition-all duration-500 ease-in-out`}
    >
      <div className="flex items-center justify-between px-5 h-16 sm:h-18 md:h-20">
        {/* Left logo - Now clickable to home */}
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <img
              src="/src/assets/pfclogo1.png"
              alt="Logo"
              className="h-8 sm:h-10 md:h-12 w-auto object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/120x60/333/fff?text=PFC";
              }}
            />
          </NavLink>
        </div>

        {/* Desktop Nav links - Right aligned and compact */}
        <ul
          className="hidden md:flex items-center h-full ml-auto"
          onMouseEnter={() => setIsNavHovered(true)}
          onMouseLeave={() => setIsNavHovered(false)}
          style={{ width: "auto" }}
        >
          {links.map((link, index) => (
            <li
              key={link.name}
              className={`h-full transition-all duration-500 ease-in-out border-l border-white/20 ${
                hoveredIndex === index && isNavHovered ? "w-32" : "w-20"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center flex-col justify-center h-full w-full transition-all duration-100 ${
                    isActive
                      ? "text-white font-bold border-b-2 border-white/60"
                      : "text-white/80 hover:text-white"
                  } ${
                    hoveredIndex === index && isNavHovered
                      ? "font-semibold"
                      : "font-normal"
                  }`
                }
              >
                <p className="mt-6 text-sm lg:text-base whitespace-nowrap">
                  {link.name}
                </p>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center justify-center p-2"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileOpen ? (
            <X size={24} className="sm:w-7 sm:h-7" />
          ) : (
            <Menu size={24} className="sm:w-7 sm:h-7" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/20">
          <ul className="flex flex-col">
            {links.map((link, index) => (
              <li
                key={link.name}
                className={`${
                  index !== links.length - 1 ? "border-b border-white/20" : ""
                }`}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-6 py-4 transition-all duration-300 ${
                      isActive
                        ? "text-white font-bold bg-white/10"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`
                  }
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
