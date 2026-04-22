import { useState, useEffect } from 'react';

interface CloudinaryImageProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

export const CloudinaryImage = ({ 
  imageUrl,
  alt, 
  className = ''
}: CloudinaryImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Component acts as a safe visual loader for our static cloudinary links
  }, [imageUrl]);

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0 animate-pulse bg-[color:var(--color-surface)]"></div>
      )}
      
      {/* Error Fallback Gradient */}
      {hasError && (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-[color:var(--color-surface-soft)] via-[color:var(--color-surface)] to-[color:var(--color-surface)] opacity-90 backdrop-blur-md">
            <span className="text-[var(--color-text)]/40 font-bold tracking-widest uppercase text-xs rotate-[-10deg] drop-shadow-md">
               No Asset
            </span>
        </div>
      )}
      
      {/* Actual Image Render */}
      {!hasError && (
        <img
          src={imageUrl}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ease-out z-10 relative ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        />
      )}
    </div>
  );
};
