import React, { useState, useRef } from 'react';
import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageZoomMagnifierProps {
  imageUrl: string;
  alt: string;
}

export const ImageZoomMagnifier: React.FC<ImageZoomMagnifierProps> = ({ imageUrl, alt }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use a very high res request for the zoomed overlay if we're using cloudinary auto transforms, 
  // but for Govigyan we can use the original imageUrl since it's already HQ.
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    // Get mouse position relative to the container
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate percentage coordinates
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // Optional bounds clamping to keep it strictly between 0 and 100
    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    setMousePosition({ x: boundedX, y: boundedY });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-soft)] shadow-md aspect-square flex items-center justify-center cursor-crosshair group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        // Reset purely optional smoothly
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Base Image */}
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover transition-opacity duration-300 pointer-events-none"
        style={{ opacity: isHovering ? 0 : 1 }}
      />
      
      {/* Zoom Overlay Layer */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0 z-10 w-full h-full"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
              // This denotes how much we zoom in. 200% = 2x zoom
              backgroundSize: '250%', 
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
      </AnimatePresence>

      {/* Subtle sheen / glass effect that stays on top */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent to-white/5 opacity-50" />
    </div>
  );
};
