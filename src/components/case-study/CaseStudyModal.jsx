import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Check } from 'lucide-react';
import { NexusCaseStudy } from './NexusCaseStudy';
import { PulseCaseStudy } from './PulseCaseStudy';

/**
 * CaseStudyModal
 * High-fidelity editorial case-study modal for portfolio projects.
 * Rendered via React Portal directly into document.body to ensure complete independence
 * from background scroll triggers and CSS transform containers.
 * Supports:
 * - Verified Digital Marketing case studies
 * - Flagship Self-Initiated Concept UI/UX case studies (NEXUS & PULSE)
 * Features:
 * - Prominent "<- BACK TO WORK" and "CLOSE" header actions with Earth departure travel
 * - Independent native vertical scrolling with overscroll containment
 * - Translucent backdrop allowing the close-Earth horizon to remain visible
 * - Scroll position preservation on exit
 */
export const CaseStudyModal = ({ project, isOpen, onClose, opacity = 1, isTransitioning = false }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isTransitioning) onClose();
    };

    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }

      return () => {
        document.body.style.overflow = prevOverflow || '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose, isTransitioning]);

  if (!isOpen || !project || typeof document === 'undefined') return null;

  const isNexus = project.id === 'nexus-enterprise-workflow';
  const isPulse = project.id === 'pulse-financial-insights';
  const isUiUx = isNexus || isPulse;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center p-2 sm:p-5 lg:p-8 bg-black/45 backdrop-blur-sm text-white transition-opacity duration-300"
      style={{ opacity }}
      onClick={() => {
        if (!isTransitioning) onClose();
      }}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        className="relative w-full max-w-5xl h-[92vh] max-h-[92dvh] bg-[#0c0d12]/92 backdrop-blur-md border border-white/20 rounded-none shadow-[0_0_90px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden pointer-events-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================= */}
        {/* 1. STICKY TOP HEADER (NEVER SCROLLS OUT OF VIEW)         */}
        {/* ========================================================= */}
        <div className="flex-shrink-0 flex items-center justify-between border-b border-white/10 px-4 sm:px-8 lg:px-10 py-3.5 sm:py-4 bg-[#0c0d12]/98 backdrop-blur-md z-30 gap-3">
          {/* Project Title & Metadata */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="inline-block w-2 h-2 bg-lime shrink-0" />
            <span className="font-mono text-xs tracking-widest text-lime uppercase font-bold shrink-0">
              CASE STUDY // {project.badge || project.category}
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline font-mono text-xs text-white/80 uppercase font-semibold tracking-wider truncate max-w-[360px]">
              {project.title}
            </span>
          </div>

          {/* Close Action */}
          <button
            onClick={onClose}
            disabled={isTransitioning}
            aria-label="Close case study"
            className="group flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-lime bg-white/5 hover:bg-lime hover:text-black font-mono text-xs font-bold tracking-widest uppercase transition-colors disabled:opacity-50 disabled:pointer-events-none shrink-0"
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
          {/* Conditional Case Study Rendering */}
          {isNexus ? (
            <NexusCaseStudy project={project} />
          ) : isPulse ? (
            <PulseCaseStudy project={project} />
          ) : (
            /* Digital Marketing Verified Case Study View */
            <div className="space-y-10">
              {/* Header & Meta */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-lime tracking-widest uppercase font-bold">
                    {project.category}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="font-mono text-xs text-white/50 tracking-wider">
                    {project.technologies.join(' / ')}
                  </span>
                </div>

                <h2 id="case-study-title" className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mt-1">
                  {project.title}
                </h2>

                <p className="text-white/70 text-sm sm:text-base max-w-3xl mt-4 leading-relaxed font-sans">
                  {project.shortDescription}
                </p>
              </div>

              {/* Hybrid Discipline Connection Banner */}
              {project.hybridConnection && (
                <div className="border border-lime/30 bg-lime/[0.05] p-4 sm:p-5 flex items-start gap-3">
                  <div className="p-1.5 bg-lime text-black font-bold text-xs font-mono shrink-0 mt-0.5">
                    HYBRID LINK
                  </div>
                  <div className="text-xs sm:text-sm text-white/90 leading-relaxed font-mono">
                    {project.hybridConnection}
                  </div>
                </div>
              )}

              {/* Architectural Visual Preview */}
              {project.image && (
                <div className="border border-white/15 bg-black/60 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover max-h-[420px]"
                    loading="eager"
                  />
                  <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/80 border border-white/20 font-mono text-[10px] text-lime">
                    VERIFIED PROJECT TELEMETRY
                  </div>
                </div>
              )}

              {/* Tools & Tech Stack */}
              <div className="pb-8 border-b border-white/10">
                <div className="font-mono text-xs text-white/50 tracking-wider uppercase mb-3 font-semibold">
                  TECHNOLOGIES &amp; TOOLKIT EMPLOYED
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-3.5 py-1.5 bg-white/[0.06] text-white border border-white/15 rounded-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Strategic Challenge / Context */}
              <div>
                <div className="font-mono text-xs text-lime tracking-wider uppercase mb-3 font-semibold">
                  01 // STRATEGIC SCOPE &amp; PROBLEM STATEMENT
                </div>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed p-5 sm:p-6 bg-white/[0.02] border border-white/15">
                  {project.challenge}
                </p>
              </div>

              {/* Execution & Implementation Steps */}
              <div>
                <div className="font-mono text-xs text-lime tracking-wider uppercase mb-4 font-semibold">
                  02 // EXECUTION &amp; ARCHITECTURAL IMPLEMENTATION
                </div>
                <div className="space-y-3">
                  {project.execution.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/10 hover:border-lime/30 transition-colors"
                    >
                      <span className="w-6 h-6 border border-lime text-lime font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables Record */}
              <div>
                <div className="font-mono text-xs text-lime tracking-wider uppercase mb-4 font-semibold">
                  03 // DELIVERABLES RECORD
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white/[0.03] border border-white/15 flex items-center gap-3 text-xs sm:text-sm font-mono text-white/90"
                    >
                      <div className="w-5 h-5 bg-lime/10 border border-lime text-lime flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-lime" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Close Bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/50">
            <div>
              PRESS <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/20 text-lime">ESC</kbd> OR CLICK OUTSIDE TO CLOSE
            </div>
            <button
              onClick={onClose}
              disabled={isTransitioning}
              aria-label="Close case study"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-lime hover:text-black border border-white/20 hover:border-lime font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors disabled:opacity-50 disabled:pointer-events-none"
            >
              <span>CLOSE CASE STUDY</span>
              <span className="text-lime group-hover:text-black font-bold">✕</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CaseStudyModal;
