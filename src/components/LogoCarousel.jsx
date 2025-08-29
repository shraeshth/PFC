import React from "react";
import logo1 from "../assets/collaborate/1.png";
import logo2 from "../assets/collaborate/2.png";
import logo3 from "../assets/collaborate/3.png";
import logo4 from "../assets/collaborate/4.png";
import logo5 from "../assets/collaborate/5.png";
import logo6 from "../assets/collaborate/6.png";
import logo7 from "../assets/collaborate/7.png";
import logo8 from "../assets/collaborate/8.png";
import logo9 from "../assets/collaborate/9.png";
import logo10 from "../assets/collaborate/10.png";
import logo11 from "../assets/collaborate/11.png";

const LogoCarousel = () => {
  const logos = [
    { name: "Company 1", src: logo1 },
    { name: "Company 2", src: logo2 },
    { name: "Company 3", src: logo3 },
    { name: "Company 4", src: logo4 },
    { name: "Company 5", src: logo5 },
    { name: "Company 6", src: logo6 },
    { name: "Company 7", src: logo7 },
    { name: "Company 8", src: logo8 },
    { name: "Company 9", src: logo9 },
    { name: "Company 10", src: logo10 },
    { name: "Company 11", src: logo11 },
  ];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            
            .animate-scroll { 
              animation: scroll 60s linear infinite; 
              width: fit-content; 
            }
            
            .animate-scroll:hover { 
              animation-play-state: paused; 
            }

            /* Purple hover effect for #EA5EB4 */
            .logo-img {
              filter: grayscale(1) brightness(0.8);
              transition: all 0.4s ease;
            }
            
            .logo-img:hover {
              filter: brightness(0) saturate(100%) invert(51%) sepia(42%) 
                      saturate(3361%) hue-rotate(287deg) brightness(1.2) contrast(1.1);
            }
          `,
        }}
      />

      <section className="mt-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-15">
            <h2 className="text-4xl font-light text-white tracking-wide">
              Collaborated With
            </h2>
          </div>

          {/* Logo Strip Container */}
          <div className="relative">
            {/* Border container */}
            <div className="py-8 border-t border-white/10 overflow-hidden relative">
              {/* Scrollable Logos */}
              <div className="flex animate-scroll">
                {[...logos, ...logos, ...logos].map((logo, index) => (
                  <div
                    key={`${logo.name}-${index}`}
                    className="flex-shrink-0 mx-5 lg:mx-5"
                  >
                    <div className="w-32 h-16 lg:w-40 lg:h-30 flex items-center justify-center transition-all duration-1000">
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="logo-img max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml,${encodeURIComponent(`
                            <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
                              <rect width="120" height="60" fill="#374151" stroke="#6b7280" stroke-width="1"/>
                              <text x="60" y="35" text-anchor="middle" fill="#9ca3af" font-family="Arial" font-size="12">${logo.name}</text>
                            </svg>
                          `)}`;
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Left fade overlay */}
              <div className="absolute left-0 top-0 h-full w-32 pointer-events-none z-10">
                <div
                  className="h-full w-full"
                  style={{
                    background: `linear-gradient(to right, 
                      rgba(0,0,0,1) 0%, 
                      rgba(0,0,0,0.8) 30%, 
                      rgba(0,0,0,0.4) 60%, 
                      rgba(0,0,0,0) 100%)`,
                  }}
                />
              </div>

              {/* Right fade overlay */}
              <div className="absolute right-0 top-0 h-full w-32 pointer-events-none z-10">
                <div
                  className="h-full w-full"
                  style={{
                    background: `linear-gradient(to left, 
                      rgba(0,0,0,1) 0%, 
                      rgba(0,0,0,0.8) 30%, 
                      rgba(0,0,0,0.4) 60%, 
                      rgba(0,0,0,0) 100%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogoCarousel;
