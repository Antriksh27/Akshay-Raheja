'use client';

import { useRef } from 'react';
import { getRecreations } from '@/lib/data/releases';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Recreations() {
  const recreations = getRecreations();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panels = gsap.utils.toArray('.recreation-panel');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    panels.forEach((panel: any) => {
      const rightSide = panel.querySelector('.recreation-right');
      const flash = panel.querySelector('.recreation-flash');

      if (prefersReducedMotion) {
        gsap.set(rightSide, { opacity: 1 });
        return;
      }

      gsap.set(rightSide, { opacity: 0 });

      ScrollTrigger.create({
        trigger: panel,
        start: 'top 60%',
        onEnter: () => {
          gsap.timeline()
            .set(flash, { opacity: 1 })
            .set(rightSide, { opacity: 1 })
            .to(flash, { opacity: 0, duration: 0.15, ease: 'power4.out', delay: 0.05 });
        },
        once: true
      });
    });
  }, { scope: containerRef });

  return (
    <section id="recreations" className="w-full py-24 md:py-32 px-6 md:px-16 bg-black text-white relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 md:mb-32 text-center md:text-left">
          <h2 className="font-display text-5xl md:text-6xl lg:text-8xl text-white mb-4 tracking-tighter uppercase">The Recreations</h2>
          <p className="font-structural text-lg md:text-xl text-white/70 uppercase tracking-[0.2em]">Reimagined with absolute respect for the legacy.</p>
        </header>

        <div className="flex flex-col gap-24 md:gap-32">
          {recreations.map((release) => (
            <div key={release.id} className="recreation-panel flex flex-col md:flex-row relative items-center gap-12 md:gap-24">
              
              {/* Full-width absolute flash layer, contained within the panel bounds */}
              <div className="recreation-flash absolute inset-0 bg-white opacity-0 pointer-events-none z-50"></div>
              
              {/* Left Panel - The Original */}
              <div className="recreation-left w-full md:w-5/12 flex justify-start md:justify-end opacity-40 hover:opacity-70 transition-opacity">
                <div className="w-full max-w-sm relative">
                  <div className="relative z-10 text-left md:text-right">
                    <p className="font-structural text-xs text-white/50 uppercase tracking-[0.2em] mb-4">Original Source</p>
                    <h3 className="font-display text-3xl md:text-4xl text-white mb-2 uppercase tracking-tighter">
                      {release.originalTrackRef?.title || "Unknown Original"}
                    </h3>
                    <p className="font-structural text-lg text-white/70 mb-6 italic tracking-wider">
                      Composed by {release.originalTrackRef?.composer}
                    </p>
                    <p className="font-structural text-xs text-white/50 uppercase tracking-[0.2em]">
                      {release.originalTrackRef?.year}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Center Spill Light Connector */}
              <div className="hidden md:flex flex-col items-center justify-center relative w-16 h-32">
                <div className="absolute w-px h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-30"></div>
              </div>
              
              {/* Right Panel - The Reimagining */}
              <div className="recreation-right w-full md:w-5/12 relative">
                <div className="text-left">
                  <p className="font-structural text-xs text-white/80 uppercase tracking-[0.2em] mb-4">
                    Session • {release.year}
                  </p>
                  
                  <h3 className="font-display text-5xl md:text-6xl text-white mb-2 tracking-tighter uppercase">
                    {release.title}
                  </h3>
                  
                  <p className="font-structural text-xs text-white/50 uppercase tracking-[0.2em] mb-8">
                    {release.project}
                  </p>
                  
                  <p className="font-structural text-lg md:text-xl text-white/70 mb-10 leading-relaxed italic tracking-wide">
                    {release.contextLine}
                  </p>
                  
                  <div className="w-full border border-white/20 p-1 max-w-md bg-black">
                    {release.embedUrl !== "PLACEHOLDER_SPOTIFY_EMBED" ? (
                      <iframe src={release.embedUrl} width="100%" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="block w-full"></iframe>
                    ) : (
                      <div className="w-full h-[80px] bg-black border border-white/20 flex items-center justify-center">
                        <span className="font-structural text-xs text-white/50 tracking-[0.2em] uppercase">Playback [Pending]</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
