import React from 'react';
import { portfolioData } from '../../data/portfolioData';

/**
 * Statement: The Hybrid Manifesto & Philosophy
 * Establishes the core identity: Marketing × Analytics × UI/UX × Front-End
 */
export const Statement = ({ opacity = 1, translateY = 0, progress = 0 }) => {
  return (
    <section
      className="absolute inset-0 flex flex-col justify-center p-6 sm:p-12 lg:p-16 pt-24 sm:pt-28 max-w-[1600px] mx-auto w-full text-white transition-opacity duration-300 z-10"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.3 ? 'auto' : 'none',
      }}
    >
      <div className="space-y-6 sm:space-y-8 max-w-5xl">
        <div className="flex items-center gap-3">
          <span className="w-6 h-[1.5px] bg-lime"></span>
          <span className="meta-tag text-lime font-bold">[ 02 / THE HYBRID DISCIPLINE ]</span>
        </div>

        <h2 
          className="editorial-headline font-extrabold uppercase tracking-tighter text-white"
          style={{
            fontSize: 'clamp(2.75rem, 6vw, 5.5rem)',
            lineHeight: 0.9,
          }}
        >
          Marketing<span className="text-lime">.</span> <br />
          Data<span className="text-lime">.</span> <br />
          Design<span className="text-lime">.</span> <br />
          Technology<span className="text-lime">.</span>
        </h2>

        <div className="pt-2 sm:pt-4 border-l-2 border-lime pl-6 sm:pl-8 max-w-3xl space-y-3">
          <p className="text-base sm:text-xl lg:text-2xl text-white font-medium leading-snug">
            "{portfolioData.personal.headline}"
          </p>
          <p className="text-xs sm:text-sm text-white/70 font-mono leading-relaxed">
            {portfolioData.positioningPhilosophy.statement}
          </p>
        </div>

        {/* Lower Metadata Area */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs font-mono text-white/50">
            <span>BANGALORE, INDIA</span>
            <span className="text-white/30">•</span>
            <span className="text-lime font-bold">{portfolioData.positioningPhilosophy.loop}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-white/60">
            <span className="text-white/90">B.Tech in Computer Science Engineering (AIML)</span>
            <span className="text-white/30">•</span>
            <span>Kalasalingam University</span>
            <span className="text-white/30">•</span>
            <span className="text-lime">2022 – 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statement;
