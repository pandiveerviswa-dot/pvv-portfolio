import React from 'react';
import { FileDown, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

/**
 * Contact: The filmic conclusion of the editorial motion-design experience
 * Features massive typography, direct email/phone actions, and verified resume download.
 */
export const Contact = ({ opacity = 1, translateY = 0 }) => {
  return (
    <section
      className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 lg:p-16 pt-24 sm:pt-28 max-w-[1600px] mx-auto w-full text-white transition-opacity duration-300"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.3 ? 'auto' : 'none',
      }}
    >
      {/* Top Header Tag */}
      <div className="flex justify-between items-center text-[11px] sm:text-xs font-mono text-white/50 border-b border-white/10 pb-4">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lime"></span>
          <span>DESTINATION // CONTACT & COLLABORATION</span>
        </span>
        <span>BANGALORE, INDIA • AVAILABLE FOR ROLES</span>
      </div>

      {/* Massive Editorial Headline & Communication Actions */}
      <div className="space-y-6 sm:space-y-8 my-auto">
        <h2 className="editorial-headline text-5xl sm:text-8xl lg:text-[9.5rem] font-extrabold uppercase tracking-tighter leading-none text-white">
          Let’s Talk<span className="text-lime">.</span>
        </h2>

        <div className="space-y-3 pt-2">
          {/* Direct Email Action */}
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="editorial-headline text-2xl sm:text-5xl lg:text-6xl font-bold text-white hover:text-lime transition-colors underline decoration-white/20 hover:decoration-lime underline-offset-8 block"
          >
            {portfolioData.personal.email}
          </a>

          {/* Direct Phone & Location Action */}
          <div className="flex flex-wrap items-center gap-4 text-white/70 font-mono text-sm sm:text-base pt-1">
            <a
              href={`tel:${portfolioData.personal.phone}`}
              className="hover:text-lime transition-colors underline decoration-white/20 underline-offset-4"
            >
              {portfolioData.personal.phone}
            </a>
            <span className="text-white/30">•</span>
            <span>{portfolioData.personal.location}</span>
          </div>
        </div>

        {/* Primary Resume Download Button */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <a
            href={portfolioData.personal.resumePath}
            download="Pandi-Veer-Viswa-Resume.pdf"
            className="meta-tag inline-flex items-center gap-2.5 px-8 py-4 bg-lime text-ink hover:bg-white rounded-full transition-all duration-200 text-xs font-bold"
          >
            <span>DOWNLOAD RESUME (PDF)</span>
            <FileDown className="w-4 h-4 text-ink" />
          </a>
          <span className="text-xs font-mono text-white/40">
            Target: /Pandi-Veer-Viswa-Resume.pdf
          </span>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 text-[11px] sm:text-xs font-mono text-white/50 border-t border-white/10 pt-6">
        <div>PANDI VEER VISWA • DIGITAL MARKETING EXECUTIVE</div>
        <div className="flex items-center gap-6">
          <a href={portfolioData.personal.linkedin} className="hover:text-lime transition-colors flex items-center gap-1">
            <span>LINKEDIN</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href={portfolioData.personal.github} className="hover:text-lime transition-colors flex items-center gap-1">
            <span>GITHUB</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div>© {new Date().getFullYear()} ALL RIGHTS RESERVED</div>
      </div>
    </section>
  );
};

export default Contact;
