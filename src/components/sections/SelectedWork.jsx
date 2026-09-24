import React from 'react';
import { ArrowLeft, ArrowUpRight, ArrowRight, Layers, Layout, BarChart3, Search, Sparkles, FolderGit2 } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { useNavigationTransition } from '../../context/TransitionContext';

/**
 * SelectedWork: Two-World Project Archive
 * Rebuilt into an editorial exhibition with two dedicated folders:
 * 01 — DIGITAL MARKETING (3 verified projects)
 * 02 — UI/UX DESIGN (Polished in-curation empty state)
 * 
 * Cinematic 3D Navigation:
 * - State A: Work Archive at normal orbital distance (Earth is whole planet, z = 4.4)
 * - State B: Project Case Study in close Earth orbit (z = 0.60)
 * - Transition triggered strictly on project explore / view
 * - Reverse departure journey on <- BACK TO WORK
 */
export const SelectedWork = ({
  opacity = 1,
  translateY = 0,
  progress = 0,
  onOpenModal,
}) => {
  const {
    openCaseStudy,
    openProjectWorld,
    navigateWithEarthFlight,
    returnWithEarthFlight,
    isTransitioning,
    isDetailTransitioning,
    workArchiveVisible,
    workArchiveOpacity,
    workActiveWorld,
    selectedDmIndex,
    setSelectedDmIndex,
  } = useNavigationTransition();

  const isLocked = isTransitioning || isDetailTransitioning;
  const activeWorld = workActiveWorld;

  const handleSelectWorld = (world) => {
    if (!isLocked) {
      navigateWithEarthFlight({ type: 'WORK_FOLDER', folder: world });
    }
  };

  const handleBackToLanding = () => {
    if (!isLocked) {
      returnWithEarthFlight({ type: 'WORK_LANDING' });
    }
  };

  const workData = portfolioData.workData || {
    categories: [],
    digitalMarketingProjects: portfolioData.projects || [],
    uiuxProjects: [],
  };

  const dmProjects = workData.digitalMarketingProjects || [];
  const currentDmProject = dmProjects[selectedDmIndex] || dmProjects[0];
  const uiuxProjects = workData.uiuxProjects || [];
  const nexusProject = uiuxProjects[0];
  const pulseProject = uiuxProjects[1];

  const finalOpacity = workArchiveVisible ? opacity * workArchiveOpacity : 0;

  return (
    <section
      className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 lg:px-16 pt-20 sm:pt-24 pb-8 max-w-[1600px] mx-auto w-full text-white select-none transition-opacity duration-300"
      style={{
        opacity: finalOpacity,
        transform: `translateY(${translateY}px)`,
        display: workArchiveVisible ? 'flex' : 'none',
        pointerEvents: workArchiveVisible && !isDetailTransitioning && finalOpacity > 0.3 ? 'auto' : 'none',
        visibility: workArchiveVisible && finalOpacity > 0.01 ? 'visible' : 'hidden',
      }}
    >
      {/* ===================================================================== */}
      {/* 1. LANDING SCREEN: TWO-WORLD SELECTION (activeWorld === null)         */}
      {/* ===================================================================== */}
      {activeWorld === null && (
        <div className="w-full my-auto space-y-6 sm:space-y-8 animate-fadeIn">
          {/* Editorial Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/15 pb-4 sm:pb-6 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5 font-mono text-xs sm:text-sm tracking-widest text-lime uppercase font-semibold">
                <span className="w-2 h-2 bg-lime inline-block" />
                <span>[ WORK ARCHIVE ]</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
                SELECTED PROJECTS
              </h2>
            </div>
            <p className="font-mono text-xs sm:text-sm text-white/60 tracking-wider uppercase max-w-md">
              EXPLORE BY DISCIPLINE // 01 DIGITAL MARKETING × 02 UI/UX DESIGN
            </p>
          </div>

          {/* Two Major Category World Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto w-full">
            {/* ------------------------------------------------------------- */}
            {/* WORLD 01: DIGITAL MARKETING                                  */}
            {/* ------------------------------------------------------------- */}
            <div
              data-world="digital-marketing"
              role="button"
              tabIndex={0}
              onClick={() => handleSelectWorld('digital-marketing')}
              className={`group border border-white/15 hover:border-lime bg-[#0c0d12]/90 hover:bg-[#11131a] p-6 sm:p-8 lg:p-10 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-2xl ${
                isDetailTransitioning ? 'pointer-events-none opacity-60' : 'cursor-pointer'
              }`}
            >
              {/* Subtle accent corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime/5 rounded-full blur-3xl pointer-events-none group-hover:bg-lime/10 transition-all duration-500" />

              <div>
                {/* Meta Top Line */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="font-display text-4xl sm:text-5xl font-black text-lime">
                    01
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-lime text-black font-mono text-xs font-bold tracking-wider uppercase">
                      3 CASE STUDIES
                    </span>
                    <span className="hidden sm:inline-block font-mono text-[11px] text-white/40 uppercase">
                      ACTIVE ARCHIVE
                    </span>
                  </div>
                </div>

                {/* Title & Scope */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white group-hover:text-lime transition-colors">
                  DIGITAL MARKETING
                </h3>
                <p className="font-mono text-xs sm:text-sm text-white/60 mt-1 mb-4">
                  SEO, Performance Analytics, and Web CMS Infrastructure
                </p>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans mb-6">
                  Data-driven organic search architectures, technical SEO audits, and business CMS deployments engineered for visibility, usability, and measurable growth.
                </p>

                {/* Discipline Chips */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {['Search Engine Optimization', 'GA4 & Looker Studio', 'WordPress CMS', 'Lead Funnels'].map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[11px] px-2.5 py-1 bg-white/5 border border-white/10 text-white/80 group-hover:border-lime/30 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs font-bold tracking-wider text-lime group-hover:text-white transition-colors">
                <span>ENTER ARCHIVE</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-200">
                  <span>EXPLORE 01</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* WORLD 02: UI/UX DESIGN                                       */}
            {/* ------------------------------------------------------------- */}
            <div
              data-world="uiux"
              role="button"
              tabIndex={0}
              onClick={() => handleSelectWorld('uiux')}
              className={`group border border-white/15 hover:border-lime/60 bg-[#0c0d12]/90 hover:bg-[#11131a] p-6 sm:p-8 lg:p-10 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-2xl ${
                isDetailTransitioning ? 'pointer-events-none opacity-60' : 'cursor-pointer'
              }`}
            >
              {/* Subtle accent corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-lime/5 transition-all duration-500" />

              <div>
                {/* Meta Top Line */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="font-display text-4xl sm:text-5xl font-black text-lime">
                    02
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-lime text-black font-mono text-xs font-bold tracking-wider uppercase">
                      2 CASE STUDIES
                    </span>
                    <span className="hidden sm:inline-block font-mono text-[11px] text-white/40 uppercase">
                      ACTIVE ARCHIVE
                    </span>
                  </div>
                </div>

                {/* Title & Scope */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white group-hover:text-lime transition-colors">
                  UI/UX DESIGN
                </h3>
                <p className="font-mono text-xs sm:text-sm text-white/60 mt-1 mb-4">
                  Interface Design, Usability, Wireframes &amp; Digital Systems
                </p>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans mb-6">
                  Conceptual enterprise workspaces and financial data visualization platforms exploring information architecture, design systems, and responsive UX.
                </p>

                {/* Discipline Chips */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {['Enterprise UX', 'Design Systems', 'Data Visualization', 'Responsive Architecture'].map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[11px] px-2.5 py-1 bg-white/5 border border-white/10 text-white/80 group-hover:border-lime/30 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs font-bold tracking-wider text-lime group-hover:text-white transition-colors">
                <span>ENTER ARCHIVE</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-200">
                  <span>EXPLORE 02</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. WORLD 01: DIGITAL MARKETING ARCHIVE                               */}
      {/* ===================================================================== */}
      {activeWorld === 'digital-marketing' && (
        <div className="w-full my-auto space-y-5 animate-fadeIn">
          {/* Top Sub-Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/15">
            <button
              onClick={handleBackToLanding}
              disabled={isDetailTransitioning}
              aria-label="Back to works archive"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 bg-black hover:bg-[#11131a] hover:border-lime border border-white/20 transition-all font-mono text-xs font-bold uppercase tracking-wider text-white hover:text-lime disabled:opacity-50 disabled:pointer-events-none shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-white group-hover:text-lime group-hover:-translate-x-1 transition-transform" />
              <span>← BACK TO WORKS</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-lime inline-block" />
              <span className="font-mono text-xs tracking-wider text-lime uppercase font-semibold">
                ARCHIVE 01 // DIGITAL MARKETING (3 VERIFIED PROJECTS)
              </span>
            </div>
          </div>

          {/* Project Switcher Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {dmProjects.map((p, idx) => {
              const isSelected = selectedDmIndex === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => !isDetailTransitioning && setSelectedDmIndex(idx)}
                  disabled={isDetailTransitioning}
                  className={`p-3 text-left border transition-all duration-200 flex items-center justify-between disabled:pointer-events-none ${
                    isSelected
                      ? 'bg-lime text-black border-lime font-bold shadow-md'
                      : 'bg-[#0c0d12]/80 text-white/80 border-white/15 hover:border-white/40'
                  }`}
                >
                  <div className="truncate">
                    <span className="font-mono text-xs block opacity-70">
                      PROJECT 0{idx + 1}
                    </span>
                    <span className="font-sans text-xs sm:text-sm font-semibold truncate block">
                      {p.title}
                    </span>
                  </div>
                  <span className="font-mono text-xs ml-2 opacity-80 shrink-0">
                    {isSelected ? '●' : '○'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Featured Project Stage */}
          {currentDmProject && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-[#0c0d12]/95 border border-white/15 p-6 sm:p-8 lg:p-10 shadow-2xl">
              {/* Left Column: Metadata & Details */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl sm:text-4xl font-black text-lime">
                    0{selectedDmIndex + 1}
                  </span>
                  <span className="text-white/30">/</span>
                  <span className="font-mono text-xs text-lime uppercase tracking-widest font-bold">
                    {currentDmProject.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  {currentDmProject.title}
                </h3>

                <p className="font-mono text-xs text-white/50 tracking-wider">
                  {currentDmProject.category}
                </p>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                  {currentDmProject.shortDescription}
                </p>

                {/* Hybrid Link Banner */}
                {currentDmProject.hybridConnection && (
                  <div className="p-3 bg-lime/[0.08] border border-lime/30 text-xs font-mono text-white/90 flex items-start gap-2">
                    <span className="text-lime font-bold shrink-0">HYBRID LINK:</span>
                    <span>{currentDmProject.hybridConnection}</span>
                  </div>
                )}

                {/* Deliverables snippet */}
                <div className="space-y-1.5 py-3 border-y border-white/10 text-xs font-mono text-white/80">
                  {currentDmProject.execution.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-lime font-bold">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Case Study Trigger Button */}
                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => !isDetailTransitioning && openCaseStudy(currentDmProject)}
                    disabled={isDetailTransitioning}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-lime text-black hover:bg-white transition-all font-mono text-xs font-bold uppercase tracking-wider group shadow-lg disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  <span className="font-mono text-xs text-white/40">
                    PRESS TO VIEW FULL REPORT
                  </span>
                </div>
              </div>

              {/* Right Column: Architectural Visual */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <div className="border border-white/15 bg-black/60 relative overflow-hidden group">
                  <img
                    src={currentDmProject.image}
                    alt={currentDmProject.title}
                    className="w-full h-auto object-cover max-h-[380px] transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  <div className="p-3 border-t border-white/10 bg-[#0a0a0a] flex items-center justify-between font-mono text-[11px] text-white/60">
                    <span>TECH: {currentDmProject.technologies.slice(0, 3).join(', ')}</span>
                    <span className="text-lime">VERIFIED DELIVERABLE</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* 3. WORLD 02: UI/UX DESIGN ARCHIVE (2 FLAGSHIP CASE STUDIES)          */}
      {/* ===================================================================== */}
      {activeWorld === 'uiux' && (
        <div className="w-full my-auto space-y-5 animate-fadeIn">
          {/* Top Sub-Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/15">
            <button
              onClick={handleBackToLanding}
              disabled={isDetailTransitioning}
              aria-label="Back to works archive"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 bg-black hover:bg-[#11131a] hover:border-lime border border-white/20 transition-all font-mono text-xs font-bold uppercase tracking-wider text-white hover:text-lime disabled:opacity-50 disabled:pointer-events-none shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-white group-hover:text-lime group-hover:-translate-x-1 transition-transform" />
              <span>← BACK TO WORKS</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-lime inline-block" />
              <span className="font-mono text-xs tracking-wider text-lime uppercase font-semibold">
                ARCHIVE 02 // UI/UX DESIGN (2 FLAGSHIP CASE STUDIES)
              </span>
            </div>
          </div>

          {/* Two Large Flagship Project Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* CARD 01: NEXUS */}
            {nexusProject && (
              <div className="bg-[#0c0d12]/95 border border-white/15 hover:border-lime p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 group shadow-2xl relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="font-display text-3xl sm:text-4xl font-black text-lime">
                      01
                    </span>
                    <span className="px-2.5 py-1 bg-lime/10 border border-lime/30 text-lime font-mono text-[10px] font-bold uppercase tracking-wider">
                      SELF-INITIATED PRODUCT DESIGN
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white group-hover:text-lime transition-colors">
                      {nexusProject.title}
                    </h3>
                    <p className="font-mono text-xs text-lime uppercase tracking-wider font-semibold mt-1">
                      {nexusProject.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                    {nexusProject.shortDescription}
                  </p>

                  {/* Discipline Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {nexusProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2.5 py-1 bg-white/[0.05] border border-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* High-Fi Preview Image */}
                  <div className="border border-white/10 bg-black/60 overflow-hidden relative mt-3">
                    <img
                      src={nexusProject.image}
                      alt={nexusProject.title}
                      className="w-full h-auto object-cover max-h-[220px] transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="p-2 border-t border-white/10 bg-[#0a0a0a] flex items-center justify-between font-mono text-[10px] text-white/50">
                      <span>WORKSPACE COCKPIT</span>
                      <span className="text-lime">12 CASE STUDY SECTIONS</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => !isDetailTransitioning && openCaseStudy(nexusProject)}
                    disabled={isDetailTransitioning}
                    className="w-full py-3 px-4 bg-lime text-black hover:bg-white transition-all font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* CARD 02: PULSE */}
            {pulseProject && (
              <div className="bg-[#0c0d12]/95 border border-white/15 hover:border-lime p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all duration-300 group shadow-2xl relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="font-display text-3xl sm:text-4xl font-black text-lime">
                      02
                    </span>
                    <span className="px-2.5 py-1 bg-lime/10 border border-lime/30 text-lime font-mono text-[10px] font-bold uppercase tracking-wider">
                      SELF-INITIATED PRODUCT DESIGN
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white group-hover:text-lime transition-colors">
                      {pulseProject.title}
                    </h3>
                    <p className="font-mono text-xs text-lime uppercase tracking-wider font-semibold mt-1">
                      {pulseProject.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                    {pulseProject.shortDescription}
                  </p>

                  {/* Discipline Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {pulseProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2.5 py-1 bg-white/[0.05] border border-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* High-Fi Preview Image */}
                  <div className="border border-white/10 bg-black/60 overflow-hidden relative mt-3">
                    <img
                      src={pulseProject.image}
                      alt={pulseProject.title}
                      className="w-full h-auto object-cover max-h-[220px] transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="p-2 border-t border-white/10 bg-[#0a0a0a] flex items-center justify-between font-mono text-[10px] text-white/50">
                      <span>FINANCIAL DATA COCKPIT</span>
                      <span className="text-lime">14 CASE STUDY SECTIONS</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => !isDetailTransitioning && openCaseStudy(pulseProject)}
                    disabled={isDetailTransitioning}
                    className="w-full py-3 px-4 bg-lime text-black hover:bg-white transition-all font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedWork;
