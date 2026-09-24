import React from 'react';
import { portfolioData } from '../../../data/portfolioData';

/**
 * Pillar 02: MARKETING ANALYTICS
 * Subheading: MEASURE • UNDERSTAND • OPTIMIZE
 * Visual Pipeline: DATA → BEHAVIOR → INSIGHT → OPTIMIZATION
 * Focus: GA4, Search Console, Looker Studio, Attribution, Conversions
 */
export const Pillar02MarketingAnalytics = () => {
  const data = portfolioData.fourPillars[1];

  const pipelineSteps = [
    { num: "01", step: "DATA", desc: "GA4 events, Search Console query logs & telemetry" },
    { num: "02", step: "BEHAVIOR", desc: "Session flows, scroll depths, bounce rates & time on page" },
    { num: "03", step: "INSIGHT", desc: "Looker Studio charts synthesizing channel attribution" },
    { num: "04", step: "OPTIMIZATION", desc: "Iterative adjustments to UX, meta, and campaign funnels" }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in w-full">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-5 h-[1.5px] bg-ink"></span>
          <span className="meta-tag text-ink font-bold">[ PILLAR 02 // BEHAVIORAL TELEMETRY ]</span>
        </div>

        <h2 className="editorial-headline text-4xl sm:text-6xl lg:text-[5.75rem] font-extrabold uppercase tracking-tight leading-[0.9] text-ink">
          Marketing <br />
          <span className="bg-lime text-ink px-3 sm:px-4 py-0.5 inline-block mt-1">
            Analytics.
          </span>
        </h2>

        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-extrabold text-ink/70 tracking-wider">
          <span className="text-ink">MEASURE</span>
          <span className="text-ink/30">•</span>
          <span className="text-ink">UNDERSTAND</span>
          <span className="text-ink/30">•</span>
          <span className="text-ink">OPTIMIZE</span>
        </div>

        <p className="text-xs sm:text-sm text-ink/75 font-mono max-w-2xl leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Visual Pipeline Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-3 bg-ink text-white rounded-2xl">
        {pipelineSteps.map((p, idx) => (
          <div key={p.num} className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>PHASE {p.num}</span>
              {idx < 3 && <span className="text-lime font-bold">→</span>}
            </div>
            <div className="font-mono text-sm font-bold text-lime">{p.step}</div>
            <p className="text-[10px] font-mono text-white/60 leading-tight">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Verified Analytics Capabilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
        {data.capabilities.map((cap, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-xl border border-ink/10 shadow-sm space-y-1.5 hover:border-ink transition-colors"
          >
            <div className="flex items-center justify-between pb-1 border-b border-ink/5">
              <span className="font-mono text-xs font-bold text-ink">{cap.name}</span>
              <span className="text-[10px] font-mono text-ink/30">0{idx + 1}</span>
            </div>
            <p className="text-[11px] font-mono text-ink/65 leading-relaxed">
              {cap.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pillar02MarketingAnalytics;
