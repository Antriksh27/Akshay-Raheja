'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const tailRef = useRef<HTMLDivElement>(null);
  
  // Is this device using a fine pointer (mouse)?
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    // Check if device supports fine pointer (disables on touch)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasPointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => setHasPointer(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (!hasPointer) return;

    // Apply global cursor:none when active
    document.body.classList.add('cursor-none');
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    // Smooth interpolation positions
    let tailX = mouseX;
    let tailY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let animationFrameId: number;

    const render = () => {
      // The main dot follows exactly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // The tail eases towards the main dot
      tailX += (mouseX - tailX) * 0.15;
      tailY += (mouseY - tailY) * 0.15;

      if (tailRef.current) {
        tailRef.current.style.transform = `translate3d(${tailX}px, ${tailY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.body.classList.remove('cursor-none');
    };
  }, [hasPointer]);

  if (!hasPointer) return null;

  return (
    <>
      {/* Trailing tail */}
      <div 
        ref={tailRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-accent-flash rounded-full pointer-events-none z-[9998] opacity-50 mix-blend-difference"
      />
      {/* Main dot */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-accent-flash rounded-full pointer-events-none z-[9999]"
      />
    </>
  );
}
