import React from 'react';

/**
 * TheDigitalStack: The Hybrid Skill Map & Connection Architecture
 * Center: DIGITAL EXPERIENCE
 * Perimeter: MARKETING • ANALYTICS • UI/UX • WEB TECHNOLOGY
 * Bidirectional Connections:
 * SEO ↔ CONTENT ↔ UX ↔ WEB ↔ ANALYTICS ↔ MARKETING ↔ CONVERSION
 */
export const TheDigitalStack = () => {
  const connections = [
    { from: "SEO", to: "CONTENT", desc: "Keyword intent informs editorial structure & topic authority" },
    { from: "CONTENT", to: "UX", desc: "Scannable typography & layout reduce cognitive friction" },
    { from: "UX", to: "WEB", desc: "Mobile-friendly responsiveness & speed ensure fluid rendering" },
    { from: "WEB", to: "ANALYTICS", desc: "Semantic DOM markup enables precise GA4 event telemetry" },
    { from: "ANALYTICS", to: "MARKETING", desc: "Attribution data channels budgets into highest-ROI funnels" },
    { from: "MARKETING", to: "CONVERSION", desc: "Lead magnets, forms & value propositions turn intent into outcomes" }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in w-full">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-5 h-[1.5px] bg-ink"></span>
          <span className="meta-tag text-ink font-bold">[ SYSTEM ARCHITECTURE // THE DIGITAL STACK ]</span>
        </div>

        <h2 className="editorial-headline text-4xl sm:text-6xl lg:text-[5.75rem] font-extrabold uppercase tracking-tight leading-[0.9] text-ink">
          The Digital <br />
          <span className="bg-lime text-ink px-3 sm:px-4 py-0.5 inline-block mt-1">
            Stack.
          </span>
        </h2>

        <div className="font-mono text-xs sm:text-sm font-extrabold text-ink/70 tracking-wider">
          MARKETING (Attract) → UI/UX (Engage) → ANALYTICS (Understand) → TECHNOLOGY (Deliver) → OPTIMIZE ↺
        </div>
      </div>

      {/* Centerpiece Architecture Map */}
      <div className="p-6 sm:p-8 bg-ink text-white rounded-2xl shadow-xl border border-ink space-y-6">
        {/* Core Hub */}
        <div className="flex flex-col items-center text-center space-y-2 border-b border-white/10 pb-5">
          <span className="text-[10px] font-mono text-lime font-bold uppercase tracking-widest">[ CENTRAL DISCIPLINE ]</span>
          <div className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            DIGITAL EXPERIENCE
          </div>
          <p className="text-xs font-mono text-white/60 max-w-lg">
            Where marketing strategy, user interface craft, performance data, and browser execution operate in continuous feedback.
          </p>
        </div>

        {/* 6 Bidirectional Connections Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
          {connections.map((conn, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1.5 hover:border-lime transition-colors group"
            >
              <div className="flex items-center justify-between text-lime font-bold text-[11px]">
                <span className="group-hover:text-white transition-colors">{conn.from}</span>
                <span className="text-white/40">↔</span>
                <span className="group-hover:text-white transition-colors">{conn.to}</span>
              </div>
              <p className="text-[10px] text-white/70 leading-relaxed">
                {conn.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Optimization Loop Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-white/40 border-t border-white/10 pt-3">
          <span className="text-lime font-bold">● CONTINUOUS CONVERSION REFINEMENT</span>
          <span>EACH NODE INFORMS AND ELEVATES THE NEXT</span>
        </div>
      </div>
    </div>
  );
};

export default TheDigitalStack;
