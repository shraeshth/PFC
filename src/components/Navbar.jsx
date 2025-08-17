import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const links = [
    { name: "Home", path: "/", img: null },
    { name: "Gallery", path: "/gallery", img: "1.png" },
    { name: "Merch", path: "/merch", img: "2.png" },
    { name: "Events", path: "/events", img: "3.png" },
    { name: "About", path: "/about", img: "4.png" },
  ];

  const linkRefs = useRef([]);
  const navbarRef = useRef(null);
  linkRefs.current = [];
  const [isHovered, setIsHovered] = useState(false);

  const addToRefs = (el) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  // Navbar hover expand/collapse (smooth)
  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.4, ease: "power3.inOut" },
    });
    tl.to(navbar, { height: 160 });

    const handleMouseEnter = () => {
      setIsHovered(true);
      tl.play();
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      tl.reverse();
    };

    navbar.addEventListener("mouseenter", handleMouseEnter);
    navbar.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      navbar.removeEventListener("mouseenter", handleMouseEnter);
      navbar.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Nav items hover effects (smooth buttery expand)
  useEffect(() => {
    const cleanupFunctions = [];

    linkRefs.current.forEach((el, index) => {
      if (!el || index === 0) return;

      const img = el.querySelector("img");
      const text = el.querySelector("p");

      // Timeline for smooth animation
      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.5, ease: "power3.inOut" },
      });
      tl.to(el, { flexGrow: 1.5 })
        .to(img, { y: 0, opacity: 1 }, 0)
        .to(text, { fontWeight: 600 }, 0);

      const handleMouseEnter = () => {
        if (isHovered) tl.play();
      };

      const handleMouseLeave = () => {
        tl.reverse();
      };

      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);

      cleanupFunctions.push(() => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    return () => cleanupFunctions.forEach((cleanup) => cleanup());
  }, [isHovered]);

  return (
    <nav
      ref={navbarRef}
      className="navbar fixed top-0 left-0 w-full z-80 bg-black/40 backdrop-blur-xl text-white border-b-[0.1px] border-white/20"
      style={{ height: 80 }}
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
        <ul className="flex items-center  w-[30%] h-full">
          {links.map((link, index) => (
            <li
              key={link.name}
              ref={addToRefs}
              style={{ flex: 1 }}
              className={`h-full border-l-[0.1px] border-white/20 ${
                index === 0 ? "border-none" : ""
              }`}
            >
              <a
                href={link.path}
                className="flex items-center flex-col justify-center h-full w-full font-normal"
              >
                <p className="mt-6 h-full">{link.name}</p>
                <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
                  {link.img && (
                    <img
                      src={`/src/assets/${link.img}`}
                      alt={`${link.name} preview`}
                      style={{
                        transform: "translateY(20px)",
                        opacity: 0,
                      }}
                      className="h-full w-full object-contain mt-[-7px]"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/60x60/333/fff?text=${link.name.charAt(
                          0
                        )}`;
                      }}
                    />
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
