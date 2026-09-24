import React from 'react';

/**
 * TextReveal: Kinetic editorial typography with overflow-hidden mask
 */
export const TextReveal = ({
  children,
  className = "",
  translateY = 0,
  opacity = 1,
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${translateY}%)`,
          opacity: opacity,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TextReveal;
