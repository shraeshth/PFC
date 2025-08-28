// ImageItem.js
import gsap from "gsap";

export default class ImageItem {
  constructor(element) {
    this.element = element;
    this.inner = element.querySelector(".content__img-inner");
    this.rect = null;
    this.defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
    this.updateRect();
    this.bindEvents();
  }
  bindEvents() {
    this.handleResize = () => {
      gsap.set(this.element, this.defaultStyle);
      this.updateRect();
    };
    window.addEventListener("resize", this.handleResize, { passive: true });
  }
  updateRect() {
    this.rect = this.element.getBoundingClientRect();
  }
  cleanup() {
    window.removeEventListener("resize", this.handleResize);
  }
}
