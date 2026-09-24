import React from 'react';
import { portfolioData } from '../../data/portfolioData';

/**
 * Experience: Architectural career timeline and academic foundation
 * Presenting verified Noodhan Technology tenure, education, and soft competencies.
 */
export const Experience = ({ opacity = 1, translateY = 0, progress = 0 }) => {
  const exp = portfolioData.experience[0];

  return (
    <section
      className="absolute inset-0 flex flex-col justify-center p-6 sm:p-12 lg:p-16 pt-24 sm:pt-28 max-w-[1600px] mx-auto w-full text-ink transition-opacity duration-300"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.3 ? 'auto' : 'none',
      }}
    >
      <div className="space-y-6 sm:space-y-8 max-w-6xl w-full mx-auto">
        {/* Verified Industry Experience: Noodhan Technology */}
        <div className="p-6 sm:p-10 bg-black text-white rounded-3xl border border-white/20 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/15">
            <div className="meta-tag text-lime font-bold">
              [ 05 / VERIFIED INDUSTRY EXPERIENCE ]
            </div>
            <span className="meta-tag text-white/50">{exp.period}</span>
          </div>

          <div className="space-y-1">
            <h2 className="editorial-headline text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
              {exp.role}.
            </h2>
            <p className="text-sm sm:text-base font-mono text-white/70">
              {exp.company}
            </p>
          </div>

          {/* 5 Categorized Verified Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {exp.highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs sm:text-sm text-white/80 flex items-start gap-2.5 leading-relaxed"
              >
                <span className="w-2 h-2 rounded-full bg-lime mt-1.5 shrink-0"></span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Languages & Soft Skills Ticker Strip */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 text-xs font-mono text-white/60">
            <span className="text-white/40">PROFICIENCIES:</span>
            <span className="px-2.5 py-1 bg-white/10 rounded-full text-white">ENGLISH</span>
            <span className="px-2.5 py-1 bg-white/10 rounded-full text-white">TAMIL</span>
            <span className="text-white/30">•</span>
            <span>ANALYTICAL THINKING • PROBLEM SOLVING • ATTENTION TO DETAIL</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
