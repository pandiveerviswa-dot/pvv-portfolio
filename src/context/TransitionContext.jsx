import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const TransitionContext = createContext(null);

/**
 * Universal Navigation Transition States:
 * IDLE: Resting in orbit or destination world. Navigation unlocked.
 * EARTH_APPROACH: Outgoing UI fading out. Camera plunging toward Earth. Stars streaking (+50). Nav locked.
 * EARTH_CLOSE: Peak proximity. Earth fills >140% of viewport. Destination swapped behind Earth.
 * DESTINATION_REVEAL: Destination UI fading in. Stars decelerating to ambient.
 * EARTH_DEPARTURE: Reverse flight. Detail UI fading out. Camera pulling 6 units away into space. Stars -40.
 */
export const TransitionProvider = ({ children }) => {
  // Navigation locking & state machine
  const [transitionState, setTransitionState] = useState('IDLE');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isTransitioningRef = useRef(false);

  // Single unified flight opacity: 1 when idle, animates 1 -> 0 -> 1 during transitions
  const [flightOpacity, setFlightOpacity] = useState(1);

  // Sections navigation
  const [currentSection, setCurrentSection] = useState('hero');
  const [targetSection, setTargetSection] = useState(null);

  // Capability detail world state
  const [activeDetailCard, setActiveDetailCard] = useState(null);

  // Work project detail world state
  const [activeProject, setActiveProject] = useState(null);
  const [pendingDestination, setPendingDestination] = useState(null);

  // Dedicated Case Study modal state (child overlay over Project Window, NO camera travel)
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  // Preserved position state inside Work Archive
  const [workActiveWorld, setWorkActiveWorld] = useState(null); // null = Landing, 'digital-marketing', 'uiux'
  const [selectedDmIndex, setSelectedDmIndex] = useState(0);

  // Dedicated 3D Flight Telemetry Ref
  // progress: 0.0 = solar system orbit (z=5.8), 1.0 = close Earth surface (z=-0.15)
  const cameraFlightRef = useRef({
    progress: 0.0,
    isFlying: false,
    isDetailActive: false,
  });

  // Starfield velocity factor for forward (+50) and backward (-40) warp streaking
  const starVelocityRef = useRef(0);

  // Active GSAP timeline reference
  const flightTimelineRef = useRef(null);

  /**
   * UNIVERSAL FORWARD FLIGHT CONTROLLER
   * navigateWithEarthFlight(destination, options)
   */
  const navigateWithEarthFlight = useCallback((destination, options = {}) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setTransitionState('EARTH_APPROACH');

    const destType = typeof destination === 'string' ? 'SECTION' : (destination?.type || 'SECTION');
    const target = destination;
    setPendingDestination(target);

    if (flightTimelineRef.current) flightTimelineRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false;
        setIsTransitioning(false);
        setTransitionState('IDLE');
        setFlightOpacity(1);
        starVelocityRef.current = 0;
        cameraFlightRef.current.isFlying = false;
      },
    });

    flightTimelineRef.current = tl;
    cameraFlightRef.current.isFlying = true;

    // 1. Fade out current UI immediately (0.00s - 0.20s)
    // The Three.js canvas becomes the dominant visual
    tl.to({}, {
      duration: 0.20,
      ease: 'power2.out',
      onUpdate() {
        setFlightOpacity(1 - this.progress());
      },
      onComplete: () => {
        setFlightOpacity(0);
      },
    }, 0);

    // 2. Starfield acceleration into forward warp (0.00s - 0.50s)
    tl.to(starVelocityRef, {
      current: 50,
      duration: 0.50,
      ease: 'power2.in',
    }, 0);

    // 3. Camera physically flies through space toward Earth (0.00s - 1.40s)
    // progress ramps 0.0 -> 1.0 (z travels from +5.80 to -0.15)
    // Earth expands from 25% of viewport to >140% of viewport
    cameraFlightRef.current.progress = 0.0;
    tl.to(cameraFlightRef.current, {
      progress: 1.0,
      duration: 1.40,
      ease: 'power3.inOut',
    }, 0);

    // 4. Starfield deceleration as camera nears Earth (0.90s - 1.40s)
    tl.to(starVelocityRef, {
      current: 0,
      duration: 0.50,
      ease: 'power2.out',
    }, 0.90);

    // 5. AT PEAK CLOSE-UP (1.35s):
    // Switch destination state while Earth surface/atmosphere covers the entire screen
    tl.add(() => {
      setTransitionState('EARTH_CLOSE');

      if (destType === 'SECTION') {
        const sec = typeof target === 'string' ? target : target.section;
        setCurrentSection(sec);
        let targetProgress = 0.0;
        if (sec === 'hero') targetProgress = 0.00;
        else if (sec === 'capabilities') targetProgress = 0.27;
        else if (sec === 'work') targetProgress = 0.76;
        else if (sec === 'experience') targetProgress = 0.92;
        else if (sec === 'contact') targetProgress = 0.98;

        if (options.onScrollSync) options.onScrollSync(targetProgress);

        // Clear detail overlays and reset work folder
        setActiveProject(null);
        setActiveCaseStudy(null);
        setCaseStudyOpen(false);
        setWorkActiveWorld(null);
        setActiveDetailCard(null);
        cameraFlightRef.current.isDetailActive = false;
      } else if (destType === 'WORK_FOLDER') {
        // Enters Project Window: Earth stays in near-Earth orbit!
        setWorkActiveWorld(target.folder);
        setCaseStudyOpen(false);
        cameraFlightRef.current.isDetailActive = true;
      } else if (destType === 'PROJECT') {
        setActiveCaseStudy(target.project);
        setActiveProject(target.project);
        setCaseStudyOpen(true);
        cameraFlightRef.current.isDetailActive = true;
      } else if (destType === 'CAPABILITY_DETAIL') {
        setActiveDetailCard(target.cardIndex);
        cameraFlightRef.current.isDetailActive = true;
      }

      setPendingDestination(null);
      setTransitionState('DESTINATION_REVEAL');
    }, 1.35);

    // Only SECTION destinations maneuver camera back to progress 0.0.
    // WORK_FOLDER and PROJECT destinations remain at progress 1.0 in near-Earth orbit!
    if (destType === 'SECTION') {
      tl.to(cameraFlightRef.current, {
        progress: 0.0,
        duration: 0.45,
        ease: 'power2.out',
      }, 1.35);
    }

    // 6. Reveal destination UI (1.38s - 1.75s)
    tl.to({}, {
      duration: 0.37,
      ease: 'power2.out',
      onUpdate() {
        setFlightOpacity(this.progress());
      },
      onComplete: () => {
        setFlightOpacity(1);
      },
    }, 1.38);
  }, []);

  /**
   * UNIVERSAL REVERSE FLIGHT CONTROLLER
   * returnWithEarthFlight(destination, options)
   */
  const returnWithEarthFlight = useCallback((destination, options = {}) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setTransitionState('EARTH_DEPARTURE');

    if (flightTimelineRef.current) flightTimelineRef.current.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false;
        setIsTransitioning(false);
        setTransitionState('IDLE');
        setFlightOpacity(1);
        starVelocityRef.current = 0;
        cameraFlightRef.current.isFlying = false;
        cameraFlightRef.current.isDetailActive = false;
      },
    });

    flightTimelineRef.current = tl;
    cameraFlightRef.current.isFlying = true;

    const returnType = destination?.type || 'WORK_ARCHIVE';

    // 1. Fade out current detail/folder UI immediately (0.00s - 0.20s)
    tl.to({}, {
      duration: 0.20,
      ease: 'power2.out',
      onUpdate() {
        setFlightOpacity(1 - this.progress());
      },
      onComplete: () => {
        setFlightOpacity(0);
      },
    }, 0);

    // 2. Stars accelerate in reverse warp (-40) (0.00s - 0.50s)
    tl.to(starVelocityRef, {
      current: -40,
      duration: 0.50,
      ease: 'power2.in',
    }, 0);

    // 3. Camera pulls away from Earth back into deep space (progress 1.0 -> 0.0) (0.00s - 1.40s)
    // Earth visibly shrinks from filling screen (>140%) back to distant globe (25%)
    cameraFlightRef.current.progress = 1.0;
    tl.to(cameraFlightRef.current, {
      progress: 0.0,
      duration: 1.40,
      ease: 'power3.inOut',
    }, 0);

    // 4. Stars decelerate to normal ambient drift (0.90s - 1.40s)
    tl.to(starVelocityRef, {
      current: 0,
      duration: 0.50,
      ease: 'power2.out',
    }, 0.90);

    // 5. Restore parent state at arrival (1.35s)
    tl.add(() => {
      if (returnType === 'WORK_ARCHIVE' || returnType === 'WORK_LANDING') {
        setActiveProject(null);
        setActiveCaseStudy(null);
        setCaseStudyOpen(false);
        setWorkActiveWorld(null); // Always return directly to the main WORK archive two-world selection screen
        cameraFlightRef.current.isDetailActive = false;
      } else if (returnType === 'CAPABILITIES_GALLERY') {
        setActiveDetailCard(null);
      }
      setTransitionState('DESTINATION_REVEAL');
    }, 1.35);

    // 6. Reveal parent UI cleanly (1.38s - 1.70s)
    tl.to({}, {
      duration: 0.32,
      ease: 'power2.out',
      onUpdate() {
        setFlightOpacity(this.progress());
      },
      onComplete: () => {
        setFlightOpacity(1);
      },
    }, 1.38);
  }, []);

  /**
   * Dedicated Case Study Opening / Closing (Child Modal, NO 3D camera travel)
   */
  const openCaseStudy = useCallback((project) => {
    if (!project) return;
    setActiveCaseStudy(project);
    setActiveProject(project);
    setCaseStudyOpen(true);
    if (typeof window !== 'undefined') {
      window.history.pushState({ modal: 'case-study', projectId: project.id }, '');
    }
  }, []);

  const closeCaseStudy = useCallback(() => {
    setCaseStudyOpen(false);
    setActiveCaseStudy(null);
    setActiveProject(null);
    if (typeof window !== 'undefined' && window.history.state?.modal === 'case-study') {
      window.history.replaceState(null, '');
    }
  }, []);

  // Backward-compatible wrappers for project callers
  const openProjectWorld = useCallback((project) => {
    openCaseStudy(project);
  }, [openCaseStudy]);

  const closeProjectWorld = useCallback(() => {
    closeCaseStudy();
  }, [closeCaseStudy]);

  // Handle Browser Back button cleanly:
  // If Case Study is open, close Case Study only (staying in Project Window).
  // If in Project Window, return to Works Archive via reverse Earth flight.
  React.useEffect(() => {
    const handlePopState = () => {
      if (isTransitioningRef.current) return;
      if (caseStudyOpen) {
        closeCaseStudy();
      } else if (workActiveWorld !== null) {
        returnWithEarthFlight({ type: 'WORK_LANDING' });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [caseStudyOpen, workActiveWorld, closeCaseStudy, returnWithEarthFlight]);

  // ESC handler for Project Window (returns to Works Archive if Case Study is not open)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isTransitioningRef.current) {
        if (!caseStudyOpen && workActiveWorld !== null) {
          returnWithEarthFlight({ type: 'WORK_LANDING' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [caseStudyOpen, workActiveWorld, returnWithEarthFlight]);

  // Backward-compatible wrappers ensuring all callers automatically get the Earth flight
  const triggerNavigation = useCallback((targetKeyOrProgress, onScrollSync) => {
    let targetKey = 'hero';
    if (typeof targetKeyOrProgress === 'number') {
      if (targetKeyOrProgress <= 0.05) targetKey = 'hero';
      else if (targetKeyOrProgress <= 0.65) targetKey = 'capabilities';
      else if (targetKeyOrProgress <= 0.85) targetKey = 'work';
      else if (targetKeyOrProgress <= 0.93) targetKey = 'experience';
      else targetKey = 'contact';
    } else {
      targetKey = targetKeyOrProgress;
    }
    navigateWithEarthFlight(targetKey, { onScrollSync });
  }, [navigateWithEarthFlight]);

  const openCapabilityWorld = useCallback((cardIndex) => {
    navigateWithEarthFlight({ type: 'CAPABILITY_DETAIL', cardIndex });
  }, [navigateWithEarthFlight]);

  const closeCapabilityWorld = useCallback(() => {
    returnWithEarthFlight({ type: 'CAPABILITIES_GALLERY' });
  }, [returnWithEarthFlight]);

  return (
    <TransitionContext.Provider
      value={{
        transitionState,
        isTransitioning: isTransitioning || transitionState !== 'IDLE',
        isDetailTransitioning: isTransitioning || transitionState !== 'IDLE',
        flightOpacity,

        // Current navigation coordinates
        currentSection,
        targetSection,

        // Capability detail state
        activeDetailCard,
        detailVisible: activeDetailCard !== null,
        detailOpacity: flightOpacity,
        galleryVisible: true,
        galleryOpacity: flightOpacity,

        // Work project state
        activeProject,
        pendingDestination,
        projectWorldVisible: activeProject !== null,
        projectWorldOpacity: flightOpacity,
        workArchiveVisible: true,
        workArchiveOpacity: flightOpacity,

        // Dedicated Case Study state & controls
        caseStudyOpen,
        activeCaseStudy,
        openCaseStudy,
        closeCaseStudy,

        // General content opacity alias
        contentVisible: true,
        contentOpacity: flightOpacity,

        // Folder & project positions
        workActiveWorld,
        setWorkActiveWorld,
        selectedDmIndex,
        setSelectedDmIndex,

        // Flight Telemetry
        cameraFlightRef,
        starVelocityRef,

        // Universal Flight Methods
        navigateWithEarthFlight,
        returnWithEarthFlight,

        // Standard caller wrappers
        triggerNavigation,
        openProjectWorld,
        closeProjectWorld,
        openCapabilityWorld,
        closeCapabilityWorld,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export const useNavigationTransition = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error('useNavigationTransition must be used within a TransitionProvider');
  }
  return ctx;
};

export default TransitionContext;
