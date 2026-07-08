'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function SectionStrobe() {
  const flashRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!flashRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const sections = ['#duo', '#runway', '#now', '#recreations', '#filmography', '#sound', '#press', '#contact'];

    sections.forEach((selector) => {
      ScrollTrigger.create({
        trigger: selector,
        start: 'top 50%',
        onEnter: () => {
          gsap.timeline()
            .set(flashRef.current, { opacity: 1 })
            .to(flashRef.current, { opacity: 0, duration: 0.08, ease: 'power4.out' });
        },
        onEnterBack: () => {
          gsap.timeline()
            .set(flashRef.current, { opacity: 1 })
            .to(flashRef.current, { opacity: 0, duration: 0.08, ease: 'power4.out' });
        }
      });
    });
  }, []);

  return (
    <div 
      ref={flashRef}
      className="fixed inset-0 bg-accent-flash opacity-0 pointer-events-none z-[100]"
    ></div>
  );
}
