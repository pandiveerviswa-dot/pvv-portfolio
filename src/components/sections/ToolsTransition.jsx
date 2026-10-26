import React, { useState, useEffect } from 'react';
import { UPPER_ZONE_DATA, LOWER_ZONE_DATA } from './tools/toolData';

/**
 * ToolsTransition
 * Cinematic, Scroll-Synchronized Tools I Use experience between Page 3 (Capabilities) and Page 4 (Selected Work)
 * 
 * Staging Choreography (mapped monotonically to scroll progress):
 * 1. Page 3 begins transitioning gradually (progress 0.58 -> 0.61)
 * 2. Design & prototyping icons enter the upper zone (pTools: 0.04 -> 0.28)
 * 3. Development icons appear in the upper zone (pTools: 0.14 -> 0.38)
 * 4. Analytics & marketing icons enter the lower zone (pTools: 0.24 -> 0.48)
 * 5. AI-assisted icons emerge in the lower zone (pTools: 0.34 -> 0.58)
 * 6. Peak Recognition & Inspection Zone (pTools: 0.58 -> 0.88)
 *    - All 17 tools stabilized, fully sharp, high-contrast, interactive
 * 7. Exit into Page 4 / Selected Work (pTools: 0.88 -> 1.00)
 */

function clamp(val, min = 0, max = 1) {
  return Math.max(min, Math.min(max, val));
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

export const ToolsTransition = ({ progress = 0, isTransitioning = false }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isBelowLg, setIsBelowLg] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    const lgQuery = window.matchMedia('(max-width: 1023px)');
    setIsBelowLg(lgQuery.matches);
    const lgHandler = (e) => setIsBelowLg(e.matches);
    lgQuery.addEventListener('change', lgHandler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
      lgQuery.removeEventListener('change', lgHandler);
    };
  }, []);

  // Transition bounds between Page 3 (ends 0.60) and Page 4 (starts 0.72)
  const START = 0.58;
  const END = 0.74;

  const isSceneActive = progress >= START && progress <= END;

  // Normalized scroll progression across the dedicated tools transition runway (0.00 to 1.00)
  const rawP = (progress - START) / (END - START);
  const pTools = clamp(rawP, 0, 1);

  // Overall Section Opacity & Global Settle
  const stageFadeIn = clamp(pTools / 0.10, 0, 1);
  const stageFadeOut = pTools > 0.88 ? clamp((1.0 - pTools) / 0.12, 0, 1) : 1;
  const sectionOpacity = stageFadeIn * stageFadeOut;

  // -----------------------------------------------------------------
  // STAGE 2: Design & Prototyping (Upper Zone Left)
  // -----------------------------------------------------------------
  const tDesignRaw = clamp((pTools - 0.04) / 0.24, 0, 1);
  const tDesign = easeOutCubic(tDesignRaw);
  const designOpacity = tDesign * stageFadeOut;
  const designX = prefersReducedMotion ? 0 : (1 - tDesign) * -75 + (pTools > 0.88 ? (pTools - 0.88) / 0.12 * -35 : 0);
  const designY = prefersReducedMotion ? 0 : (1 - tDesign) * -12;

  // -----------------------------------------------------------------
  // STAGE 3: Development (Upper Zone Right)
  // -----------------------------------------------------------------
  const tDevRaw = clamp((pTools - 0.14) / 0.24, 0, 1);
  const tDev = easeOutCubic(tDevRaw);
  const devOpacity = tDev * stageFadeOut;
  const devX = prefersReducedMotion ? 0 : (1 - tDev) * 75 + (pTools > 0.88 ? (pTools - 0.88) / 0.12 * -35 : 0);
  const devY = prefersReducedMotion ? 0 : (1 - tDev) * -8;

  // -----------------------------------------------------------------
  // STAGE 4: Analytics & Marketing (Lower Zone Left)
  // -----------------------------------------------------------------
  const tAnalyticsRaw = clamp((pTools - 0.24) / 0.24, 0, 1);
  const tAnalytics = easeOutCubic(tAnalyticsRaw);
  const analyticsOpacity = tAnalytics * stageFadeOut;
  const analyticsX = prefersReducedMotion ? 0 : (1 - tAnalytics) * -75 + (pTools > 0.88 ? (pTools - 0.88) / 0.12 * 35 : 0);
  const analyticsY = prefersReducedMotion ? 0 : (1 - tAnalytics) * 12;

  // -----------------------------------------------------------------
  // STAGE 5: AI-Assisted Workflow (Lower Zone Right)
  // -----------------------------------------------------------------
  const tAiRaw = clamp((pTools - 0.34) / 0.24, 0, 1);
  const tAi = easeOutCubic(tAiRaw);
  const aiOpacity = tAi * stageFadeOut;
  const aiX = prefersReducedMotion ? 0 : (1 - tAi) * 75 + (pTools > 0.88 ? (pTools - 0.88) / 0.12 * 35 : 0);
  const aiY = prefersReducedMotion ? 0 : (1 - tAi) * 16;
  const aiScale = prefersReducedMotion ? 1 : 0.90 + 0.10 * tAi;

  // If outside active bounds, do not render into DOM
  if (!isSceneActive || isTransitioning) return null;

  return (
    <section
      aria-label="Tools and Technologies Transition"
      className="fixed inset-0 z-20 flex flex-col justify-start lg:justify-center overflow-y-auto lg:overflow-hidden pt-[76px] sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-8 lg:px-16 pointer-events-none"
      style={{
        opacity: sectionOpacity,
        // Below lg the section can overflow short screens, so let touch scroll it once it is fully in view
        ...(sectionOpacity > 0.5 && isBelowLg && { pointerEvents: 'auto' }),
      }}
    >
      {/* Cinematic Content Wrapper with responsive max width */}
      <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-7 my-auto">
        
        {/* Editorial Section Header */}
        <header className="space-y-1.5 sm:space-y-2 border-b border-white/10 pb-3 sm:pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-xs text-white/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-lime font-bold tracking-widest uppercase">
                TRANSITION 03 → 04 // APPLIED TOOLKIT
              </span>
            </div>
            <span className="hidden sm:inline-block tracking-wider uppercase text-white/40 font-mono text-[11px]">
              VERIFIED TECHNICAL INSTRUMENTS &amp; WORKFLOWS
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 sm:gap-2">
            <div>
              <h2 className="editorial-headline text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                Tools I Use<span className="text-lime">.</span>
              </h2>
              <p className="font-mono text-[13px] max-sm:leading-snug sm:text-sm text-white/70 max-w-2xl pt-0.5 sm:pt-1">
                From user experience architecture and modern front-end code to behavioral analytics pipelines and AI-assisted workflows.
              </p>
            </div>

            {/* Subtle progress indicator */}
            <div className="font-mono text-[10px] text-white/50 sm:text-right pt-1 sm:pt-0">
              <span className="text-lime font-bold">17 TOOLS</span>
              <span className="mx-2 text-white/30">•</span>
              <span>2 OPERATIONAL ZONES</span>
            </div>
          </div>
        </header>

        {/* ============================================================= */}
        {/* ZONE 01: UPPER ZONE — DESIGN, PROTOTYPING & DEVELOPMENT       */}
        {/* ============================================================= */}
        <div
          className="space-y-2.5 sm:space-y-3.5 p-3.5 sm:p-5 rounded-2xl bg-[#0c0e15]/80 border border-white/10 backdrop-blur-md shadow-2xl transition-all"
        >
          {/* Upper Zone Tag */}
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 font-bold tracking-wider text-white/90">
              <span className="px-1.5 py-0.5 rounded bg-lime/10 border border-lime/30 text-lime text-[10px]">
                {UPPER_ZONE_DATA.zoneNum}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider">{UPPER_ZONE_DATA.zoneTitle}</span>
            </div>
            <span className="text-[10px] font-mono text-white/40 hidden sm:inline">
              9 PRODUCTION TOOLS
            </span>
          </div>

          {/* Groupings Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-3.5">
            {/* Design & Prototyping (3 tools) */}
            <div
              className="lg:col-span-4 space-y-1.5 sm:space-y-2"
              style={{
                opacity: designOpacity,
                transform: `translate3d(${designX}px, ${designY}px, 0)`,
                transition: 'opacity 0.1s linear, transform 0.1s linear',
              }}
            >
              <div className="flex items-center gap-2 font-mono text-[10px] text-white/50 uppercase tracking-widest pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                <span>DESIGN &amp; PROTOTYPING</span>
              </div>

              <div className="grid grid-cols-3 lg:grid-cols-1 gap-1.5 sm:gap-2 pointer-events-auto">
                {UPPER_ZONE_DATA.design.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div
                      key={tool.id}
                      tabIndex={0}
                      role="article"
                      aria-label={`${tool.name}: ${tool.category}`}
                      className="group relative flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 p-2 sm:p-2.5 lg:p-3 rounded-xl bg-[#12151f]/90 border border-white/10 hover:border-lime/60 focus:border-lime focus:outline-none transition-all duration-200 hover:scale-[1.02] hover:bg-[#161a27] cursor-default shadow-md"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-lime/40 transition-colors">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>
                      <div className="min-w-0 w-full sm:w-auto sm:flex-1 text-center sm:text-left">
                        <div className="font-mono text-[10.5px] sm:text-xs lg:text-sm font-bold text-white group-hover:text-lime transition-colors leading-tight">
                          <span className="hidden sm:inline">{tool.name}</span>
                          <span className="sm:hidden">{tool.shortName || tool.name}</span>
                        </div>
                        <div className="font-mono text-[9px] sm:text-[10px] text-white/50 truncate hidden sm:block">
                          {tool.category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Development (6 tools) */}
            <div
              className="lg:col-span-8 space-y-1.5 sm:space-y-2"
              style={{
                opacity: devOpacity,
                transform: `translate3d(${devX}px, ${devY}px, 0)`,
                transition: 'opacity 0.1s linear, transform 0.1s linear',
              }}
            >
              <div className="flex items-center gap-2 font-mono text-[10px] text-white/50 uppercase tracking-widest pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                <span>FRONT-END ENGINEERING &amp; WEB STACK</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pointer-events-auto">
                {UPPER_ZONE_DATA.development.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div
                      key={tool.id}
                      tabIndex={0}
                      role="article"
                      aria-label={`${tool.name}: ${tool.category}`}
                      className="group relative flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 p-2 sm:p-2.5 lg:p-3 rounded-xl bg-[#12151f]/90 border border-white/10 hover:border-lime/60 focus:border-lime focus:outline-none transition-all duration-200 hover:scale-[1.02] hover:bg-[#161a27] cursor-default shadow-md"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-lime/40 transition-colors">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>
                      <div className="min-w-0 w-full sm:w-auto sm:flex-1 text-center sm:text-left">
                        <div className="font-mono text-[10.5px] sm:text-xs lg:text-sm font-bold text-white group-hover:text-lime transition-colors leading-tight">
                          <span className="hidden sm:inline">{tool.name}</span>
                          <span className="sm:hidden">{tool.shortName || tool.name}</span>
                        </div>
                        <div className="font-mono text-[9px] sm:text-[10px] text-white/50 truncate hidden sm:block">
                          {tool.category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* ZONE 02: LOWER ZONE — ANALYTICS, MARKETING & AI WORKFLOW      */}
        {/* ============================================================= */}
        <div
          className="space-y-2.5 sm:space-y-3.5 p-3.5 sm:p-5 rounded-2xl bg-[#0c0e15]/80 border border-white/10 backdrop-blur-md shadow-2xl transition-all"
        >
          {/* Lower Zone Tag */}
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2 font-bold tracking-wider text-white/90">
              <span className="px-1.5 py-0.5 rounded bg-lime/10 border border-lime/30 text-lime text-[10px]">
                {LOWER_ZONE_DATA.zoneNum}
              </span>
              <span className="text-[11px] sm:text-xs uppercase tracking-wider">{LOWER_ZONE_DATA.zoneTitle}</span>
            </div>
            <span className="text-[10px] font-mono text-white/40 hidden sm:inline">
              8 TELEMETRY &amp; INTELLIGENCE ENGINES
            </span>
          </div>

          {/* Groupings Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-3.5">
            {/* Analytics & Marketing (6 tools) */}
            <div
              className="lg:col-span-8 space-y-1.5 sm:space-y-2"
              style={{
                opacity: analyticsOpacity,
                transform: `translate3d(${analyticsX}px, ${analyticsY}px, 0)`,
                transition: 'opacity 0.1s linear, transform 0.1s linear',
              }}
            >
              <div className="flex items-center gap-2 font-mono text-[10px] text-white/50 uppercase tracking-widest pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                <span>ANALYTICS, TELEMETRY &amp; CMS INFRASTRUCTURE</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pointer-events-auto">
                {LOWER_ZONE_DATA.analyticsAndMarketing.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div
                      key={tool.id}
                      tabIndex={0}
                      role="article"
                      aria-label={`${tool.name}: ${tool.category}`}
                      className="group relative flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 p-2 sm:p-2.5 lg:p-3 rounded-xl bg-[#12151f]/90 border border-white/10 hover:border-lime/60 focus:border-lime focus:outline-none transition-all duration-200 hover:scale-[1.02] hover:bg-[#161a27] cursor-default shadow-md"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-lime/40 transition-colors">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>
                      <div className="min-w-0 w-full sm:w-auto sm:flex-1 text-center sm:text-left">
                        <div className="font-mono text-[10.5px] sm:text-xs lg:text-sm font-bold text-white group-hover:text-lime transition-colors leading-tight">
                          <span className="hidden sm:inline">{tool.name}</span>
                          <span className="sm:hidden">{tool.shortName || tool.name}</span>
                        </div>
                        <div className="font-mono text-[9px] sm:text-[10px] text-white/50 truncate hidden sm:block">
                          {tool.category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI-Assisted Workflow (2 tools) */}
            <div
              className="lg:col-span-4 space-y-1.5 sm:space-y-2"
              style={{
                opacity: aiOpacity,
                transform: `translate3d(${aiX}px, ${aiY}px, 0) scale(${aiScale})`,
                transition: 'opacity 0.1s linear, transform 0.1s linear',
              }}
            >
              <div className="flex items-center gap-2 font-mono text-[10px] text-white/50 uppercase tracking-widest pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80" />
                <span>AI-ASSISTED WORKFLOW</span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 sm:gap-2 pointer-events-auto">
                {LOWER_ZONE_DATA.aiWorkflow.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div
                      key={tool.id}
                      tabIndex={0}
                      role="article"
                      aria-label={`${tool.name}: ${tool.category}`}
                      className="group relative flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 p-2 sm:p-2.5 lg:p-3 rounded-xl bg-[#12151f]/90 border border-white/10 hover:border-lime/60 focus:border-lime focus:outline-none transition-all duration-200 hover:scale-[1.02] hover:bg-[#161a27] cursor-default shadow-md"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-lime/40 transition-colors">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>
                      <div className="min-w-0 w-full sm:w-auto sm:flex-1 text-center sm:text-left">
                        <div className="font-mono text-[10.5px] sm:text-xs lg:text-sm font-bold text-white group-hover:text-lime transition-colors leading-tight">
                          <span className="hidden sm:inline">{tool.name}</span>
                          <span className="sm:hidden">{tool.shortName || tool.name}</span>
                        </div>
                        <div className="font-mono text-[9px] sm:text-[10px] text-white/50 truncate hidden sm:block">
                          {tool.category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom subtle indicator */}
        <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-0.5">
          <span className="flex items-center gap-1.5">
            <span className="text-lime font-bold">SCROLL SYNCHRONIZED</span>
            <span>— PROCEEDING TO WORLD 01 &amp; WORLD 02 ARCHIVE</span>
          </span>
          <span className="text-white/30 hidden sm:inline">↓ CONTINUE SCROLLING</span>
        </div>
      </div>
    </section>
  );
};

export default ToolsTransition;
