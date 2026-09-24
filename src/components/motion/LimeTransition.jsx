import React from 'react';

/**
 * LimeTransition: Signature acid-lime geometric wipe & aperture mask
 * Inspired directly by the reference video's geometric transition device.
 */
export const LimeTransition = ({ progress = 0, active = false, label = "TRANSITION" }) => {
  if (!active && (progress <= 0 || progress >= 1)) return null;

  // Split-curtain calculation:
  // From 0.0 to 0.5: Panels slide in from left & right
  // From 0.5 to 1.0: Center aperture reveals new content
  const splitProgress = Math.max(0, Math.min(1, progress));
  const topX = splitProgress < 0.5 ? (1 - splitProgress * 2) * -100 : 0;
  const bottomX = splitProgress < 0.5 ? (1 - splitProgress * 2) * 100 : 0;
  const curtainScaleY = splitProgress >= 0.5 ? 1 - (splitProgress - 0.5) * 2 : 1;

  return (
    <div 
      className="fixed inset-0 z-30 pointer-events-none flex flex-col justify-between overflow-hidden"
      style={{ opacity: active ? 1 : 0, transition: 'opacity 0.2s ease-out' }}
      aria-hidden="true"
    >
      {/* Top Geometric Panel */}
      <div 
        className="w-full h-1/2 bg-lime border-b-2 border-ink flex items-end px-6 sm:px-16 pb-4"
        style={{
          transform: `translateX(${topX}%) scaleY(${curtainScaleY})`,
          transformOrigin: 'top center',
          transition: 'transform 0.05s linear'
        }}
      >
        <div className="flex items-center justify-between w-full font-mono text-xs sm:text-base font-bold text-ink uppercase tracking-widest">
          <span>// {label}</span>
          <span className="hidden sm:inline">[ PANDI VEER VISWA // EDITORIAL FILM ]</span>
        </div>
      </div>

      {/* Bottom Geometric Panel */}
      <div 
        className="w-full h-1/2 bg-lime border-t-2 border-ink flex items-start px-6 sm:px-16 pt-4"
        style={{
          transform: `translateX(${bottomX}%) scaleY(${curtainScaleY})`,
          transformOrigin: 'bottom center',
          transition: 'transform 0.05s linear'
        }}
      >
        <div className="flex items-center justify-between w-full font-mono text-xs sm:text-base font-bold text-ink uppercase tracking-widest">
          <span>BANGALORE, INDIA • 2026</span>
          <span>SEO • ANALYTICS • CMS //</span>
        </div>
      </div>
    </div>
  );
};

export default LimeTransition;
