import React, { useState } from 'react';
import { portfolioData } from '../../../data/portfolioData';

/**
 * Pillar 03: UI/UX & DIGITAL EXPERIENCE (The Visual Centerpiece)
 * Contains the 9 interactive spatial scenes:
 * 01 UX • 02 IA • 03 WIREFRAME • 04 VISUAL • 05 RESPONSIVE • 06 INTERACTION • 07 USABILITY • 08 SYSTEM • 09 EXPERIENCE
 */
export const Pillar03UiUxExperience = ({ activeSubIndex = 0, onSubChange }) => {
  const data = portfolioData.fourPillars[2];
  const [selectedScene, setSelectedScene] = useState(activeSubIndex);

  // Sync with prop if driven externally by scroll
  const currentSceneIdx = typeof activeSubIndex === 'number' && activeSubIndex >= 0 ? activeSubIndex : selectedScene;
  const currentScene = data.scenes[currentSceneIdx] || data.scenes[0];

  const handleSelect = (idx) => {
    setSelectedScene(idx);
    if (onSubChange) onSubChange(idx);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in w-full">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-5 h-[1.5px] bg-ink"></span>
          <span className="meta-tag text-ink font-bold">[ PILLAR 03 // DIGITAL EXPERIENCE CENTERPIECE ]</span>
        </div>

        <h2 className="editorial-headline text-4xl sm:text-6xl lg:text-[5.75rem] font-extrabold uppercase tracking-tight leading-[0.9] text-ink">
          UI/UX & Digital <br />
          <span className="bg-lime text-ink px-3 sm:px-4 py-0.5 inline-block mt-1">
            Experience.
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-ink/75 font-mono max-w-2xl leading-relaxed">
          "{data.summary}"
        </p>

        <div className="text-[10px] font-mono text-ink/50 uppercase tracking-widest">
          {data.disclaimer}
        </div>
      </div>

      {/* 9-Scene Interactive Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 border-b border-ink/10 pb-3 font-mono text-[10px] sm:text-xs">
        {data.scenes.map((scene, idx) => (
          <button
            key={scene.num}
            onClick={() => handleSelect(idx)}
            className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              currentSceneIdx === idx
                ? 'bg-ink text-lime font-bold shadow-md'
                : 'bg-white text-ink/60 border border-ink/10 hover:border-ink hover:text-ink'
            }`}
          >
            <span>{scene.num}</span>
            <span className="tracking-wide uppercase">{scene.title}</span>
          </button>
        ))}
      </div>

      {/* Live Demonstrator Card for Active Scene */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-ink/15 shadow-sm space-y-6">
        {/* Scene Header */}
        <div className="flex flex-wrap justify-between items-baseline gap-2 border-b border-ink/10 pb-4">
          <div>
            <span className="meta-tag text-ink/40 font-mono text-xs">{currentScene.num} // DISCIPLINE</span>
            <h3 className="editorial-headline text-2xl sm:text-3xl font-extrabold text-ink tracking-tight uppercase">
              {currentScene.title}
            </h3>
            <span className="text-xs font-mono text-ink/60">{currentScene.subtitle}</span>
          </div>
          <div className="px-3 py-1 bg-lime/20 border border-lime text-ink font-mono text-xs font-bold rounded-full">
            {currentScene.flow}
          </div>
        </div>

        {/* Live Visual Demonstration Stage */}
        <div className="p-5 sm:p-6 bg-[#F5F5F1] rounded-xl border border-ink/10">
          {/* 01: USER EXPERIENCE DEMO */}
          {currentSceneIdx === 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center font-mono text-xs">
                {["01. USER INTENT", "02. FRICTION SCAN", "03. CONTENT ROUTING", "04. INTERACTION", "05. OUTCOME"].map((st, i) => (
                  <div key={i} className="p-3 bg-white rounded-lg border border-ink/10 space-y-1 shadow-sm">
                    <span className="text-lime font-bold">●</span>
                    <div className="font-bold text-ink">{st}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-white rounded-lg border border-ink/10 text-xs font-mono text-ink/70 leading-relaxed">
                <span className="font-bold text-ink">Design Thinking Principle:</span> Every digital experience begins with user intent. By removing friction in page layout, navigation paths, and form inputs, cognitive load drops and conversion probability maximizes.
              </div>
            </div>
          )}

          {/* 02: INFORMATION ARCHITECTURE DEMO */}
          {currentSceneIdx === 1 && (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-2 font-mono text-xs">
                <div className="px-4 py-1.5 bg-ink text-lime font-bold rounded-lg shadow-sm">HOME (Primary Root)</div>
                <div className="w-[1.5px] h-3 bg-ink/20"></div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full text-center">
                  {["ABOUT // AUTHORITY", "SERVICES // OFFERS", "CONTENT // SEO PILLARS", "CONTACT // CONVERSION"].map((node, i) => (
                    <div key={i} className="p-2.5 bg-white rounded-lg border border-ink/10 font-bold text-ink text-[11px] shadow-sm">
                      {node}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-ink/10 text-xs font-mono text-ink/70 leading-relaxed">
                <span className="font-bold text-ink">SEO ↔ UX Synthesis:</span> Search crawler indexing trees and human navigation trees require identical structural clarity. Clean URL hierarchies benefit Googlebot while keeping human visitors oriented.
              </div>
            </div>
          )}

          {/* 03: WIREFRAMING TO INTERFACE DEMO */}
          {currentSceneIdx === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 bg-white rounded-lg border-2 border-dashed border-ink/30 space-y-2">
                <span className="text-[10px] font-bold text-ink/40 uppercase">STRUCTURAL BLUEPRINT (WIREFRAME)</span>
                <div className="h-6 bg-ink/10 rounded flex items-center justify-center text-[10px] text-ink/50">[ HEADER // NAV ]</div>
                <div className="h-16 bg-ink/10 rounded flex items-center justify-center text-[10px] text-ink/50">[ HERO FOCAL HEADLINE ]</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-10 bg-ink/10 rounded flex items-center justify-center text-[10px] text-ink/50">[ VALUE A ]</div>
                  <div className="h-10 bg-ink/10 rounded flex items-center justify-center text-[10px] text-ink/50">[ VALUE B ]</div>
                </div>
              </div>

              <div className="p-4 bg-ink text-white rounded-lg border border-ink space-y-2 shadow-sm">
                <span className="text-[10px] font-bold text-lime uppercase">HIGH-FIDELITY INTERFACE</span>
                <div className="h-6 bg-white/10 rounded px-3 flex items-center justify-between text-[10px]">
                  <span className="text-lime font-bold">● BRAND</span>
                  <span className="text-white/60">WORK • ABOUT • CONTACT</span>
                </div>
                <div className="h-16 bg-white/10 rounded p-2.5 flex flex-col justify-center">
                  <span className="text-xs font-bold text-white leading-tight">EDITORIAL MOTION DESIGN</span>
                  <span className="text-[10px] text-lime">High-Intent Digital Growth</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 bg-white/10 rounded text-white/90">SEO Audit</div>
                  <div className="p-2 bg-lime text-ink font-bold rounded">Explore Work →</div>
                </div>
              </div>
            </div>
          )}

          {/* 04: VISUAL DESIGN DEMO */}
          {currentSceneIdx === 3 && (
            <div className="space-y-4">
              <div className="p-6 bg-ink text-white rounded-xl space-y-3">
                <div className="text-[10px] font-mono text-lime font-bold uppercase tracking-widest">[ TYPOGRAPHIC SCALE & CONTRAST ]</div>
                <div className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tighter leading-none text-white">
                  EDITORIAL HIERARCHY
                </div>
                <div className="text-xs font-mono text-white/70 max-w-xl leading-relaxed">
                  Size contrast guides the eye immediately: Primary Display Heading (100% weight) → Secondary Monospace Tagline (60% weight) → Tertiary Metadata (40% weight).
                </div>
              </div>
            </div>
          )}

          {/* 05: RESPONSIVE DESIGN DEMO */}
          {currentSceneIdx === 4 && (
            <div className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-lg border border-ink/10 space-y-1.5 shadow-sm">
                  <span className="text-ink font-bold text-[11px]">DESKTOP (1600px)</span>
                  <div className="h-2 bg-ink rounded"></div>
                  <div className="grid grid-cols-3 gap-1">
                    <div className="h-6 bg-ink/15 rounded"></div>
                    <div className="h-6 bg-ink/15 rounded"></div>
                    <div className="h-6 bg-ink/15 rounded"></div>
                  </div>
                  <span className="text-[10px] text-ink/50">3-column multi-rail</span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-ink/10 space-y-1.5 shadow-sm">
                  <span className="text-ink font-bold text-[11px]">TABLET (768px)</span>
                  <div className="h-2 bg-ink rounded"></div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="h-6 bg-ink/15 rounded"></div>
                    <div className="h-6 bg-ink/15 rounded"></div>
                  </div>
                  <span className="text-[10px] text-ink/50">2-column fluid reflow</span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-ink/10 space-y-1.5 shadow-sm">
                  <span className="text-ink font-bold text-[11px]">MOBILE (375px)</span>
                  <div className="h-2 bg-ink rounded"></div>
                  <div className="space-y-1">
                    <div className="h-4 bg-ink/15 rounded"></div>
                    <div className="h-4 bg-ink/15 rounded"></div>
                  </div>
                  <span className="text-[10px] text-ink/50">1-column stacked touch</span>
                </div>
              </div>
              <p className="text-[11px] text-ink/70">
                Grounding in resume: Engineered mobile-friendly, fluid layouts tailored for touch and desktop devices with zero horizontal overflow.
              </p>
            </div>
          )}

          {/* 06: INTERACTION DESIGN DEMO */}
          {currentSceneIdx === 5 && (
            <div className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {["DEFAULT STATE", "HOVER REACTION", "FOCUS STATE", "CLICKED FEEDBACK"].map((st, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      i === 1
                        ? 'bg-lime text-ink font-bold shadow-md scale-105 border-ink'
                        : i === 2
                        ? 'bg-ink text-white ring-2 ring-lime ring-offset-2'
                        : i === 3
                        ? 'bg-ink text-lime border-ink translate-y-0.5'
                        : 'bg-white text-ink border-ink/15 hover:border-ink'
                    }`}
                  >
                    <div className="text-[10px] opacity-60">STATE 0{i + 1}</div>
                    <div className="font-bold pt-1">{st}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-ink/70">
                Tactile micro-interactions communicate responsiveness: instantaneous hover feedback, clear keyboard focus outlines, and non-jarring state transitions.
              </p>
            </div>
          )}

          {/* 07: USABILITY DEMO */}
          {currentSceneIdx === 6 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 bg-white/50 rounded-xl border border-red-300 space-y-2 opacity-75">
                <span className="text-red-600 font-bold text-[10px] uppercase">✕ USABILITY BARRIERS (CONFUSION)</span>
                <p className="text-[11px] text-ink/50 line-through">Vague navigation labels, poor contrast, hidden tap targets, inconsistent page layouts.</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-lime shadow-sm space-y-2">
                <span className="text-ink font-bold text-[10px] uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-lime"></span>
                  <span>STRUCTURE & CLARITY (USABILITY)</span>
                </span>
                <p className="text-[11px] text-ink/80">Self-evident navigation, WCAG AAA contrast, 48px+ touch targets, instantaneous orientation indicators.</p>
              </div>
            </div>
          )}

          {/* 08: DESIGN SYSTEMS DEMO */}
          {currentSceneIdx === 7 && (
            <div className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-ink text-white rounded-lg space-y-1">
                  <span className="text-[10px] text-white/40">TOKEN // PRIMARY</span>
                  <div className="font-bold">#080808 (Deep Obsidian)</div>
                </div>
                <div className="p-3 bg-white text-ink border border-ink/15 rounded-lg space-y-1">
                  <span className="text-[10px] text-ink/40">TOKEN // SURFACE</span>
                  <div className="font-bold">#F5F5F1 (Off-White)</div>
                </div>
                <div className="p-3 bg-lime text-ink rounded-lg space-y-1">
                  <span className="text-[10px] text-ink/60">TOKEN // ACCENT</span>
                  <div className="font-bold">#CCFF00 (Acid Lime)</div>
                </div>
              </div>
              <p className="text-[11px] text-ink/70">
                Design System Thinking: One coherent system of typography, tokens, components, and spacing driving consistent experiences across every section.
              </p>
            </div>
          )}

          {/* 09: DIGITAL EXPERIENCE DEMO */}
          {currentSceneIdx === 8 && (
            <div className="p-5 bg-ink text-white rounded-xl space-y-4 font-mono text-xs">
              <div className="text-lime font-bold text-xs uppercase">[ THE FULL-SPECTRUM CONVERGENCE ]</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2.5 bg-white/10 rounded">UX // Flow Architecture</div>
                <div className="p-2.5 bg-white/10 rounded">UI // Visual Hierarchy</div>
                <div className="p-2.5 bg-white/10 rounded">CONTENT // Intent Alignment</div>
                <div className="p-2.5 bg-white/10 rounded">DATA // GA4 Measurement</div>
                <div className="p-2.5 bg-white/10 rounded">WEB // Responsive Delivery</div>
                <div className="p-2.5 bg-lime text-ink font-bold rounded">MARKETING // Conversion</div>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed border-t border-white/10 pt-2">
                This is where digital marketing, user experience, data telemetry, and web technology fuse into one single continuous discipline.
              </p>
            </div>
          )}
        </div>

        {/* Scene Principles List */}
        <div className="space-y-2">
          <span className="font-mono text-[10px] text-ink/40 uppercase font-bold tracking-widest">
            CORE PRINCIPLES DEMONSTRATED:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentScene.principles.map((pr, i) => (
              <div key={i} className="flex items-center gap-2 font-mono text-xs text-ink/80">
                <span className="w-1.5 h-1.5 rounded-full bg-lime"></span>
                <span>{pr}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pillar03UiUxExperience;
