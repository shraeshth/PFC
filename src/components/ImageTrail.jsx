import React, { useEffect, useRef } from "react";

// Utility functions
function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(e, rect) {
  let clientX = 0, clientY = 0;
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

function getMouseDistance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

// ImageItem class
class ImageItem {
  DOM = { el: null, inner: null };
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
  rect = null;

  constructor(DOM_el) {
    this.DOM.el = DOM_el;
    this.DOM.inner = this.DOM.el.querySelector('.content__img-inner');
    this.getRect();
    this.initEvents();
  }

  initEvents() {
    this.resize = () => {
      if (window.gsap) {
        window.gsap.set(this.DOM.el, this.defaultStyle);
      }
      this.getRect();
    };
    window.addEventListener('resize', this.resize);
  }

  getRect() {
    this.rect = this.DOM.el.getBoundingClientRect();
  }
}

// Enhanced ImageTrail class with multiple variants
class ImageTrailVariant2 {
  constructor(container) {
    this.container = container;
    this.DOM = { el: container };
    this.images = [...container.querySelectorAll('.content__img')].map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 80;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    const handlePointerMove = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove);

    const initRender = ev => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };

      requestAnimationFrame(() => this.render());

      container.removeEventListener('mousemove', initRender);
      container.removeEventListener('touchmove', initRender);
    };
    container.addEventListener('mousemove', initRender);
    container.addEventListener('touchmove', initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) {
      this.zIndexVal = 1;
    }
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    if (!window.gsap) return;
    
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];

    window.gsap.killTweensOf(img.DOM.el);
    window.gsap.timeline({
      onStart: () => this.onImageActivated(),
      onComplete: () => this.onImageDeactivated()
    })
      .fromTo(img.DOM.el, {
        opacity: 1, scale: 0,
        zIndex: this.zIndexVal,
        x: this.cacheMousePos.x - img.rect.width / 2,
        y: this.cacheMousePos.y - img.rect.height / 2
      }, {
        duration: 0.4, ease: 'power1', scale: 1,
        x: this.mousePos.x - img.rect.width / 2,
        y: this.mousePos.y - img.rect.height / 2
      }, 0)
      .fromTo(img.DOM.inner, {
        scale: 2.8, filter: 'brightness(250%)'
      }, {
        duration: 0.4, ease: 'power1',
        scale: 1, filter: 'brightness(100%)'
      }, 0)
      .to(img.DOM.el, {
        duration: 0.4, ease: 'power2',
        opacity: 0, scale: 0.2
      }, 0.45);
  }

  onImageActivated() { 
    this.activeImagesCount++; 
    this.isIdle = false; 
  }
  
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) this.isIdle = true;
  }
}

const ImageTrailHero = ({ variant = 2 }) => {
  // Sample images - replace with your actual images
  const images = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400", 
    "https://images.unsplash.com/photo-1500359436779-dd54e19c9e2c?w=400",
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400"
  ];

  const containerRef = useRef(null);
  const imageTrailRef = useRef(null);

  useEffect(() => {
    // Wait for GSAP to be available
    const checkGSAP = () => {
      if (window.gsap && containerRef.current) {
        imageTrailRef.current = new ImageTrailVariant2(containerRef.current);
      } else {
        setTimeout(checkGSAP, 100);
      }
    };
    checkGSAP();

    // Cleanup
    return () => {
      if (imageTrailRef.current) {
        // Clean up event listeners if needed
        window.removeEventListener('resize', imageTrailRef.current.resize);
      }
    };
  }, [variant]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden mt-20"
    >
      {/* Content - Higher z-index */}
      <div className="relative z-50 flex flex-col items-center justify-center min-h-screen text-center px-4 pointer-events-none">
        <div className="pointer-events-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-white leading-tight mb-6 max-w-3xl">
          Capturing Moments, Creating Stories
        </h1>

        <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto mb-8 font-light leading-relaxed">
          The Photography & Filming Club is where passion meets lens. From
          timeless portraits to cinematic films, we turn every frame into art.
        </p>

        <button className="bg-transparent border border-white/30 text-white px-8 py-3 rounded-full text-base font-medium hover:bg-white hover:text-black transition-all duration-300 mb-16 tracking-wide">
          Join
        </button>

        <div className="group cursor-pointer animate-bounce hover:animate-none transition-all duration-300 hover:scale-110">
          <i className="ri-arrow-down-s-line text-2xl text-white/80 group-hover:text-white group-hover:translate-y-1 transition-all duration-300 ease-out"></i>
        </div>
        </div>
      </div>

      {/* Image Trail Elements - Behind content */}
      {images.map((url, i) => (
        <div 
          className="content__img w-[190px] aspect-[1.1] rounded-[15px] absolute top-0 left-0 opacity-0 overflow-hidden pointer-events-none" 
          key={i}
          style={{ willChange: 'transform,filter', zIndex: 10 }}
        >
          <div
            className="content__img-inner bg-center bg-cover w-[calc(100%+20px)] h-[calc(100%+20px)] absolute top-[-10px] left-[-10px]"
            style={{ backgroundImage: `url(${url})` }}
          />
        </div>
      ))}

      {/* GSAP Script Loader */}
      <script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        onLoad={() => {
          // GSAP loaded, component will initialize
        }}
      />
    </section>
  );
};

export default ImageTrailHero;