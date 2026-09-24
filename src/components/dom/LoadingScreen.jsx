import React, { useEffect, useState } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFading(true);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15 + 8);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#F5F5F1] flex flex-col justify-between p-8 sm:p-16 transition-opacity duration-700 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex justify-between items-center text-xs font-mono text-ink-muted">
        <span>PANDI VEER VISWA</span>
        <span>EDITORIAL MOTION SEQUENCE</span>
      </div>

      <div className="space-y-4 max-w-xl">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-lime animate-ping"></span>
          <span className="meta-tag font-bold text-ink">LOADING EXPERIENCE</span>
        </div>
        <div className="editorial-headline text-5xl sm:text-8xl font-extrabold text-ink font-mono">
          {Math.min(percent, 100)}%
        </div>
      </div>

      <div className="flex justify-between items-center text-xs font-mono text-ink-muted">
        <span>DIGITAL MARKETING EXECUTIVE</span>
        <span>INITIALIZING MOTION EXPERIENCE</span>
      </div>
    </div>
  );
};
