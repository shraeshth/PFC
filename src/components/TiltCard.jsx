import React, { useRef, useState, useCallback, memo } from "react";

const TiltCard = memo(({ image, onClick, width, height, isVisible }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [useHighRes, setUseHighRes] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -8; // Further reduced rotation
    const rotateY = (mouseX / (rect.width / 2)) * 8;
    
    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03) translateZ(10px)`
    );

    // Update tooltip position
    setTooltipPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback((e) => {
    setIsHovered(true);
    setUseHighRes(true); // Load high-res on hover
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

  // Don't render anything if not visible (for performance)
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
          src={useHighRes ? image.img : image.thumb}
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
      
      {/* Simplified reflection effect - only on larger cards */}
      {isHovered && width > 150 && (
        <div 
          className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300 opacity-10"
          style={{
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
            transform: 'translateZ(20px)',
          }}
        />
      )}
    </div>
  );
});

TiltCard.displayName = 'TiltCard';

export default TiltCard;