import React from 'react';
import { Hero } from '../sections/Hero';
import { Statement } from '../sections/Statement';
import { Capabilities } from '../sections/Capabilities';
import { SelectedWork } from '../sections/SelectedWork';
import { Experience } from '../sections/Experience';
import { Contact } from '../sections/Contact';
import { LimeTransition } from './LimeTransition';
import { useNavigationTransition } from '../../context/TransitionContext';

/**
 * Helper to compute smooth normalized scene states: opacity, translation, active flag
 */
function getSceneState(progress, start, end, peakStart = null, peakEnd = null) {
  if (progress < start || progress > end) {
    return { active: false, opacity: 0, translateY: 35 };
  }
  const pStart = peakStart !== null ? peakStart : start + (end - start) * 0.25;
  const pEnd = peakEnd !== null ? peakEnd : end - (end - start) * 0.25;

  let opacity = 0;
  let translateY = 0;

  if (progress < pStart) {
    const t = (progress - start) / Math.max(0.001, pStart - start);
    opacity = t;
    translateY = (1 - t) * 35;
  } else if (progress > pEnd) {
    const t = (progress - pEnd) / Math.max(0.001, end - pEnd);
    opacity = 1 - t;
    translateY = -t * 35;
  } else {
    opacity = 1;
    translateY = 0;
  }

  return { active: true, opacity, translateY };
}

/**
 * ScrollSequence: Master choreography container
 * Drives continuous motion transitions across the expanded 4-pillar hybrid experience.
 */
export const ScrollSequence = ({ progress = 0, onOpenCaseStudy, onBeginJourney }) => {
  const { isTransitioning, contentVisible, contentOpacity } = useNavigationTransition();

  // 1. Hero: 0.00 - 0.12
  const sHero = getSceneState(progress, 0.00, 0.12, 0.00, 0.08);

  // 2. Statement (The Hybrid Manifesto): 0.09 - 0.20
  const sStatement = getSceneState(progress, 0.09, 0.20, 0.12, 0.17);

  // 3. Capabilities (ONE Horizontal Cinematic Gallery): 0.21 - 0.70
  const sCapabilities = getSceneState(progress, 0.21, 0.70, 0.24, 0.67);

  // 4. Acid-Lime Transition 2: 0.69 - 0.73 (Wipes into Selected Work Gallery during manual scroll only)
  const lime2Active = !isTransitioning && progress >= 0.69 && progress <= 0.73;
  const lime2Progress = lime2Active ? (progress - 0.69) / 0.04 : 0;

  // 5. Selected Work Exhibition (Two-World Project Archive): 0.70 - 0.89
  const sWork = getSceneState(progress, 0.70, 0.89, 0.73, 0.86);

  // 6. Experience & Education: 0.89 - 0.95
  const sExp = getSceneState(progress, 0.89, 0.95, 0.91, 0.93);

  // 7. Contact Finale: 0.94 - 1.00
  const sContact = getSceneState(progress, 0.94, 1.00, 0.96, 1.00);


  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none transition-opacity duration-300"
      style={{
        opacity: isTransitioning ? contentOpacity : 1,
      }}
    >
      {/* Interactive content layer */}
      <div className="relative w-full h-full">
        {/* Scene 01: Hero */}
        {sHero.active && (
          <Hero
            progress={progress}
            opacity={sHero.opacity}
            translateY={sHero.translateY}
            onBeginJourney={onBeginJourney}
          />
        )}

        {/* Scene 02: Statement */}
        {sStatement.active && (
          <Statement
            progress={progress}
            opacity={sStatement.opacity}
            translateY={sStatement.translateY}
          />
        )}

        {/* Scene 03: Capabilities (ONE Horizontal Cinematic Gallery) */}
        {sCapabilities.active && (
          <Capabilities
            progress={progress}
            opacity={sCapabilities.opacity}
            translateY={sCapabilities.translateY}
          />
        )}

        {/* Lime Transition 02 (Wipes into Selected Work) */}
        <LimeTransition
          active={lime2Active}
          progress={lime2Progress}
          label="SELECTED WORK // EXHIBITION"
        />

        {/* Scene 04: Selected Work Two-World Project Archive */}
        {sWork.active && (
          <SelectedWork
            progress={progress}
            opacity={sWork.opacity}
            translateY={sWork.translateY}
            onOpenModal={onOpenCaseStudy}
          />
        )}

        {/* Scene 07: Experience */}
        {sExp.active && (
          <Experience
            progress={progress}
            opacity={sExp.opacity}
            translateY={sExp.translateY}
          />
        )}

        {/* Scene 08: Contact */}
        {sContact.active && (
          <Contact
            opacity={sContact.opacity}
            translateY={sContact.translateY}
          />
        )}
      </div>
    </div>
  );
};

export default ScrollSequence;
