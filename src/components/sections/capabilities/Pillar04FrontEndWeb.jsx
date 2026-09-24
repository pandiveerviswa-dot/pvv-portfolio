import React from 'react';
import { portfolioData } from '../../../data/portfolioData';

/**
 * Pillar 04: FRONT-END & WEB TECHNOLOGY
 * Subheading: DESIGN → STRUCTURE → CODE → INTERACTION → EXPERIENCE
 * Focus: React, Vite, Tailwind CSS, JavaScript, HTML/CSS, WordPress, Elementor, Rank Math, WPForms, Python
 */
export const Pillar04FrontEndWeb = () => {
  const data = portfolioData.fourPillars[3];

  const categories = [
    {
      title: "COMPONENT & INTERFACE CODE",
      layer: "Modern Front-End",
      tools: data.tools.filter(t => ["JavaScript", "React", "Vite", "Tailwind CSS", "HTML5", "CSS3"].includes(t.name))
    },
    {
      title: "WEB ARCHITECTURE & CMS",
      layer: "CMS & Optimization",
      tools: data.tools.filter(t => ["WordPress", "Elementor", "Rank Math", "WPForms"].includes(t.name))
    },
    {
      title: "COMPUTATIONAL LOGIC & DATA",
      layer: "Foundations",
      tools: data.tools.filter(t => ["Python"].includes(t.name))
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in w-full">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-5 h-[1.5px] bg-ink"></span>
          <span className="meta-tag text-ink font-bold">[ PILLAR 04 // TECHNICAL WEB TOOLKIT ]</span>
        </div>

        <h2 className="editorial-headline text-4xl sm:text-6xl lg:text-[5.75rem] font-extrabold uppercase tracking-tight leading-[0.9] text-ink">
          Front-End & <br />
          <span className="bg-lime text-ink px-3 sm:px-4 py-0.5 inline-block mt-1">
            Web Technology.
          </span>
        </h2>

        <div className="font-mono text-xs sm:text-sm font-extrabold text-ink/70 tracking-wider">
          DESIGN → STRUCTURE → CODE → INTERACTION → EXPERIENCE
        </div>

        <p className="text-xs sm:text-sm text-ink/75 font-mono max-w-2xl leading-relaxed">
          {data.summary}
        </p>
      </div>

      {/* Technical Toolkit Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="p-5 bg-white rounded-2xl border border-ink/15 shadow-sm space-y-4 hover:border-ink transition-colors flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-baseline border-b border-ink/10 pb-2">
                <span className="font-mono text-xs font-bold text-ink">{cat.title}</span>
                <span className="text-[10px] font-mono text-ink/40">0{idx + 1}</span>
              </div>
              <ul className="space-y-2.5">
                {cat.tools.map((tool, tIdx) => (
                  <li key={tIdx} className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-ink flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime"></span>
                      <span>{tool.name}</span>
                    </span>
                    <span className="text-[10px] text-ink/50 px-2 py-0.5 bg-ink/5 rounded">
                      {tool.layer}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-ink/5 text-[10px] font-mono text-ink/40">
              LAYER // {cat.layer}
            </div>
          </div>
        ))}
      </div>

      {/* Proof of Technology Note */}
      <div className="p-4 bg-ink text-white rounded-xl font-mono text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-lime font-bold">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse"></span>
          <span>LIVE PROOF OF WEB CAPABILITY:</span>
        </div>
        <div className="text-white/70 text-[11px]">
          This portfolio itself is engineered using React 18, Vite, Three.js, GSAP ScrollTrigger, and Tailwind CSS.
        </div>
      </div>
    </div>
  );
};

export default Pillar04FrontEndWeb;
