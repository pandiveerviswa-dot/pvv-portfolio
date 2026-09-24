import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

/**
 * Editorial Footer: Minimal, quiet, high-contrast ending bar
 */
export const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10 py-8 px-6 sm:px-12 lg:px-16 text-xs font-mono">
      <div className="max-w-[1600px] mx-auto flex flex-wrap justify-between items-center gap-4 text-white/50">
        <div>{portfolioData.personal.name} • {portfolioData.personal.role}</div>
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
    </footer>
  );
};

export default Footer;
