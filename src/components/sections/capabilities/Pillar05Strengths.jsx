import React from 'react';
import { portfolioData } from '../../../data/portfolioData';

/**
 * Pillar 05: HOW I THINK & WORK (Professional Strengths)
 * Presents the 10 verified soft skills from the resume in a refined editorial architecture.
 */
export const Pillar05Strengths = () => {
  const strengths = portfolioData.howIThinkAndWork;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in w-full">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-5 h-[1.5px] bg-ink"></span>
          <span className="meta-tag text-ink font-bold">[ PILLAR 05 // PROFESSIONAL STRENGTHS ]</span>
        </div>

        <h2 className="editorial-headline text-4xl sm:text-6xl lg:text-[5.75rem] font-extrabold uppercase tracking-tight leading-[0.9] text-ink">
          How I Think <br />
          <span className="bg-lime text-ink px-3 sm:px-4 py-0.5 inline-block mt-1">
            & Work.
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-ink/75 font-mono max-w-2xl leading-relaxed">
          Technical competence requires intellectual discipline. The cognitive habits and professional strengths that govern how problems are solved, sprints are delivered, and collaboration thrives.
        </p>
      </div>

      {/* 10 Strengths Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
        {strengths.map((item) => (
          <div
            key={item.num}
            className="p-4 bg-white rounded-xl border border-ink/10 shadow-sm space-y-2 hover:border-ink transition-colors flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-mono text-ink/40">
                <span>HABIT</span>
                <span className="font-bold text-lime bg-ink px-1.5 py-0.5 rounded">{item.num}</span>
              </div>
              <div className="font-mono text-xs font-bold text-ink leading-snug">{item.name}</div>
              <p className="text-[10px] font-mono text-ink/65 leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="pt-2 border-t border-ink/5 text-[9px] font-mono text-ink/30 uppercase">
              VERIFIED RESUME
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pillar05Strengths;
