import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { useNavigationTransition } from '../../context/TransitionContext';

export const Navigation = ({ progress, onJumpTo }) => {
  const { isTransitioning, currentSection } = useNavigationTransition();
  const [menuOpen, setMenuOpen] = useState(false);

  // Determine contrast state based on scene background:
  const isLime = progress >= 0.19 && progress < 0.23;
  const isLight = progress >= 0.90 && progress < 0.94;
  const isDark = !isLime && !isLight;

  const links = [
    { name: 'CAPABILITIES', section: 'capabilities' },
    { name: 'WORK', section: 'work' },
    { name: 'EXPERIENCE', section: 'experience' },
    { name: 'CONTACT', section: 'contact' },
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleMobileJump = (section) => {
    setMenuOpen(false);
    onJumpTo(section);
  };

  const resumeClass = `meta-tag inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] transition-all duration-200 font-bold ${
    isLime
      ? 'border-ink bg-ink text-lime'
      : isDark
      ? 'border-white/20 text-white hover:bg-white hover:text-black'
      : 'border-ink/20 text-ink hover:bg-ink hover:text-white'
  }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-12 py-3 md:py-5 transition-all duration-500 ${
        isLime
          ? 'bg-lime/90 text-ink border-b-2 border-ink backdrop-blur-md'
          : isDark
          ? 'bg-black/80 border-b border-white/10 text-white backdrop-blur-md'
          : 'bg-[#F5F5F1]/85 border-b border-ink/10 text-ink backdrop-blur-md'
      } ${isTransitioning ? 'pointer-events-none select-none opacity-85' : ''}`}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo -> Triggers pullback to Solar System overview / Hero */}
        <button
          onClick={() => handleMobileJump('hero')}
          disabled={isTransitioning}
          className="flex items-center gap-2 sm:gap-2.5 font-display font-extrabold text-[12px] min-[400px]:text-[13px] sm:text-sm tracking-tight whitespace-nowrap min-h-[44px] md:min-h-0 focus:outline-none group disabled:opacity-60 transition-opacity"
          aria-label="Return to solar system overview"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-lime group-hover:scale-125 transition-transform duration-300"></span>
          <span className="tracking-tighter">PANDI VEER VISWA</span>
        </button>

        {/* Desktop / tablet links */}
        <nav className="hidden md:flex items-center gap-6 sm:gap-10">
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
          <a href={portfolioData.personal.resumePath} download className={resumeClass}>
            <span>RESUME</span>
            <ArrowUpRight className="w-3 h-3 text-lime" />
          </a>
        </nav>

        {/* Mobile: resume stays one tap away, links live in the menu */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={portfolioData.personal.resumePath}
            download
            aria-label="Download resume (PDF)"
            className={`${resumeClass} min-h-[40px]`}
          >
            <span className="min-[400px]:hidden">CV</span>
            <span className="hidden min-[400px]:inline">RESUME</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-lime" />
          </a>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            disabled={isTransitioning}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className={`w-11 h-11 flex items-center justify-center rounded-full border transition-colors ${
              isDark ? 'border-white/20' : 'border-ink/20'
            }`}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          className={`md:hidden mt-3 -mx-4 px-4 pt-2 pb-4 border-t ${
            isDark ? 'border-white/10' : 'border-ink/15'
          }`}
        >
          {links.map((link) => {
            const isActive = currentSection === link.section;
            return (
              <button
                key={link.name}
                onClick={() => handleMobileJump(link.section)}
                disabled={isTransitioning}
                className={`w-full flex items-center justify-between min-h-[48px] font-mono text-sm font-bold tracking-widest border-b ${
                  isDark ? 'border-white/10' : 'border-ink/10'
                } ${isActive ? 'text-lime' : ''} disabled:opacity-50`}
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-lime" />
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default Navigation;
