'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function RedBreak() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // Intense slow scale up as you scroll through the red section
    tl.fromTo('.redbreak-container', 
      { scale: 0.85, rotationX: 10 },
      { scale: 1.1, rotationX: 0, ease: 'none' }
    );
    
    // Slight parallax on the text lines themselves
    gsap.utils.toArray('.redbreak-line').forEach((line: any, i) => {
      tl.fromTo(line,
        { x: i % 2 === 0 ? '-5vw' : '5vw' },
        { x: i % 2 === 0 ? '5vw' : '-5vw', ease: 'none' },
        0
      );
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full min-h-[60vh] md:min-h-[80vh] bg-accent-flash flex items-center justify-center px-4 overflow-hidden relative z-10 border-y border-bg-base perspective-[1000px]">
      <div className="redbreak-container flex flex-col items-center justify-center w-full transform-gpu">
        <h2 className="font-display text-[13vw] md:text-[11vw] lg:text-[10vw] text-bg-base uppercase tracking-tighter leading-[0.8] text-center w-full flex flex-col whitespace-nowrap mix-blend-multiply opacity-90">
          <span className="redbreak-line block">THE SOUNDTRACK</span>
          <span className="redbreak-line block text-text-primary mix-blend-normal">OUTLIVES</span>
          <span className="redbreak-line block">THE RUNTIME.</span>
        </h2>
      </div>
    </section>
  );
}
