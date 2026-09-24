import React from 'react';

/**
 * ImageReveal: Large-format photographic editorial visual
 * Supports scale, crop, aspect ratio shifting, and high contrast styling.
 */
export const ImageReveal = ({
  src,
  alt = "Editorial visual",
  badge = "PORTFOLIO ASSET",
  aspectRatio = "aspect-[16/10]",
  scale = 1,
  crop = 0,
  className = "",
  children,
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/15 bg-black ${aspectRatio} ${className}`}>
      {/* Scaled & Cropped Photographic Visual */}
      <div 
        className="w-full h-full overflow-hidden transition-transform duration-300"
        style={{
          transform: `scale(${scale})`,
          clipPath: crop > 0 ? `inset(${crop * 5}% ${crop * 2}% ${crop * 5}% ${crop * 2}%)` : 'none',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover grayscale contrast-125 brightness-95 opacity-90 transition-opacity"
          onError={(e) => {
            // High-res SVG architectural fallback
            if (!e.target.dataset.triedFallback) {
              e.target.dataset.triedFallback = 'true';
              e.target.src = '/images/hero/hero.svg';
            }
          }}
        />
        {/* Subtle Lime Ambient Lighting Overlay & Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-lime/10 via-transparent to-black/40 mix-blend-screen" />
      </div>

      {/* Editorial Overlay Metadata */}
      {badge && (
        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-white/80 bg-black/85 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10">
          <span>{badge}</span>
          <span className="flex items-center gap-1.5 text-lime font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-lime"></span>
            <span>VERIFIED</span>
          </span>
        </div>
      )}

      {/* Layered content passed in (e.g. typography passing behind/over) */}
      {children}
    </div>
  );
};

export default ImageReveal;
