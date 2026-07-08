'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { getRecreations, Release } from '@/lib/data/releases';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MusicPlayer } from '@/components/ui/music-player';

gsap.registerPlugin(ScrollTrigger);

function RecreationPanel({ release }: { release: Release }) {
  return (
    <div className="recreation-panel relative flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full">
      {/* Red Flash on scroll into view */}
      <div className="recreation-flash absolute inset-0 bg-accent-flash z-50 pointer-events-none opacity-0"></div>

      <div className="w-full md:w-5/12 flex flex-col gap-4 md:gap-6 order-2 md:order-1">
        <h3 className="font-display text-3xl md:text-5xl lg:text-6xl text-text-primary uppercase tracking-tighter leading-none">
          {release.title}
        </h3>
        <p className="font-accent text-xl md:text-3xl text-text-primary italic leading-snug">
          {release.contextLine}
        </p>
        
        {release.originalTrackRef && (
          <div className="mt-2 pt-6 border-t border-hairline">
            <span className="block font-structural text-[10px] md:text-xs text-text-secondary uppercase tracking-[0.2em] mb-3">
              Original Composition
            </span>
            <span className="block font-display text-lg md:text-2xl text-text-primary uppercase tracking-tight">
              {release.originalTrackRef.title} <span className="text-text-secondary font-structural text-sm tracking-widest ml-2">({release.originalTrackRef.year})</span>
            </span>
            <span className="block font-structural text-xs text-text-secondary tracking-widest uppercase mt-2">
              By <span className="text-text-primary">{release.originalTrackRef.composer}</span>
            </span>
          </div>
        )}

        <div className="pt-4">
          <span className="font-structural text-xs text-text-primary uppercase tracking-[0.2em] border-b border-hairline pb-1">
            {release.role.join(' / ')}
          </span>
        </div>
      </div>
      
      <div className="w-full md:w-7/12 relative order-1 md:order-2 recreation-right flex justify-center lg:justify-end">
        {release.youtubeId ? (
          <div className="w-full">
            <MusicPlayer 
              theme="midnight" 
              currentTrack={{
                id: release.id,
                title: release.title,
                artist: release.project,
                album: release.year.toString(),
                artwork: `https://img.youtube.com/vi/${release.youtubeId}/maxresdefault.jpg`,
                duration: 0,
                url: `https://www.youtube.com/watch?v=${release.youtubeId}`
              }} 
            />
          </div>
        ) : (
          <div className="w-full aspect-video relative shadow-2xl overflow-hidden">
            <Image 
              src={release.coverArtPath || '/images/covers/placeholder.jpg'} 
              alt={release.title} 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Recreations() {
  const recreations = getRecreations();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Vertical layout scroll triggers
    const panels = gsap.utils.toArray('.recreation-panel');
    
    panels.forEach((panel: any) => {
      const flash = panel.querySelector('.recreation-flash');
      
      // Panel entry animation
      gsap.fromTo(panel, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
          }
        }
      );

      // Flash effect
      if (flash) {
        gsap.to(flash, {
          opacity: 1,
          duration: 0.1,
          ease: "power4.in",
          scrollTrigger: {
            trigger: panel,
            start: "top 50%",
            onEnter: () => {
              gsap.to(flash, { opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.1 });
            }
          }
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      id="recreations" 
      className="w-full bg-bg-base text-text-primary relative z-10 border-t border-hairline overflow-hidden" 
      ref={containerRef}
    >
      <div className="w-full h-full py-16 md:py-32 px-4 md:px-16 max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-16 md:mb-32 max-w-2xl">
          <h2 className="font-display text-4xl md:text-7xl lg:text-8xl text-text-primary tracking-tighter mb-6 md:mb-8">
            The Recreations
          </h2>
          <p className="font-body text-base md:text-xl text-text-secondary leading-relaxed">
            Reimagining iconic classics for a new generation. When the brief is to honor the original while making it hit harder for today's ear.
          </p>
        </header>

        {/* Vertical Stack */}
        <div className="flex flex-col gap-16 md:gap-32">
          {recreations.map((release) => (
            <RecreationPanel key={release.id} release={release} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
