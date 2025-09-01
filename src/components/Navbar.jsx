import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/pfclogo1.png";

export default function Navbar() {
  const links = [
    { name: "Gallery", path: "/gallery" },
    { name: "Merch", path: "/merch" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  

  return (
    <nav className="fixed top-0 left-0 w-full z-[200] bg-black/40 backdrop-blur-xl text-white border-b border-white/20">
      <div className="flex items-center justify-between  h-16 sm:h-18 md:h-20">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-8 ml-5 sm:ml-7 sm:h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/120x60/333/fff?text=PFC";
            }}
          />
        </NavLink>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center h-full ml-auto">
          {links.map((link, index) => (
            <li
              key={link.name}
              className={`h-full transition-all duration-500 border-l border-white/20 ${
                hoveredIndex === index ? "w-32" : "w-20"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-center h-full w-full transition-all duration-100 ${
                    isActive
                      ? "text-white font-bold border-b-1 border-[#ff66c4]/50"
                      : "text-white/80 hover:text-[#ff66c4]"
                  } ${hoveredIndex === index ? "font-semibold" : "font-normal"}`
                }
              >
                <span className="text-sm lg:text-base whitespace-nowrap">
                  {link.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-[#e95eb4]"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/20">
          {links.map((link, index) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block px-6 py-4 transition-all duration-300 ${
                  index !== links.length - 1 ? "border-b border-white/20" : ""
                } ${
                  isActive
                    ? "text-[#e95eb4] font-bold bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`
              }
              onClick={() => setIsMobileOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
