import React from 'react';
import { ArrowDown } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

/**
 * Hero: Opening frame of the editorial motion-design film
 * High-fidelity implementation matching the approved cinematic solar system mockup.
 */
export const Hero = ({
  progress = 0,
  opacity = 1,
  translateY = 0,
  onBeginJourney,
}) => {
  const chapters = ['01', '02', '03', '04', '05'];

  // 100% Scroll-Scrubbed Portrait Reveal Mathematics
  // Normalized Hero scroll progress: 0.0 at top of hero -> 1.0 when scrolling down through Hero
  const heroP = Math.min(1, Math.max(0, progress / 0.08));

  // 1. Vertical Progressive Reveal (Expanding from the eyes outward)
  // At 0%: only eyes visible (top: 34%, bottom: 52% masked).
  // 0% -> 20%: eyes & forehead appear.
  // 20% -> 40%: upper face visible.
  // 40% -> 60%: most of face and ROG laptop appear.
  // 60% -> 80%: complete body/laptop revealed.
  // 85% -> 100%: 100% clean cinematic image.
  const clipTop = Math.max(0, (1 - Math.min(1, heroP / 0.40)) * 34);
  const clipBottom = Math.max(0, (1 - Math.min(1, heroP / 0.85)) * 52);

  // Progressive brightness, contrast, and opacity (dark initially, unmasking cleanly)
  const revealOpacity = 0.55 + heroP * 0.45;
  const revealBrightness = 0.38 + heroP * 0.62;
  const revealContrast = 1.35 - heroP * 0.35;

  // 2. Glitch Intensity Curve (Active ONLY between 0.08 and 0.85, strictly 0 at 0.85+)
  const glitchActive = heroP > 0.08 && heroP < 0.85;
  const glitchIntensity = glitchActive
    ? Math.sin((heroP / 0.85) * Math.PI) * (1 - heroP) * 1.5
    : 0;

  // Controlled horizontal slice displacement (deterministic based on heroP)
  const sliceShift1 = glitchActive ? Math.sin(heroP * 55) * glitchIntensity * 3.5 : 0;
  const sliceShift2 = glitchActive ? Math.cos(heroP * 65 + 1.2) * glitchIntensity * -4.0 : 0;
  const sliceShift3 = glitchActive ? Math.sin(heroP * 48 + 2.5) * glitchIntensity * 3.0 : 0;
  const rgbOffset = glitchActive ? Math.sin(heroP * 75) * glitchIntensity * 2.8 : 0;

  // 3. Frame Contact Effect (70% - 85%: brief controlled visual impact when touching boundaries)
  const inContact = heroP >= 0.70 && heroP <= 0.85;
  const contactFactor = inContact
    ? Math.sin(((heroP - 0.70) / 0.15) * Math.PI)
    : 0;
  const contactBrightness = 1.0 + contactFactor * 0.18;
  const contactShiftX = inContact ? Math.sin(heroP * 85) * contactFactor * 1.8 : 0;
  // Current active chapter based on master scroll progress
  const activeChapterIndex = progress < 0.20 ? 0 : progress < 0.46 ? 1 : progress < 0.86 ? 2 : progress < 0.94 ? 3 : 4;

  return (
    <section 
      className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-14 pt-24 sm:pt-28 max-w-[1650px] mx-auto w-full text-white transition-opacity duration-300 z-10"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        pointerEvents: opacity > 0.3 ? 'auto' : 'none',
      }}
    >
      {/* Top Meta Coordinate Bar */}
      <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-white/50 border-b border-white/10 pb-4">
        <span className="flex items-center gap-2">
          <span className="text-white/40">•</span>
          <span>EST. 2026 // PORTFOLIO RECORD</span>
        </span>
        <span className="tracking-wider">BANGALORE, INDIA • AVAILABLE</span>
      </div>

      {/* Hero Master Composition: Huge Typography + Real Photographic Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left: Oversized Editorial Headline with Vertical Chapter Rail */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <div className="meta-tag text-lime font-bold tracking-ultra-wide">
            [ 01 / EXECUTIVE IDENTITY ]
          </div>

          <div className="flex items-start gap-4 sm:gap-6">
            {/* Vertical Chapter Rail from Mockup */}
            <div className="hidden sm:flex flex-col items-center gap-3 pt-3 font-mono text-[10px] text-white/30 select-none">
              {chapters.map((ch, idx) => (
                <div key={ch} className="flex flex-col items-center gap-1.5">
                  <span className={`transition-colors font-bold ${idx === activeChapterIndex ? 'text-lime' : 'text-white/25'}`}>
                    {ch}
                  </span>
                  {idx === activeChapterIndex && (
                    <span className="w-1.5 h-1.5 rounded-full bg-lime my-0.5"></span>
                  )}
                </div>
              ))}
            </div>

            {/* Master Headline */}
            <div>
              <h1 
                className="editorial-headline font-extrabold uppercase tracking-tighter text-white"
                style={{
                  fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                  lineHeight: 0.88,
                }}
              >
                PANDI <br />
                VEER <br />
                VISWA
              </h1>

              <div className="text-xs sm:text-sm md:text-base font-mono font-extrabold tracking-wider text-lime uppercase flex flex-wrap items-center gap-1.5 sm:gap-2 pt-3">
                <span>DIGITAL MARKETING</span>
                <span className="text-white/40">×</span>
                <span>ANALYTICS</span>
                <span className="text-white/40">×</span>
                <span>UI/UX</span>
                <span className="text-white/40">×</span>
                <span>FRONT-END</span>
              </div>
              <div className="text-[11px] sm:text-xs font-mono text-white/60 uppercase tracking-widest pt-1.5">
                Digital Marketing • Analytics • UI/UX • Web Experiences
              </div>
            </div>
          </div>
        </div>

        {/* Right: Editorial Portrait Card with 100% Scroll-Scrubbed Reveal */}
        <div 
          className="lg:col-span-5 flex justify-center lg:justify-end"
          style={{
            transform: `translateY(${progress * 60}px) scale(${1 + progress * 0.08})`,
            transition: 'transform 0.08s linear',
          }}
        >
          {/* Card Container with Tech Border, Green Glow, and Frame Contact Pulse */}
          <div 
            className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] p-3.5 bg-black/75 backdrop-blur-md rounded-2xl border border-white/20 transition-shadow duration-100 group"
            style={{
              boxShadow: contactFactor > 0.02
                ? `0 0 ${20 + contactFactor * 35}px rgba(204,255,0,${0.15 + contactFactor * 0.40})`
                : '0 0 40px rgba(204,255,0,0.1)',
              transform: contactFactor > 0.05
                ? `translateX(${contactShiftX}px)`
                : 'none',
            }}
          >
            {/* Tech Corner Crosshairs */}
            <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-lime"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-lime"></span>
            <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-lime"></span>
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-lime"></span>

            {/* Frame Contact Laser Streak */}
            {contactFactor > 0.05 && (
              <div 
                className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-lime to-transparent pointer-events-none"
                style={{ opacity: contactFactor * 0.9 }}
              />
            )}

            {/* Card Header */}
            <div className="flex justify-between items-center pb-2.5 mb-2 border-b border-white/10 px-1">
              <span className="px-2 py-0.5 bg-white text-ink text-[9px] font-mono font-extrabold uppercase rounded tracking-wider">
                PORTRAIT
              </span>
              <span className="text-xs font-mono font-bold text-white/70">
                01
              </span>
            </div>

            {/* Candidate Photograph Frame with Scroll-Scrubbed Reveal */}
            <div 
              className="relative overflow-hidden rounded-xl bg-black aspect-[800/836] border border-white/15 select-none"
              style={{
                filter: `brightness(${contactBrightness})`,
              }}
            >
              {/* Deep Background Vignette during initial masking */}
              <div 
                className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/80 via-transparent to-black/90 transition-opacity duration-75"
                style={{ opacity: Math.max(0, 1 - heroP / 0.70) }}
              />

              {/* 1. Base Layer: Masked Portrait Image */}
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  clipPath: `inset(${clipTop}% 0% ${clipBottom}% 0%)`,
                  opacity: revealOpacity,
                  filter: `brightness(${revealBrightness}) contrast(${revealContrast})`,
                }}
              >
                <img
                  src="/images/hero/portrait.jpg"
                  alt="Pandi Veer Viswa"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (!e.target.dataset.triedFallback) {
                      e.target.dataset.triedFallback = 'true';
                      e.target.src = '/images/hero/hero.svg';
                    }
                  }}
                />
              </div>

              {/* 2. Controlled Glitch: Horizontal Slice Displacements (Active ONLY during 0.10 < heroP < 0.85) */}
              {glitchIntensity > 0.01 && (
                <>
                  {/* Slice 1: Eyes / Forehead strip */}
                  <div 
                    className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
                    style={{
                      clipPath: `inset(30% 0% 50% 0%)`,
                      transform: `translateX(${sliceShift1}px)`,
                      opacity: glitchIntensity * 0.85,
                      filter: `brightness(1.1) contrast(1.2)`,
                    }}
                  >
                    <img src="/images/hero/portrait.jpg" alt="" className="w-full h-full object-cover" />
                  </div>

                  {/* Slice 2: Face / Hand strip */}
                  <div 
                    className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
                    style={{
                      clipPath: `inset(48% 0% 36% 0%)`,
                      transform: `translateX(${sliceShift2}px)`,
                      opacity: glitchIntensity * 0.75,
                    }}
                  >
                    <img src="/images/hero/portrait.jpg" alt="" className="w-full h-full object-cover" />
                  </div>

                  {/* Slice 3: ROG Laptop strip */}
                  <div 
                    className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
                    style={{
                      clipPath: `inset(65% 0% 15% 0%)`,
                      transform: `translateX(${sliceShift3}px)`,
                      opacity: glitchIntensity * 0.80,
                    }}
                  >
                    <img src="/images/hero/portrait.jpg" alt="" className="w-full h-full object-cover" />
                  </div>

                  {/* Subtle RGB Channel Shift Layer (Red / Cyan Offset) */}
                  <div 
                    className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
                    style={{
                      clipPath: `inset(${clipTop}% 0% ${clipBottom}% 0%)`,
                      transform: `translateX(${rgbOffset}px)`,
                      opacity: glitchIntensity * 0.45,
                      filter: 'hue-rotate(90deg)',
                    }}
                  >
                    <img src="/images/hero/portrait.jpg" alt="" className="w-full h-full object-cover" />
                  </div>

                  {/* Fine Scanlines */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      opacity: glitchIntensity * 0.35,
                      backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 3px)',
                    }}
                  />
                </>
              )}

              {/* 3. Reveal Boundary Signal Streak (Moves with the bottom reveal edge) */}
              {heroP > 0.02 && heroP < 0.88 && (
                <div 
                  className="absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-lime to-transparent pointer-events-none z-30"
                  style={{
                    top: `${Math.min(99, 100 - clipBottom)}%`,
                    opacity: glitchIntensity * 0.85 + contactFactor * 0.9,
                    boxShadow: '0 0 8px #ccff00',
                  }}
                />
              )}

              {/* Ambient Lighting Rim Overlay (Subtle Lime Screen Blend) */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-lime/10 via-transparent to-black/20 mix-blend-screen z-10" />
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-center pt-2.5 mt-2 border-t border-white/10 px-1 text-[10px] font-mono text-white/75">
              <span className="tracking-wide uppercase">PORTRAIT // PANDI VEER VISWA</span>
              <span className="flex items-center gap-1.5 text-lime font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse"></span>
                <span>VERIFIED</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt Bar & Live Timeline Indicator */}
      <div className="flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-white/50 border-t border-white/10 pt-4">
        {/* Minimal Timeline Scrub Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-20 sm:w-28 h-1 bg-white/15 rounded-full overflow-hidden">
            <div 
              className="h-full bg-lime transition-all duration-150"
              style={{ width: `${Math.min(100, Math.max(0, (progress / 0.20) * 100))}%` }}
            />
          </div>
          <span className="text-[10px] sm:text-xs text-lime font-bold">01 // SEQUENCE</span>
          <span className="hidden sm:inline text-white/40">• SCROLL TO ADVANCE</span>
        </div>

        {/* Functional "BEGIN JOURNEY" Trigger */}
        <button
          onClick={onBeginJourney}
          className="group flex items-center gap-2 text-lime font-bold hover:text-white transition-colors cursor-pointer focus:outline-none"
          aria-label="Begin portfolio scroll journey"
        >
          <span>BEGIN JOURNEY</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
