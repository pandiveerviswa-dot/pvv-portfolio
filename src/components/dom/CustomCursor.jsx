import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering over project or clickable
      const target = e.target.closest('button, a, [data-cursor]');
      if (target) {
        setHovered(true);
        const text = target.getAttribute('data-cursor');
        setCursorText(text || '');
      } else {
        setHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out flex items-center justify-center rounded-full ${
        hovered
          ? 'w-16 h-16 -ml-8 -mt-8 bg-lime text-ink font-mono text-[10px] font-bold shadow-lg'
          : 'w-4 h-4 -ml-2 -mt-2 bg-ink/70'
      }`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {hovered && cursorText && (
        <span className="tracking-widest uppercase">{cursorText}</span>
      )}
    </div>
  );
};
