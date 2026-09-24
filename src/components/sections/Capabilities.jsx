import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { CapabilityDetailModal } from './capabilities/CapabilityDetailModal';
import { useNavigationTransition } from '../../context/TransitionContext';

/**
 * Capabilities
 * ONE Cinematic Horizontal Capabilities Gallery
 * 
 * Choreographed Three-Phase Timeline:
 * 1. Entry Phase (progress: 0.21 - 0.26):
 *    - Section fades in cleanly from pure space
 *    - Editorial title settles into place
 *    - Horizontal track is STRICTLY stationary at x = 0
 *    - Card 01 (DIGITAL MARKETING) is active in lime
 *    - Progress rail is strictly 01 / 05
 * 
 * 2. Horizontal Gallery Traversal (progress: 0.26 - 0.65):
 *    - Vertical scroll translates the gallery smoothly from right to left
 *    - Direct 1:1 scroll scrub (no CSS transition lag on transform)
 *    - Dynamic active card switching across 01 -> 02 -> 03 -> 04 -> 05
 *    - Progress rail and scrub line track real-time position
 * 
 * 3. Settle & Exit (progress: 0.65 - 0.70):
 *    - Settled on Card 05 (Professional Strengths)
 *    - Smooth transition into Selected Work
 */
export const Capabilities = ({ opacity = 1, translateY = 0, progress = 0 }) => {
  const {
    isDetailTransitioning,
    activeDetailCard,
    galleryVisible,
    galleryOpacity,
    detailVisible,
    detailOpacity,
    openCapabilityWorld,
    closeCapabilityWorld,
  } = useNavigationTransition();

  // Normalized progress within the capabilities window (0.21 to 0.70)
  const capStart = 0.21;
  const capEnd = 0.70;
  const rawSubP = (progress - capStart) / Math.max(0.001, capEnd - capStart);
  const pCap = Math.min(1.0, Math.max(0.0, rawSubP));

  // Determine sub-phases with mathematical determinism
  // Phase 1: Entry (0.00 to 0.11)
  // Phase 2: Gallery Travel (0.11 to 0.89)
  // Phase 3: Exit (0.89 to 1.00)
  let entryAlpha = 0;
  let entryOffsetY = 0;
  let galleryProgress = 0;
  let activeCardIndex = 0;
  let isInteractive = false;

  if (pCap <= 0.11) {
    // 1. ENTRY PHASE: Section arrives, horizontal movement has NOT started
    entryAlpha = Math.min(1.0, Math.max(0.0, pCap / 0.11));
    entryOffsetY = (1 - entryAlpha) * 25;
    galleryProgress = 0.0; // STRICTLY 0px translation
    activeCardIndex = 0;   // STRICTLY Card 01
    isInteractive = pCap >= 0.04;
  } else if (pCap <= 0.89) {
    // 2. HORIZONTAL GALLERY TRAVEL PHASE
    entryAlpha = 1.0;
    entryOffsetY = 0;
    galleryProgress = Math.min(1.0, Math.max(0.0, (pCap - 0.11) / 0.78));
    activeCardIndex = Math.min(4, Math.max(0, Math.floor(galleryProgress * 4.999)));
    isInteractive = true;
  } else {
    // 3. SETTLE & EXIT PHASE
    const exitP = (pCap - 0.89) / 0.11;
    entryAlpha = Math.max(0.0, 1.0 - exitP);
    entryOffsetY = -exitP * 25;
    galleryProgress = 1.0;
    activeCardIndex = 4;
    isInteractive = true;
  }

  // Open capability detail with cinematic 3D Earth approach
  const handleOpenDetail = (index) => {
    if (!isInteractive || isDetailTransitioning) return;
    openCapabilityWorld(index);
  };

  const handleCloseDetail = () => {
    if (isDetailTransitioning) return;
    closeCapabilityWorld();
  };

  // Visibility guard to prevent any flash of intermediate or preloaded state
  const isSceneActive = progress >= 0.205 && progress <= 0.71;

  // Refs for measuring horizontal track runway
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [maxScrollDistance, setMaxScrollDistance] = useState(0);

  // Measure track scroll runway
  const updateMetrics = useCallback(() => {
    if (trackRef.current && containerRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      const scrollable = Math.max(0, trackWidth - containerWidth + 40);
      setMaxScrollDistance(scrollable);
    }
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    if (document.fonts) {
      document.fonts.ready.then(updateMetrics);
    }
    return () => window.removeEventListener('resize', updateMetrics);
  }, [updateMetrics]);

  // Robust fallback runway if not yet measured by the DOM on first paint
  const effectiveMaxScroll = maxScrollDistance > 0 ? maxScrollDistance : 1700;

  // Current horizontal translation (strictly 0 during entry)
  const currentTranslateX = galleryProgress * effectiveMaxScroll;

  // Jump to specific capability card by triggering smooth scroll to its exact progress waypoint
  const scrollToCard = (targetIndex) => {
    const clamped = Math.max(0, Math.min(4, targetIndex));
    // Map target card index into the gallery travel phase (0.11 to 0.89)
    const targetSubP = 0.11 + (clamped / 4) * 0.78;
    const targetProgress = capStart + targetSubP * (capEnd - capStart);
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: targetProgress * scrollHeight,
      behavior: 'smooth',
    });
  };

  // Drag-to-explore pointer gesture support
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  const handlePointerDown = (e) => {
    if (!isInteractive || isDetailTransitioning || !galleryVisible) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - startXRef.current;
    if (Math.abs(deltaX) > 4) {
      // Translate horizontal drag into vertical scroll delta
      window.scrollBy({
        top: -deltaX * 2.2,
        behavior: 'auto',
      });
      startXRef.current = currentX;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // 5 Canonical Capability Cards Data
  const capabilityCards = useMemo(() => [
    {
      id: 'digital-marketing',
      num: '01',
      title: 'DIGITAL MARKETING',
      subtitleLine1: 'DIGITAL',
      subtitleLine2: 'MARKETING',
      microLabel: 'ATTRACT • ENGAGE • CONVERT',
      shortDesc:
        'Building digital visibility through search, content, campaigns and social channels.',
      skillPreview: [
        'SEO',
        'ON-PAGE & TECHNICAL SEO',
        'KEYWORD RESEARCH',
        'GOOGLE ADS',
        'SOCIAL MEDIA',
        'CONTENT MARKETING',
        'EMAIL MARKETING',
        'META ADS',
        'LEAD GENERATION',
      ],
      tag: '01 // ACQUISITION',
    },
    {
      id: 'marketing-analytics',
      num: '02',
      title: 'MARKETING ANALYTICS',
      subtitleLine1: 'MARKETING',
      subtitleLine2: 'ANALYTICS',
      microLabel: 'MEASURE • UNDERSTAND • OPTIMIZE',
      shortDesc:
        'Turning marketing data into insights through measurement, dashboards and performance analysis.',
      skillPreview: [
        'GOOGLE ANALYTICS 4',
        'GOOGLE SEARCH CONSOLE',
        'LOOKER STUDIO',
        'TRAFFIC ANALYSIS',
        'USER BEHAVIOR',
        'CONVERSIONS',
        'CAMPAIGN PERFORMANCE',
        'KPI REPORTING',
      ],
      tag: '02 // TELEMETRY',
    },
    {
      id: 'uiux-experience',
      num: '03',
      title: 'UI/UX & DIGITAL EXPERIENCE',
      subtitleLine1: 'UI/UX &',
      subtitleLine2: 'DIGITAL EXPERIENCE',
      microLabel: 'DESIGN • ENGAGE • EXPERIENCE',
      shortDesc:
        'Creating clear, responsive and engaging digital experiences through structure, visual hierarchy and interaction.',
      skillPreview: [
        'USER EXPERIENCE',
        'INFORMATION ARCHITECTURE',
        'WIREFRAMING',
        'VISUAL DESIGN',
        'RESPONSIVE DESIGN',
        'INTERACTION DESIGN',
        'USABILITY',
        'DESIGN SYSTEMS',
      ],
      tag: '03 // VISUAL CENTERPIECE',
      isCenterpiece: true,
    },
    {
      id: 'frontend-web',
      num: '04',
      title: 'FRONT-END & WEB TECHNOLOGY',
      subtitleLine1: 'FRONT-END &',
      subtitleLine2: 'WEB TECHNOLOGY',
      microLabel: 'BUILD • DEVELOP • DELIVER',
      shortDesc:
        'Connecting digital design with responsive web experiences and modern front-end technologies.',
      skillPreview: [
        'HTML',
        'CSS',
        'JAVASCRIPT',
        'REACT',
        'VITE',
        'TAILWIND CSS',
        'PYTHON',
        'WORDPRESS',
        'ELEMENTOR',
        'RANK MATH',
        'WPFORMS',
      ],
      tag: '04 // ARCHITECTURE',
    },
    {
      id: 'professional-strengths',
      num: '05',
      title: 'PROFESSIONAL STRENGTHS',
      subtitleLine1: 'PROFESSIONAL',
      subtitleLine2: 'STRENGTHS',
      microLabel: 'THINK • COLLABORATE • GROW',
      shortDesc:
        'Core cognitive and collaborative capabilities that elevate project execution, teamwork, and problem solving.',
      skillPreview: [
        'EFFECTIVE COMMUNICATION',
        'ANALYTICAL THINKING',
        'PROBLEM SOLVING',
        'ATTENTION TO DETAIL',
        'TIME MANAGEMENT',
        'TEAM COLLABORATION',
        'ADAPTABILITY',
        'CREATIVITY',
        'CRITICAL THINKING',
        'CONTINUOUS LEARNING',
      ],
      tag: '05 // HOW I THINK & WORK',
    },
  ], []);

  // Compute final composite opacity
  const finalOpacity = (isSceneActive && galleryVisible) ? opacity * galleryOpacity : 0;

  return (
    <>
      <section
        className="fixed inset-0 flex flex-col justify-between p-4 sm:p-6 lg:p-10 pt-20 sm:pt-22 lg:pt-24 max-w-[1700px] mx-auto w-full select-none"
        style={{
          opacity: finalOpacity,
          transform: `translate3d(0, ${translateY + entryOffsetY}px, 0)`,
          visibility: isSceneActive && galleryVisible && finalOpacity > 0.01 ? 'visible' : 'hidden',
          pointerEvents: isSceneActive && galleryVisible && !isDetailTransitioning && finalOpacity > 0.25 ? 'auto' : 'none',
          display: galleryVisible ? 'flex' : 'none',
        }}
      >
        {/* Main Stage: Left Anchored Header + Horizontal Cards Runway */}
        <div className="flex-1 flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 min-h-0 overflow-hidden">
          {/* ========================================================= */}
          {/* 1. LEFT-ANCHORED EDITORIAL HEADING BLOCK */}
          {/* ========================================================= */}
          <div className="w-full lg:w-[300px] xl:w-[340px] flex-shrink-0 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 lg:pr-6 overflow-hidden">
            <div>
              {/* Category Micro-Label */}
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <span className="w-2 h-2 bg-lime rounded-none" />
                <span className="font-mono text-[10px] sm:text-xs text-lime tracking-widest uppercase font-semibold">
                  [ CAPABILITIES ]
                </span>
              </div>

              {/* Large Editorial Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white leading-[0.94]">
                SKILLS<br />
                THAT<br />
                <span className="text-lime">CONNECT</span>
              </h2>

              {/* Supporting Hybrid Descriptor */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                <p className="font-mono text-xs sm:text-sm tracking-wider text-white/70 leading-relaxed uppercase">
                  MARKETING.<br />
                  DATA.<br />
                  DESIGN.<br />
                  TECHNOLOGY.
                </p>
                <p className="text-white/40 text-[10px] sm:text-[11px] font-mono mt-2 sm:mt-3 leading-normal hidden sm:block">
                  A unified digital ecosystem. Vertical scroll traverses the five capability worlds in real-time.
                </p>
              </div>
            </div>

            {/* Quick Waypoint Pills for Instant Access */}
            <div className="hidden lg:flex flex-col gap-1 pt-3">
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                DIRECT JUMP //
              </span>
              {capabilityCards.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => scrollToCard(idx)}
                  className={`text-left font-mono text-[10px] xl:text-[11px] px-2 py-1 transition-all border ${
                    activeCardIndex === idx
                      ? 'border-lime bg-lime/10 text-lime font-bold'
                      : 'border-transparent text-white/50 hover:text-white hover:border-white/15'
                  }`}
                >
                  <span className="opacity-60 mr-2">{card.num}</span>
                  <span>{card.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. CINEMATIC HORIZONTAL CARDS TRACK */}
          {/* ========================================================= */}
          <div
            ref={containerRef}
            className="flex-1 relative overflow-hidden flex items-center cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div
              ref={trackRef}
              className="flex items-stretch gap-5 sm:gap-7 will-change-transform py-2"
              style={{
                transform: `translate3d(-${currentTranslateX}px, 0, 0)`,
              }}
            >
              {capabilityCards.map((card, index) => {
                const isActive = activeCardIndex === index;

                return (
                  <div
                    key={card.id}
                    className={`relative w-[290px] sm:w-[350px] lg:w-[410px] xl:w-[440px] h-[430px] sm:h-[470px] lg:h-[500px] flex-shrink-0 flex flex-col justify-between p-5 sm:p-7 border ${
                      isActive
                        ? 'bg-lime text-black border-lime shadow-[0_0_50px_rgba(204,255,0,0.22)] scale-100 z-10'
                        : 'bg-[#0c0d12]/90 backdrop-blur-md text-white border-white/15 hover:border-white/30 scale-[0.97] opacity-80 z-0'
                    }`}
                  >
                    {/* Technical Crosshair / Corner Accents */}
                    <div
                      className={`absolute top-2 left-2 font-mono text-[10px] ${
                        isActive ? 'text-black/50' : 'text-lime/60'
                      }`}
                    >
                      +
                    </div>
                    <div
                      className={`absolute top-2 right-2 font-mono text-[10px] ${
                        isActive ? 'text-black/50' : 'text-white/30'
                      }`}
                    >
                      +
                    </div>
                    <div
                      className={`absolute bottom-2 left-2 font-mono text-[10px] ${
                        isActive ? 'text-black/50' : 'text-white/30'
                      }`}
                    >
                      +
                    </div>
                    <div
                      className={`absolute bottom-2 right-2 font-mono text-[10px] ${
                        isActive ? 'text-black/50' : 'text-lime/60'
                      }`}
                    >
                      +
                    </div>

                    {/* Top Micro-Header */}
                    <div>
                      <div className="flex items-center justify-between border-b pb-2.5 mb-3 border-current/15">
                        <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest uppercase">
                          {card.microLabel}
                        </span>
                        <span
                          className={`font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider ${
                            isActive
                              ? 'bg-black text-lime font-bold'
                              : 'bg-white/10 text-white/70'
                          }`}
                        >
                          {card.tag}
                        </span>
                      </div>

                      {/* Large Number + Title */}
                      <div className="flex items-start justify-between gap-3 mt-1">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight leading-[0.95]">
                          {card.subtitleLine1}
                          <br />
                          {card.subtitleLine2}
                        </h3>
                        <span className="font-mono text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter opacity-85 leading-none">
                          {card.num}
                        </span>
                      </div>

                      {/* Short Description */}
                      <p
                        className={`text-xs sm:text-[13px] mt-3 leading-relaxed line-clamp-3 ${
                          isActive ? 'text-black/85 font-medium' : 'text-white/70'
                        }`}
                      >
                        {card.shortDesc}
                      </p>
                    </div>

                    {/* Center: Skill Preview Cloud */}
                    <div className="my-auto py-2.5 border-y border-current/15">
                      <div className="font-mono text-[9px] uppercase tracking-widest opacity-60 mb-1.5">
                        CAPABILITY PREVIEW //
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-h-[90px] sm:max-h-[110px] overflow-hidden">
                        {card.skillPreview.slice(0, 8).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className={`font-mono text-[9px] sm:text-[10px] px-2 py-0.5 tracking-wider uppercase font-semibold ${
                              isActive
                                ? 'bg-black/10 text-black border border-black/20'
                                : 'bg-white/5 text-white/80 border border-white/10'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action: EXPLORE -> Button */}
                    <div className="pt-3 flex items-center justify-between">
                      <button
                        onClick={() => handleOpenDetail(index)}
                        disabled={!isInteractive || isDetailTransitioning}
                        className={`group flex items-center gap-2 px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
                          isActive
                            ? 'bg-black text-lime hover:bg-white hover:text-black shadow-md'
                            : 'bg-white/10 text-white hover:bg-lime hover:text-black border border-white/20'
                        } ${(!isInteractive || isDetailTransitioning) ? 'opacity-40 pointer-events-none' : ''}`}
                      >
                        <span>EXPLORE</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1">
                          →
                        </span>
                      </button>

                      <div className="font-mono text-[9px] opacity-60 uppercase">
                        TAP TO EXPAND
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. BOTTOM CAPABILITY PROGRESS RAIL & CONTROLS */}
        {/* ========================================================= */}
        <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 mt-1">
          {/* Active Number Indicator + Progress Line */}
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="font-mono text-xs sm:text-sm font-bold text-lime tracking-widest">
              0{activeCardIndex + 1} / 05
            </span>

            {/* Moving Scrub Line */}
            <div className="w-28 sm:w-52 lg:w-72 h-[2px] bg-white/15 relative overflow-visible">
              <div
                className="absolute top-0 left-0 h-full bg-lime"
                style={{ width: `${galleryProgress * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-lime rounded-none border border-black shadow-[0_0_10px_#CCFF00]"
                style={{ left: `calc(${galleryProgress * 100}% - 5px)` }}
              />
            </div>

            {/* Current Active Card Name */}
            <span className="font-mono text-xs text-white/70 uppercase hidden sm:inline-block">
              {capabilityCards[activeCardIndex].title}
            </span>
          </div>

          {/* Navigation Controls: Circular Left / Right Arrows + Drag Label */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] sm:text-[11px] text-white/50 uppercase tracking-widest hidden md:inline-block">
              SCROLL ↓ OR DRAG TO EXPLORE
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToCard(activeCardIndex - 1)}
                disabled={activeCardIndex === 0 || !isInteractive || isDetailTransitioning}
                aria-label="Previous capability"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-mono text-xs text-white hover:border-lime hover:bg-lime hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                ←
              </button>

              <button
                onClick={() => scrollToCard(activeCardIndex + 1)}
                disabled={activeCardIndex === 4 || !isInteractive || isDetailTransitioning}
                aria-label="Next capability"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center font-mono text-xs text-white hover:border-lime hover:bg-lime hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Capability World (Close Earth Orbit) */}
      <CapabilityDetailModal
        cardIndex={activeDetailCard}
        isOpen={detailVisible}
        onClose={handleCloseDetail}
        opacity={detailOpacity}
      />
    </>
  );
};

export default Capabilities;
