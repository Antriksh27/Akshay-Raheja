'use client';

import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { releases, Release } from '@/lib/data/releases';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Backstage Audio Player snippet
function BackstageClip({ clip, note }: { clip: Release, note: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col gap-3 relative group clip-item">
      {/* Clip player box */}
      <div className="w-full flex items-center gap-6 bg-transparent border-b border-hairline pb-6 pt-2 transition-transform duration-300">
        {isMounted && (
          <ReactPlayer 
            url={clip.youtubeId ? `https://www.youtube.com/watch?v=${clip.youtubeId}` : ''}
            playing={isPlaying}
            onEnded={() => setIsPlaying(false)}
            width="0"
            height="0"
            className="hidden"
            config={{
              playerVars: { showinfo: 0, controls: 0 }
            }}
          />
        )}
        
        <button 
          onClick={togglePlay}
          className="w-12 h-12 flex-shrink-0 text-text-primary border border-hairline hover:border-accent-flash hover:text-accent-flash rounded-none flex items-center justify-center transition-colors focus:outline-none"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
          ) : (
            <svg className="w-5 h-5 translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>
        
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-end justify-between">
            <p className="font-display text-xl md:text-3xl text-text-primary">{clip.title}</p>
            {/* Fake oscilloscope pulse */}
            <div className="flex items-center gap-[2px] opacity-80 h-4">
              {[40, 70, 40, 90, 60, 30].map((h, i) => (
                <div 
                  key={i} 
                  className={`w-[2px] bg-accent-flash ${isPlaying ? 'animate-pulse' : 'opacity-20'}`} 
                  style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
                ></div>
              ))}
            </div>
          </div>
          <p className="font-structural text-xs text-text-secondary uppercase tracking-[0.2em]">{note}</p>
        </div>
      </div>
    </div>
  );
}

export default function SoundIdentity() {
  const containerRef = useRef<HTMLDivElement>(null);

  const clips = [
    releases.find(r => r.id === 'ae-ri-sakhi'),
    releases.find(r => r.id === 'choli-ke-peeche'),
    releases.find(r => r.id === 'dar-ba-dar'),
  ].filter(Boolean) as Release[];

  const notes = [
    "Folk instrumentation / modern scale",
    "Reimagining classics / total respect",
    "Instinct in the room"
  ];

  const bio = "We believe the studio is a place to capture instinct, not labor over perfection. Our sound is rooted in the warmth of acoustic instruments like the sarod and sarangi, woven into arrangements that respect the legacy of what came before while carving out a space entirely our own. It’s a partnership built on intuition, honoring the soul of the track above all else.";

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo('.clip-item', 
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.clips-container',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="sound" className="w-full py-16 md:py-32 px-4 md:px-16 border-t border-hairline bg-bg-base" ref={containerRef}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Column - Bio and Photo Slot */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <header className="mb-8 md:mb-12">
            <h2 className="font-display text-4xl md:text-7xl lg:text-8xl text-text-primary tracking-tighter uppercase">Backstage</h2>
          </header>
          
          <div className="mb-12 lg:mb-16">
            {/* Bio in Inter (neutral grotesque) for clean contrast */}
            <p className="font-body text-lg md:text-2xl text-text-secondary leading-relaxed md:leading-loose">
              {bio}
            </p>
          </div>
        </div>

        {/* Right Column - Clips */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center clips-container pt-8 lg:pt-0">
          <div className="flex flex-col gap-8 md:gap-10">
            {clips.map((clip, index) => (
              <BackstageClip key={clip.id} clip={clip} note={notes[index]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
