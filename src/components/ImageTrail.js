// ImageTrail.js
import gsap from "gsap";
import ImageItem from "./ImageItem";

const lerp = (a, b, n) => (1 - n) * a + n * b;
const getDistance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

const getPointerPosition = (e, rect) => {
  const touch = e.touches?.[0];
  const clientX = touch?.clientX ?? e.clientX;
  const clientY = touch?.clientY ?? e.clientY;
  return { x: clientX - rect.left, y: clientY - rect.top };
};

export default class ImageTrail {
  constructor(container) {
    this.container = container;
    this.images = this.initializeImages();
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.threshold = this.getResponsiveThreshold();
    this.animationId = null;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    this.bindEvents();
    this.handleResize();
  }

  getResponsiveThreshold() {
    const width = window.innerWidth;
    if (width < 768) return 40;
    if (width < 1024) return 55;
    return 70;
  }

  getResponsiveImageSize() {
    const width = window.innerWidth;
    if (width < 640) return { width: 140, aspectRatio: 1.3 };
    if (width < 768) return { width: 160, aspectRatio: 1.25 };
    if (width < 1024) return { width: 185, aspectRatio: 1.2 };
    return { width: 210, aspectRatio: 1.2 };
  }

  handleResize() {
    this.threshold = this.getResponsiveThreshold();
    const { width } = this.getResponsiveImageSize();
    this.images.forEach((img) => {
      gsap.set(img.element, {
        width: width,
        height: width / this.getResponsiveImageSize().aspectRatio,
      });
      img.updateRect();
    });
  }

  initializeImages() {
    return [...this.container.querySelectorAll(".content__img")].map(
      (img) => new ImageItem(img)
    );
  }

  bindEvents() {
    const handlePointerMove = (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getPointerPosition(e, rect);
    };

    const initRender = (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getPointerPosition(e, rect);
      this.cacheMousePos = { ...this.mousePos };
      this.startRenderLoop();

      this.container.removeEventListener("mousemove", initRender);
      this.container.removeEventListener("touchmove", initRender);
    };

    this.container.addEventListener("mousemove", handlePointerMove, {
      passive: true,
    });
    this.container.addEventListener("touchmove", handlePointerMove, {
      passive: true,
    });
    this.container.addEventListener("mousemove", initRender, { passive: true });
    this.container.addEventListener("touchmove", initRender, { passive: true });
    window.addEventListener("resize", () => this.handleResize(), {
      passive: true,
    });
  }

  startRenderLoop() {
    const render = () => {
      const distance = getDistance(this.mousePos, this.lastMousePos);
      this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.12);
      this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.12);

      if (distance > this.threshold) {
        this.showNextImage();
        this.lastMousePos = { ...this.mousePos };
      }

      this.animationId = requestAnimationFrame(render);
    };
    this.animationId = requestAnimationFrame(render);
  }

  showNextImage() {
    this.zIndexVal++;
    this.imgPosition = (this.imgPosition + 1) % this.imagesTotal;
    const img = this.images[this.imgPosition];

    gsap.killTweensOf(img.element);

    const centerX = img.rect.width / 2;
    const centerY = img.rect.height / 2;

    gsap
      .timeline()
      .fromTo(
        img.element,
        {
          opacity: 1,
          scale: 0.3,
          rotation: Math.random() * 20 - 10,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - centerX,
          y: this.cacheMousePos.y - centerY,
        },
        {
          duration: 0.5,
          scale: 1,
          rotation: 0,
          x: this.mousePos.x - centerX,
          y: this.mousePos.y - centerY,
          ease: "power3.out",
        }
      )
      .to(img.element, {
        duration: 0.6,
        opacity: 0,
        scale: 0.8,
        rotation: Math.random() * 15 - 7.5,
        delay: 0.3,
        ease: "power2.inOut",
      });
  }

  cleanup() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    this.images.forEach((img) => img.cleanup());
    gsap.killTweensOf("*");
  }
}
