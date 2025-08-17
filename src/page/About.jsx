import React, { useEffect, useRef } from "react";
import Footer from "../components/Footer";

// SpotlightCard component
const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.1)",
}) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
};

const sidebarData = [
  {
    title: "Club Stats",
    icon: "ri-bar-chart-line",
    rows: [
      ["Founded", "2020"],
      ["Members", "120+"],
      ["Projects", "200+"],
      ["Exhibitions", "15"],
      ["Awards", "8"],
    ],
  },
  {
    title: "Equipment",
    icon: "ri-tools-line",
    rows: [
      [
        "Canon & Sony Cameras",
        "High-end DSLRs and mirrorless cameras for professionals.",
      ],
      [
        "Professional Lenses",
        "Wide-angle, prime, zoom lenses for every style.",
      ],
      ["Lighting Equipment", "Softboxes, LEDs, and studio lights."],
      ["Drone Technology", "Aerial drones for cinematic shots."],
      [
        "Editing Workstations",
        "High-performance computers for post-production.",
      ],
      ["Audio Recording Gear", "Microphones and audio interfaces."],
    ],
  },
  {
    title: "Meeting Times",
    icon: "ri-time-line",
    rows: [
      ["General Meetings", "Fridays 6 PM"],
      ["Photo Walks", "Saturdays 9 AM"],
      ["Film Sessions", "Sundays 2 PM"],
    ],
  },
];

const cardData = [
  {
    title: "Photography",
    items: [
      "Weekly city photo walks",
      "Portrait & studio sessions",
      "Nature & landscape shoots",
      "Street & documentary photography",
    ],
  },
  {
    title: "Filmmaking",
    items: [
      "Short film workshops",
      "Documentary projects",
      "Music video & commercial shoots",
      "Screenings & critiques",
    ],
  },
];

const TableCard = ({ title, icon, rows }) => (
  <div className="parallax-item hover-animate">
    <SpotlightCard className="p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm overflow-hidden">
      <h3 className="text-xl font-semibold mb-4 tracking-wide flex items-center gap-2 text-white/95">
        <i className={icon}></i> {title}
      </h3>
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-t border-white/5">
              <td className="py-2 font-medium text-white/80">{label}</td>
              <td className="py-2 text-white/60">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SpotlightCard>
  </div>
);

const Card = ({ title, items }) => (
  <div className="hover-animate">
    <SpotlightCard className="p-6 border border-white/15 rounded-lg space-y-4 bg-gradient-to-br from-white/8 to-white/3 overflow-hidden">
      <h4 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
        {title}
      </h4>
      <ul className="space-y-2 text-sm text-white/70">
        {items.map((item) => (
          <li
            key={item}
            className="hover:text-white/90 transition-colors duration-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </SpotlightCard>
  </div>
);

function About() {
  const refs = useRef({
    header: null,
    main: null,
    sidebar: null,
    join: null,
    titleChars: [],
  });

  useEffect(() => {
    if (!window.gsap) return;
    const { gsap } = window;

    const { header, main, sidebar, join } = refs.current;
    gsap.set([header, main, sidebar, join], { opacity: 0, y: 50 });

    const titleEl = header.querySelector("h1");
    titleEl.innerHTML = titleEl.textContent
      .split("")
      .map((c) => `<span class="char">${c === " " ? "&nbsp;" : c}</span>`)
      .join("");
    refs.current.titleChars = titleEl.querySelectorAll(".char");

    const tl = gsap.timeline();
    tl.from(refs.current.titleChars, {
      duration: 0.8,
      y: 100,
      opacity: 0,
      stagger: 0.05,
      ease: "power3.out",
    }).to(
      [header, main, sidebar, join],
      { duration: 0.8, opacity: 1, y: 0, ease: "power2.out", stagger: 0.1 },
      "-=0.4"
    );

    document.querySelectorAll(".fade-in-section").forEach((el) =>
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: "power2.out",
      })
    );

    gsap.to(".parallax-item", {
      scrollTrigger: {
        trigger: ".parallax-container",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: -50,
      stagger: 0.1,
    });

    document.querySelectorAll(".hover-animate").forEach((el) => {
      el.addEventListener("mouseenter", () =>
        gsap.to(el, { scale: 1.02, duration: 0.3 })
      );
      el.addEventListener("mouseleave", () =>
        gsap.to(el, { scale: 1, duration: 0.3 })
      );
    });
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden mt-20">
      {/* Header */}
      <div
        ref={(el) => (refs.current.header = el)}
        className="max-w-6xl mx-auto px-4 py-20"
      >
        <div className="relative">
          <h1 className="text-6xl mb-4 tracking-tight text-white font-light">
            About
          </h1>
          <p className="text-xl font-light tracking-wide text-white/85">
            Photography & Filming Club
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Article */}
          <div
            ref={(el) => (refs.current.main = el)}
            className="lg:col-span-3 space-y-12"
          >
            <section className="fade-in-section">
              <h2 className="text-4xl font-bold mb-12 hover-animate cursor-default text-white/95">
                Description
              </h2>
              <div className="space-y-8">
                <p className="text-xl leading-relaxed font-light text-white/90">
                  We are a community of passionate photographers and filmmakers
                  dedicated to capturing stories through the lens.
                </p>
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-1 border-l-2 border-white-400/80"></div>
                  <div className="col-span-11">
                    <p className="text-lg leading-relaxed text-white/75">
                      Founded by students with a love for storytelling, LENS is
                      a vibrant creative community where every frame tells a
                      story.
                    </p>
                  </div>
                </div>
                <p className="text-lg leading-loose text-white/70">
                  Members range from beginners to pros, united by passion and
                  mutual growth.
                </p>
              </div>
            </section>

            <section className="fade-in-section grid grid-cols-1 md:grid-cols-2 gap-8">
              {cardData.map((card) => (
                <Card key={card.title} {...card} />
              ))}
            </section>

            <section className="fade-in-section">
              <h3 className="text-3xl font-bold mb-0 hover-animate cursor-default text-white/95">
                Our Philosophy
              </h3>
              <div className="space-y-8 mt-10">
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-1 border-l-2 border-white-400/80"></div>
                  <div className="col-span-11">
                    <p className="text-lg leading-relaxed text-white/75">
                      Founded by students with a love for storytelling, LENS is
                      a vibrant creative community where every frame tells a
                      story.
                    </p>
                  </div>
                </div>
                <p className="text-lg leading-loose text-white/65">
                  Every frame is a chance to share a perspective, evoke emotion,
                  and preserve moments. Members are encouraged to find their
                  unique voice.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside
            ref={(el) => (refs.current.sidebar = el)}
            className="lg:col-span-2 parallax-container"
          >
            <div className="top-5 space-y-5">
              {sidebarData.map((section) => (
                <TableCard key={section.title} {...section} />
              ))}
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
