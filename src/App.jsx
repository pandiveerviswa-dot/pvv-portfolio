import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSequence } from './components/motion/ScrollSequence';
import { SolarSystem3D } from './components/canvas/SolarSystem3D';
import { Navigation } from './components/dom/Navigation';
import { CustomCursor } from './components/dom/CustomCursor';
import { LoadingScreen } from './components/dom/LoadingScreen';
import { CaseStudyModal } from './components/case-study/CaseStudyModal';
import { TransitionProvider, useNavigationTransition } from './context/TransitionContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * Background tone orchestration:
 * During cinematic space travel transitions, returns deep black cosmos (#080808)
 */
function getSceneBackgroundColor(p, isTransitioning = false) {
  if (isTransitioning) return '#080808';
  if (p < 0.70) return '#080808'; // Scenes 01, 02 & 03: Hero, Statement & Capabilities Gallery (Deep Black Cosmos)
  if (p < 0.73) return '#CCFF00'; // Scene 04: Acid-Lime Wipe into Selected Work
  if (p < 0.89) return '#080808'; // Scene 05: Selected Work (Dark Gallery)
  if (p < 0.94) return '#F5F5F1'; // Scene 06: Experience & Education (Off-White)
  return '#080808';               // Scene 07: Contact Destination (Matte Black)
}

function PortfolioContent() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const {
    isTransitioning,
    triggerNavigation,
    caseStudyOpen,
    activeCaseStudy,
    openCaseStudy,
    closeCaseStudy,
    activeProject,
    projectWorldVisible,
    projectWorldOpacity,
    isDetailTransitioning,
  } = useNavigationTransition();

  const isTransitioningRef = useRef(isTransitioning);
  isTransitioningRef.current = isTransitioning;
  const stRef = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (loading) return;

    // Master GSAP ScrollTrigger timeline driving manual scroll
    const ctx = gsap.context(() => {
      stRef.current = ScrollTrigger.create({
        id: 'master-scroll',
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8, // Smooth and responsive scrub
        onUpdate: (self) => {
          // If a space transition is actively flying, ignore scroll scrubbing
          if (isTransitioningRef.current) return;
          setProgress(self.progress);
        },
      });
    }, containerRef);

    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    } else {
      ScrollTrigger.refresh();
    }

    return () => {
      ctx.revert();
    };
  }, [loading]);

  // Synchronize scroll track silently on transition arrival
  const handleScrollSync = (targetProgress) => {
    setProgress(targetProgress);
    if (!trackRef.current) return;
    const totalScroll = trackRef.current.scrollHeight - window.innerHeight;
    const targetScrollY = Math.round(targetProgress * totalScroll);
    if (stRef.current) {
      stRef.current.scroll(targetScrollY);
    }
    window.scrollTo({
      top: targetScrollY,
      behavior: 'auto',
    });
  };

  const handleNavJump = (targetSectionKey) => {
    triggerNavigation(targetSectionKey, handleScrollSync);
  };

  const handleOpenCaseStudy = (proj) => {
    openCaseStudy(proj);
  };

  const handleCloseCaseStudy = () => {
    closeCaseStudy();
  };

  const bgColor = getSceneBackgroundColor(progress, isTransitioning);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen select-none transition-colors duration-500 overflow-x-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Loading experience */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Subtle desktop cursor */}
      <CustomCursor />

      {/* Layer 0: Cinematic Space Travel & Scroll-Reactive Solar System 3D Environment */}
      <SolarSystem3D progress={progress} />

      {/* Minimal Editorial Navigation with Space Transition Controls */}
      <Navigation progress={progress} onJumpTo={handleNavJump} />

      {/* Master Motion-Design Sequence */}
      <ScrollSequence
        progress={progress}
        onOpenCaseStudy={handleOpenCaseStudy}
        onBeginJourney={() => handleNavJump('capabilities')}
      />

      {/* Master Scroll Track: 14,000px pacing for smooth filmic scrub across all 4 pillars */}
      <div
        ref={trackRef}
        className="w-full h-[14000px] pointer-events-none opacity-0"
        aria-hidden="true"
      />

      {/* Interactive Case Study Drawer Modal with Camera Depth */}
      <CaseStudyModal
        project={activeCaseStudy || activeProject}
        isOpen={caseStudyOpen}
        onClose={handleCloseCaseStudy}
        opacity={1}
        isTransitioning={isDetailTransitioning}
      />
    </div>
  );
}

export function App() {
  return (
    <TransitionProvider>
      <PortfolioContent />
    </TransitionProvider>
  );
}

export default App;
