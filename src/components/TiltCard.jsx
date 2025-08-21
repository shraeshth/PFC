import React, { useRef, useState, useCallback, memo, useEffect } from "react";

const TiltCard = memo(({ image, onClick, isVisible }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [highResPreloaded, setHighResPreloaded] = useState(false);

  // Preload high-res image when the card becomes visible
  useEffect(() => {
    if (isVisible && image.img && !highResPreloaded) {
      const img = new Image();
      img.src = image.img;
      img.onload = () => setHighResPreloaded(true);
    }
  }, [isVisible, image.img, highResPreloaded]);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -8;
    const rotateY = (mouseX / (rect.width / 2)) * 8;
    
    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03) translateZ(10px)`
    );
  }, []);

  const handleMouseEnter = useCallback((e) => {
    setIsHovered(true);
    handleMouseMove(e);
  }, [handleMouseMove]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)');
  }, []);

  const handleClick = useCallback(() => {
    onClick(image);
  }, [onClick, image]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  if (!isVisible) {
    return (
      <div className="w-full h-full bg-gray-200/10 rounded-lg animate-pulse">
        <div className="w-full h-full bg-gray-300/20 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="relative w-full h-full cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Main Image Container */}
      <div
        className="relative w-full h-full rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-out"
        style={{
          transform: transform,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200/10 animate-pulse rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Optimized Image with progressive loading */}
        <img
          src={highResPreloaded ? image.img : image.thumb}
          alt={image.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
          onLoad={handleImageLoad}
          loading="lazy"
          decoding="async"
        />
        
        {/* Hover Overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: 'translateZ(10px)' }}
        />
        
        {/* Image Info Overlay */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-3 text-white transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
          style={{ transform: 'translateZ(15px)' }}
        >
          <h3 className="text-sm font-semibold mb-1 line-clamp-1">{image.title}</h3>
          <p className="text-xs text-white/80 line-clamp-1">{image.credits}</p>
        </div>
      </div>
    </div>
  );
});

TiltCard.displayName = 'TiltCard';

export default TiltCard;