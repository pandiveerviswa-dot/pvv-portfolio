import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { useNavigationTransition } from '../../context/TransitionContext';

export const Navigation = ({ progress, onJumpTo }) => {
  const { isTransitioning, currentSection } = useNavigationTransition();

  // Determine contrast state based on scene background:
  const isLime = (progress >= 0.19 && progress < 0.23) || (progress >= 0.69 && progress < 0.73);
  const isLight = progress >= 0.90 && progress < 0.94;
  const isDark = !isLime && !isLight;

  const links = [
    { name: 'CAPABILITIES', section: 'capabilities' },
    { name: 'WORK', section: 'work' },
    { name: 'EXPERIENCE', section: 'experience' },
    { name: 'CONTACT', section: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-5 transition-all duration-500 ${
        isLime
          ? 'bg-lime/90 text-ink border-b-2 border-ink backdrop-blur-md'
          : isDark
          ? 'bg-black/80 border-b border-white/10 text-white backdrop-blur-md'
          : 'bg-[#F5F5F1]/85 border-b border-ink/10 text-ink backdrop-blur-md'
      } ${isTransitioning ? 'pointer-events-none select-none opacity-85' : ''}`}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Brand Logo -> Triggers pullback to Solar System overview / Hero */}
        <button
          onClick={() => onJumpTo('hero')}
          disabled={isTransitioning}
          className="flex items-center gap-2.5 font-display font-extrabold text-sm tracking-tight focus:outline-none group disabled:opacity-60 transition-opacity"
          aria-label="Return to solar system overview"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-lime group-hover:scale-125 transition-transform duration-300"></span>
          <span className="tracking-tighter">PANDI VEER VISWA</span>
        </button>

        {/* Links */}
        <nav className="flex items-center gap-6 sm:gap-10">
          {links.map((link) => {
            const isActive = currentSection === link.section;
            return (
              <button
                key={link.name}
                onClick={() => onJumpTo(link.section)}
                disabled={isTransitioning}
                className={`meta-tag text-[11px] transition-colors relative py-1 hover:underline underline-offset-4 decoration-lime decoration-2 font-bold ${
                  isActive ? 'text-lime underline decoration-lime decoration-2' : ''
                } disabled:opacity-50`}
              >
                {link.name}
              </button>
            );
          })}

          {/* Understated Resume action */}
          <a
            href={portfolioData.personal.resumePath}
            download
            className={`meta-tag inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] transition-all duration-200 font-bold ${
              isLime
                ? 'border-ink bg-ink text-lime'
                : isDark
                ? 'border-white/20 text-white hover:bg-white hover:text-black'
                : 'border-ink/20 text-ink hover:bg-ink hover:text-white'
            }`}
          >
            <span>RESUME</span>
            <ArrowUpRight className="w-3 h-3 text-lime" />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
