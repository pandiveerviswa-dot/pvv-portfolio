import React from 'react';

/**
 * CapabilitiesNavigator: Minimalist persistent capability and UI/UX tracker
 * Highlights active pillar and active sub-principle based on scroll progression.
 */
export const CapabilitiesNavigator = ({ activePillar = 0, activeUiUxScene = 0, onSelectPillar }) => {
  const pillars = [
    { num: "01", name: "DIGITAL MARKETING" },
    { num: "02", name: "MARKETING ANALYTICS" },
    { num: "03", name: "UI/UX & EXPERIENCE" },
    { num: "04", name: "FRONT-END & WEB" },
    { num: "05", name: "THE DIGITAL STACK" },
    { num: "06", name: "HOW I THINK & WORK" }
  ];

  const uiuxScenes = [
    "01 UX", "02 IA", "03 WIREFRAME", "04 VISUAL",
    "05 RESPONSIVE", "06 INTERACTION", "07 USABILITY",
    "08 SYSTEM", "09 EXPERIENCE"
  ];

  return (
    <div className="w-full flex flex-col items-center gap-2 border-b border-ink/10 pb-3 mb-6 sm:mb-8 font-mono">
      {/* Primary Pillar Rail */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs">
        {pillars.map((pillar, idx) => {
          const isActive = activePillar === idx;
          return (
            <div
              key={pillar.num}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-ink text-lime font-bold shadow-sm'
                  : 'text-ink/40 hover:text-ink/80'
              }`}
            >
              <span>{pillar.num}</span>
              <span className="tracking-wider">{pillar.name}</span>
            </div>
          );
        })}
      </div>

      {/* Secondary UI/UX Sub-Rail (Only visible when Pillar 03 is active) */}
      {activePillar === 2 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 text-[9px] sm:text-[10px] text-ink/50 pt-1 border-t border-ink/5 w-full">
          <span className="text-ink/30 font-bold uppercase tracking-widest mr-1">DISCIPLINE:</span>
          {uiuxScenes.map((scene, idx) => {
            const isSubActive = activeUiUxScene === idx;
            return (
              <span
                key={scene}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  isSubActive
                    ? 'bg-lime text-ink font-bold'
                    : 'text-ink/40'
                }`}
              >
                {scene}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CapabilitiesNavigator;
