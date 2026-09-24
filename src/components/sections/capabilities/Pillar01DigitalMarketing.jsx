import React from 'react';
import { portfolioData } from '../../../data/portfolioData';

/**
 * Pillar 01: DIGITAL MARKETING
 * Subheading: ATTRACT • ENGAGE • CONVERT
 * Focus: SEO, Performance Channels, Campaign Management, Content Optimization
 */
export const Pillar01DigitalMarketing = () => {
  const data = portfolioData.fourPillars[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in w-full">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-5 h-[1.5px] bg-ink"></span>
          <span className="meta-tag text-ink font-bold">[ PILLAR 01 // ACQUISITION ARCHITECTURE ]</span>
        </div>

        <h2 className="editorial-headline text-4xl sm:text-6xl lg:text-[5.75rem] font-extrabold uppercase tracking-tight leading-[0.9] text-ink">
          Digital <br />
          <span className="bg-lime text-ink px-3 sm:px-4 py-0.5 inline-block mt-1">
            Marketing.
          </span>
        </h2>

        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-extrabold text-ink/70 tracking-wider">
          <span className="text-ink">ATTRACT</span>
          <span className="text-ink/30">•</span>
          <span className="text-ink">ENGAGE</span>
          <span className="text-ink/30">•</span>
          <span className="text-ink">CONVERT</span>
        </div>

        <p className="text-xs sm:text-sm text-ink/75 font-mono max-w-2xl leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Verified Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
        {/* Left: Core Capabilities (7 items) */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-xl border border-ink/10 shadow-sm space-y-1.5 hover:border-ink transition-colors"
            >
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink">
                <span className="w-1.5 h-1.5 rounded-full bg-lime"></span>
                <span>{cap.name}</span>
              </div>
              <p className="text-[11px] font-mono text-ink/60 leading-relaxed pl-3.5">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Actual Work Areas from Resume */}
        <div className="md:col-span-4 space-y-4">
          <div className="p-5 bg-ink text-white rounded-2xl space-y-4 shadow-md border border-ink">
            <div className="flex justify-between items-center pb-2 border-b border-white/10 font-mono text-xs">
              <span className="text-lime font-bold">VERIFIED WORK AREAS</span>
              <span className="text-white/40">RESUME</span>
            </div>
            <ul className="space-y-2.5 font-mono text-xs">
              {data.workAreas.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2 text-white/90">
                  <span className="text-lime font-bold">→</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-white/70 rounded-xl border border-ink/10 font-mono text-[11px] text-ink/60 space-y-1">
            <div className="font-bold text-ink flex items-center gap-1.5">
              <span className="text-lime">■</span>
              <span>STRATEGIC ALIGNMENT</span>
            </div>
            <p>
              Search intent research strictly mapped to technical on-page architectures, Google Search Console indexing, and multi-channel campaign telemetry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pillar01DigitalMarketing;
