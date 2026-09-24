import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft } from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';

/**
 * CapabilityDetailModal
 * High-fidelity detailed capability drawer/modal opened via clicking EXPLORE -> on any capability card.
 * Mounted directly to document.body via React Portal to ensure independent, uninhibited native vertical scrolling.
 * Features a sticky top header with CLOSE [ESC] action, overscroll containment, and touch support.
 */
export const CapabilityDetailModal = ({ cardIndex, isOpen, onClose, opacity = 1 }) => {
  const [activeUiUxTab, setActiveUiUxTab] = useState(0);
  const scrollContainerRef = useRef(null);

  // Lock background scroll when open, restore when closed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      // Save current scroll position
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Reset scroll container to top upon opening new card
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }

      return () => {
        document.body.style.overflow = prevOverflow || '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose, cardIndex]);

  if (!isOpen || cardIndex === null || typeof document === 'undefined') return null;

  const pillars = portfolioData.fourPillars;
  const strengths = portfolioData.howIThinkAndWork;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center p-2 sm:p-5 lg:p-8 bg-black/45 backdrop-blur-sm text-white transition-opacity duration-300"
      style={{ opacity }}
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] max-h-[92dvh] bg-[#0c0d12]/92 backdrop-blur-md border border-white/20 rounded-none shadow-[0_0_90px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden pointer-events-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================= */}
        {/* 1. STICKY / FIXED TOP HEADER (NEVER SCROLLS OUT OF VIEW)  */}
        {/* ========================================================= */}
        <div className="flex-shrink-0 flex items-center justify-between border-b border-white/10 px-4 sm:px-8 lg:px-10 py-3.5 sm:py-4 bg-[#0c0d12]/98 backdrop-blur-md z-30 gap-3">
          {/* Primary Navigation Action: <- BACK TO CAPABILITIES */}
          <button
            onClick={onClose}
            aria-label="Back to capabilities gallery"
            className="group flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-lime text-black hover:bg-white border border-lime transition-all font-mono text-xs font-bold uppercase tracking-wider shadow-md"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← BACK TO CAPABILITIES</span>
          </button>

          {/* Capability Metadata Centerpiece */}
          <div className="hidden md:flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 bg-lime rounded-none" />
            <span className="font-mono text-[11px] sm:text-xs tracking-widest text-lime uppercase font-semibold">
              SYS.0{cardIndex + 1} // CAPABILITY ARCHITECTURE
            </span>
          </div>

          {/* Secondary Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="group flex items-center gap-2 px-3.5 py-1.5 border border-white/20 hover:border-lime bg-white/5 hover:bg-lime hover:text-black font-mono text-xs tracking-widest uppercase transition-colors"
          >
            <span>CLOSE</span>
            <span className="text-lime group-hover:text-black font-bold">✕</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* 2. FULLY SCROLLABLE INNER CONTENT CONTAINER              */}
        {/* ========================================================= */}
        <div
          ref={scrollContainerRef}
          className="modal-scroll flex-1 w-full overflow-y-auto overflow-x-hidden p-6 sm:p-10 lg:p-12 overscroll-contain touch-pan-y"
          style={{
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
            overscrollBehavior: 'contain',
          }}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* ------------------------------------------------------------- */}
          {/* CARD 01: DIGITAL MARKETING */}
          {/* ------------------------------------------------------------- */}
          {cardIndex === 0 && (
            <div>
              <div className="mb-8">
                <span className="font-mono text-xs text-lime tracking-widest uppercase font-bold">
                  ATTRACT • ENGAGE • CONVERT
                </span>
                <h2 id="modal-title" className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mt-1">
                  01. DIGITAL MARKETING
                </h2>
                <p className="text-white/70 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
                  Strategic search engine optimization, performance campaigns, multi-channel social workflows, and structured editorial content designed to build organic visibility and convert audience intent into qualified outcomes.
                </p>
              </div>

              {/* Core Pipeline Banner */}
              <div className="border border-white/10 bg-white/[0.02] p-4 mb-8 font-mono text-xs text-white/80 flex flex-wrap items-center justify-between gap-2">
                <span className="text-lime font-bold">EXECUTION PIPELINE:</span>
                <span>SEARCH INTENT → ON-PAGE ARCHITECTURE → CRAWL & INDEX → HIGH-INTENT ENGAGEMENT → CONVERSION</span>
              </div>

              {/* Structured Skill Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-white/10 p-5 bg-black/40 hover:border-lime/40 transition-colors">
                  <span className="font-mono text-xs text-lime">01 // SEO & WEB VISIBILITY</span>
                  <h3 className="text-lg font-bold text-white mt-1">Search Engine Optimization</h3>
                  <p className="text-white/70 text-xs sm:text-sm mt-2 leading-relaxed">
                    Comprehensive organic search strategy, keyword research and mapping, on-page optimization, and XML sitemap architecture to maximize organic search indexing.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {['On-Page SEO', 'Technical SEO', 'Keyword Research', 'Rank Math', 'XML Sitemaps', 'Search Console'].map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-white/10 p-5 bg-black/40 hover:border-lime/40 transition-colors">
                  <span className="font-mono text-xs text-lime">02 // CAMPAIGNS & PAID MEDIA</span>
                  <h3 className="text-lg font-bold text-white mt-1">Targeted Campaign Execution</h3>
                  <p className="text-white/70 text-xs sm:text-sm mt-2 leading-relaxed">
                    Supporting targeted search intent campaigns with Google Ads and paid acquisition via Meta Ads to drive immediate reach and captured demand.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {['Google Ads Support', 'Meta Ads Assistance', 'Search Intent Alignment', 'Campaign Scheduling'].map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-white/10 p-5 bg-black/40 hover:border-lime/40 transition-colors">
                  <span className="font-mono text-xs text-lime">03 // SOCIAL & CONTENT STRATEGY</span>
                  <h3 className="text-lg font-bold text-white mt-1">Content & Social Media (SMM)</h3>
                  <p className="text-white/70 text-xs sm:text-sm mt-2 leading-relaxed">
                    Structured editorial publishing, Meta Business Suite scheduling, audience engagement workflows, and Canva asset creation to maintain consistent brand touchpoints.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {['Meta Business Suite', 'Content Marketing', 'Canva Content Creation', 'Brand Publishing'].map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border border-white/10 p-5 bg-black/40 hover:border-lime/40 transition-colors">
                  <span className="font-mono text-xs text-lime">04 // EMAIL & LEAD ACQUISITION</span>
                  <h3 className="text-lg font-bold text-white mt-1">Lead Generation & Funnels</h3>
                  <p className="text-white/70 text-xs sm:text-sm mt-2 leading-relaxed">
                    Friction-free inquiry forms, verified email outreach, and lead pipeline monitoring to turn anonymous visitors into measurable business contacts.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {['Lead Generation', 'Email Marketing', 'WPForms Lead Capture', 'Conversion Alignment'].map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 text-white/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* CARD 02: MARKETING ANALYTICS */}
          {/* ------------------------------------------------------------- */}
          {cardIndex === 1 && (
            <div>
              <div className="mb-8">
                <span className="font-mono text-xs text-lime tracking-widest uppercase font-bold">
                  MEASURE • UNDERSTAND • OPTIMIZE
                </span>
                <h2 id="modal-title" className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mt-1">
                  02. MARKETING ANALYTICS
                </h2>
                <p className="text-white/70 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
                  Transforming raw web telemetry and search data into strategic behavioral clarity. Tracking user journeys across Google Analytics 4, Search Console, and Looker Studio BI dashboards.
                </p>
              </div>

              {/* Core Analytics Pipeline */}
              <div className="border border-white/10 bg-white/[0.02] p-4 mb-8 font-mono text-xs text-white/80 flex flex-wrap items-center justify-between gap-2">
                <span className="text-lime font-bold">DATA CYCLE:</span>
                <span>EVENT TELEMETRY → ATTRIBUTION AUDIT → BEHAVIOR ANALYSIS → LOOKER DASHBOARD → ITERATIVE OPTIMIZATION</span>
              </div>

              {/* Detailed Analytics Domains */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border border-white/10 p-5 bg-black/40 hover:border-lime/40 transition-colors">
                  <span className="font-mono text-xs text-lime">01 // TELEMETRY</span>
                  <h3 className="text-base font-bold text-white mt-1">Google Analytics 4 (GA4)</h3>
                  <p className="text-white/70 text-xs mt-2 leading-relaxed">
                    Event-based data models, custom event tracking, session duration measurement, and engaged user behavior pipelines.
                  </p>
                </div>

                <div className="border border-white/10 p-5 bg-black/40 hover:border-lime/40 transition-colors">
                  <span className="font-mono text-xs text-lime">02 // SEARCH INTEL</span>
                  <h3 className="text-base font-bold text-white mt-1">Google Search Console</h3>
                  <p className="text-white/70 text-xs mt-2 leading-relaxed">
                    Query impressions, organic CTR, URL indexation health, crawl coverage diagnosis, and mobile performance audit.
                  </p>
                </div>

                <div className="border border-white/10 p-5 bg-black/40 hover:border-lime/40 transition-colors">
                  <span className="font-mono text-xs text-lime">03 // BI VISUALIZATION</span>
                  <h3 className="text-base font-bold text-white mt-1">Looker Studio Dashboards</h3>
                  <p className="text-white/70 text-xs mt-2 leading-relaxed">
                    Synthesizing complex multi-source GA4 and GSC datasets into actionable visual KPI reports for stakeholder clarity.
                  </p>
                </div>

                <div className="border border-white/10 p-5 bg-black/40 hover:border-lime/40 transition-colors">
                  <span className="font-mono text-xs text-lime">04 // ATTRIBUTION</span>
                  <h3 className="text-base font-bold text-white mt-1">Traffic Source Analysis</h3>
                  <p className="text-white/70 text-xs mt-2 leading-relaxed">
                    Segmenting inbound visitor streams across Organic Search, Direct, Referral, Social, and Paid to uncover true acquisition value.
                  </p>
                </div>

                <div className="border border-white/10 p-5 bg-black/40 hover:border-lime/40 transition-colors">
                  <span className="font-mono text-xs text-lime">05 // USER FLOW</span>
                  <h3 className="text-base font-bold text-white mt-1">Behavior & Conversion Tracking</h3>
                  <p className="text-white/70 text-xs mt-2 leading-relaxed">
                    Deciphering drop-off pages, scroll engagement depth, key interaction checkpoints, and lead inquiry conversions.
                  </p>
                </div>

                <div className="border border-white/10 p-5 bg-black/40 hover:border-lime/40 transition-colors">
                  <span className="font-mono text-xs text-lime">06 // ACTION</span>
                  <h3 className="text-base font-bold text-white mt-1">Data-Driven Optimization</h3>
                  <p className="text-white/70 text-xs mt-2 leading-relaxed">
                    Closing the loop by translating telemetry insights into actionable SEO, content, and interface improvements.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* CARD 03: UI/UX & DIGITAL EXPERIENCE (9 CONCEPTS) */}
          {/* ------------------------------------------------------------- */}
          {cardIndex === 2 && (
            <div>
              <div className="mb-6">
                <span className="font-mono text-xs text-lime tracking-widest uppercase font-bold">
                  DESIGN • ENGAGE • EXPERIENCE
                </span>
                <h2 id="modal-title" className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mt-1">
                  03. UI/UX & DIGITAL EXPERIENCE
                </h2>
                <p className="text-white/70 text-sm sm:text-base max-w-3xl mt-2 leading-relaxed">
                  Creating clear, responsive, and engaging digital experiences where visual hierarchy, usability, content structure, interaction design, and modern technology operate as one unified discipline.
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-mono text-white/50">
                  <span className="text-lime font-bold">DISCIPLINE GROUNDING:</span>
                  <span>Exhibited through live portfolio interface craft, responsive systems, and technical web architecture.</span>
                </div>
              </div>

              {/* 9 Concepts Interactive Tab Rail */}
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5 mb-6 border-b border-white/10 pb-4">
                {pillars[2].scenes.map((scene, idx) => (
                  <button
                    key={scene.num}
                    onClick={() => setActiveUiUxTab(idx)}
                    className={`p-2 text-left font-mono text-xs transition-all border ${
                      activeUiUxTab === idx
                        ? 'border-lime bg-lime text-black font-bold'
                        : 'border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <div className="text-[10px] opacity-70">SCENE {scene.num}</div>
                    <div className="truncate font-semibold text-[11px]">{scene.title.split(' ')[0]}</div>
                  </button>
                ))}
              </div>

              {/* Active Concept In-Depth Presentation */}
              {(() => {
                const cur = pillars[2].scenes[activeUiUxTab];
                return (
                  <div className="border border-white/15 bg-black/60 p-6 sm:p-8 relative mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                      <div>
                        <span className="font-mono text-xs text-lime tracking-widest">
                          CONCEPT {cur.num} OF 09
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mt-0.5">
                          {cur.title}
                        </h3>
                        <p className="text-white/60 text-sm mt-1">{cur.subtitle}</p>
                      </div>

                      <div className="border border-lime/30 bg-lime/10 px-4 py-2 font-mono text-xs text-lime">
                        FLOW: {cur.flow}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {cur.principles.map((pr, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-3 p-3 bg-white/[0.03] border border-white/5">
                          <span className="font-mono text-xs text-lime font-bold">0{pIdx + 1}.</span>
                          <span className="text-sm text-white/80 font-medium">{pr}</span>
                        </div>
                      ))}
                    </div>

                    {/* Visual Proof / Demonstration Box */}
                    <div className="p-4 bg-white/[0.02] border border-white/10 font-mono text-xs text-white/70">
                      <span className="text-white font-bold">DESIGN MANIFESTO: </span>
                      <span>
                        {activeUiUxTab === 0 && 'Every interface decision is grounded in minimizing cognitive fatigue and friction for the visitor.'}
                        {activeUiUxTab === 1 && 'Structural content taxonomies allow search engines to crawl efficiently and users to find answers immediately.'}
                        {activeUiUxTab === 2 && 'Intentional grid blueprints form the bedrock before color and typographic polish are introduced.'}
                        {activeUiUxTab === 3 && 'Oversized typographic scale establishes instant focal clarity across editorial viewports.'}
                        {activeUiUxTab === 4 && 'Fluid layout reflow ensures unbroken readability from 375px mobile screens up to 1600px desktop displays.'}
                        {activeUiUxTab === 5 && 'Tactile hover and focus states provide intuitive feedback without visual clutter.'}
                        {activeUiUxTab === 6 && 'High-contrast typography (WCAG compliant) guarantees effortless readability and accessibility.'}
                        {activeUiUxTab === 7 && 'A coherent token system (Obsidian, Acid-Lime, Off-White) guarantees visual scalability across every screen.'}
                        {activeUiUxTab === 8 && 'Marketing, design, data, and code converge into one complete brand journey.'}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Full Index of All 9 UI/UX Principles Reachable by Scrolling */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <span className="font-mono text-xs text-lime tracking-widest uppercase font-bold block mb-4">
                  COMPLETE 9-PRINCIPLE ARCHITECTURE //
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {pillars[2].scenes.map((sc, idx) => (
                    <div
                      key={sc.num}
                      onClick={() => setActiveUiUxTab(idx)}
                      className={`p-4 border cursor-pointer transition-all ${
                        activeUiUxTab === idx
                          ? 'border-lime bg-lime/10 text-white'
                          : 'border-white/10 bg-black/30 hover:border-white/30 text-white/70'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs text-lime font-bold">{sc.num}</span>
                        <span className="font-mono text-[10px] text-white/40">SCENE</span>
                      </div>
                      <h4 className="text-sm font-bold text-white uppercase">{sc.title}</h4>
                      <p className="text-xs text-white/50 mt-1">{sc.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* CARD 04: FRONT-END & WEB TECHNOLOGY */}
          {/* ------------------------------------------------------------- */}
          {cardIndex === 3 && (
            <div>
              <div className="mb-8">
                <span className="font-mono text-xs text-lime tracking-widest uppercase font-bold">
                  BUILD • DEVELOP • DELIVER
                </span>
                <h2 id="modal-title" className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mt-1">
                  04. FRONT-END & WEB TECHNOLOGY
                </h2>
                <p className="text-white/70 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
                  Connecting digital design with responsive web experiences and modern front-end technologies. Grounded in practical web development, content management systems, and performant web architecture.
                </p>
              </div>

              {/* Progression Flow */}
              <div className="border border-white/10 bg-white/[0.02] p-4 mb-8 font-mono text-xs text-white/80 flex flex-wrap items-center justify-between gap-2">
                <span className="text-lime font-bold">TECHNICAL DISCIPLINE:</span>
                <span>DESIGN → STRUCTURE → CODE → INTERACTION → PRODUCTION DELIVERY</span>
              </div>

              {/* Toolkit Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pillars[3].tools.map((tool) => (
                  <div key={tool.name} className="border border-white/10 p-5 bg-black/40 hover:border-lime/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-lime font-bold">{tool.layer}</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 text-white/60">
                        {tool.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2">{tool.name}</h3>
                    <p className="text-white/60 text-xs mt-1">
                      {tool.name === 'JavaScript' && 'Core programming language for responsive interactions and DOM logic.'}
                      {tool.name === 'React' && 'Component-driven interface architecture and state orchestration.'}
                      {tool.name === 'Vite' && 'Fast next-generation build tooling and optimized bundle compilation.'}
                      {tool.name === 'Tailwind CSS' && 'Utility-first styling engine powering responsive typographic and grid systems.'}
                      {tool.name === 'HTML5' && 'Semantic DOM markup ensuring crawlability and assistive accessibility.'}
                      {tool.name === 'CSS3' && 'Modern layouts, flexbox, CSS grid, and GPU-accelerated transforms.'}
                      {tool.name === 'WordPress' && 'Enterprise CMS architecture, content schemas, and theme customization.'}
                      {tool.name === 'Elementor' && 'Visual page structure, section choreography, and layout scaling.'}
                      {tool.name === 'Rank Math' && 'SEO meta configuration, XML sitemaps, and rich snippet schemas.'}
                      {tool.name === 'WPForms' && 'Inquiry forms, anti-spam protocols, and conversion pipelines.'}
                      {tool.name === 'Python' && 'Computational logic, data foundations, and algorithmic problem solving.'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* CARD 05: PROFESSIONAL STRENGTHS */}
          {/* ------------------------------------------------------------- */}
          {cardIndex === 4 && (
            <div>
              <div className="mb-8">
                <span className="font-mono text-xs text-lime tracking-widest uppercase font-bold">
                  THINK • COLLABORATE • GROW
                </span>
                <h2 id="modal-title" className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mt-1">
                  05. PROFESSIONAL STRENGTHS
                </h2>
                <p className="text-white/70 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
                  Verified core cognitive disciplines, communication principles, and work ethics drawn directly from academic and professional performance.
                </p>
              </div>

              {/* Strengths Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {strengths.map((st) => (
                  <div key={st.num} className="border border-white/10 p-5 bg-black/40 hover:border-lime/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-lime font-bold">{st.num} // CORE STRENGTH</span>
                      <span className="w-2 h-2 bg-lime/40 rounded-full" />
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1.5 uppercase">{st.name}</h3>
                    <p className="text-white/70 text-xs sm:text-sm mt-2 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Drawer Navigation Bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/50">
            <div>
              PRESS <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-lime">ESC</kbd> OR CLICK OUTSIDE TO RETURN TO THE HORIZONTAL GALLERY
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-lime text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              RETURN TO GALLERY →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CapabilityDetailModal;
