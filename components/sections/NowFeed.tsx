'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getFeaturedRelease, getNowFeed, Release } from '@/lib/data/releases';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MusicPlayer } from '@/components/ui/music-player';

gsap.registerPlugin(ScrollTrigger);

// A helper for formatting indices (01, 02...)
const formatIndex = (index: number) => `TRK.${String(index).padStart(2, '0')}`;

function FeedItem({ release, index, isExpanded, onToggle }: { release: Release, index: number, isExpanded: boolean, onToggle: () => void }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  
  // Hard-cut flash transition
  const handleToggle = () => {
    if (isExpanded) {
      // Just collapse instantly
      onToggle();
      return;
    }

    // Strobe effect before expanding
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      onToggle();
    } else {
      gsap.timeline()
        .set(flashRef.current, { opacity: 1 })
        .call(onToggle)
        .to(flashRef.current, { opacity: 0, duration: 0.15, ease: 'power4.out', delay: 0.05 });
    }
  };

  return (
    <div className="relative border-t border-hairline py-6 md:py-8 group cursor-pointer" onClick={handleToggle} ref={itemRef}>
      
      {/* Absolute Flash Strobe Layer */}
      <div ref={flashRef} className="absolute inset-0 bg-accent-flash opacity-0 pointer-events-none z-50"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 hover:opacity-70 transition-opacity">
        <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto">
          <span className="font-structural text-2xl md:text-3xl text-text-secondary tracking-[0.1em] uppercase">{formatIndex(index)}</span>
          <h3 className="font-display text-3xl md:text-5xl lg:text-6xl text-text-primary uppercase tracking-tighter transition-colors">
            {release.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-4 text-text-secondary">
          <span className="font-structural text-sm tracking-[0.1em] uppercase">{release.project}</span>
          <span className="hidden md:inline font-structural text-sm tracking-[0.1em]">/</span>
          <span className="hidden md:inline font-structural text-sm tracking-[0.1em] uppercase">{release.year}</span>
        </div>
      </div>

      {/* Expanded Content (No GSAP auto-height ease, pure snap) */}
      {isExpanded && (
        <div className="pt-8 pb-4 flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div>
              <div className="flex flex-wrap gap-3 mb-6">
                {release.role.map(r => (
                  <span key={r} className="font-structural text-xs uppercase tracking-[0.2em] border border-hairline px-3 py-1 text-text-secondary">
                    {r}
                  </span>
                ))}
              </div>
              <p className="font-accent text-2xl md:text-3xl text-text-primary italic leading-snug mb-8">{release.contextLine}</p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            {release.youtubeId ? (
              <div className="w-full" onClick={(e) => e.stopPropagation()}>
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
              <div className="w-full max-w-md border border-hairline bg-bg-base p-6 opacity-50">
                <span className="font-structural text-xs uppercase tracking-[0.2em] text-text-secondary block mb-4">Audio Unavailable</span>
                <div className="h-12 flex items-center">
                  <span className="font-body text-sm text-text-primary">No track linked.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function NowFeed() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const featured = getFeaturedRelease();
  const feed = getNowFeed().filter(release => release.id !== featured?.id);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Fast snap reveal instead of soft fade for items
    gsap.fromTo('.feed-element', 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );

    const feedItems = gsap.utils.toArray('.feed-item-reveal');
    
    feedItems.forEach((item: any) => {
      const title = item.querySelector('h3');
      const meta = item.querySelector('.feed-meta'); // We'll add this class to the right side info
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 95%',
          end: 'top 75%',
          scrub: 1,
        }
      });

      tl.fromTo(item, 
        { opacity: 0.3, y: 40 },
        { opacity: 1, y: 0, ease: 'power2.out' },
        0
      )
      .fromTo(title,
        { letterSpacing: '-0.05em', x: -20 },
        { letterSpacing: 'normal', x: 0, ease: 'power2.out' },
        0
      );
    });
  }, { scope: containerRef });

  return (
    <section id="now" className="w-full py-24 md:py-32 bg-bg-raised text-text-primary relative z-0 border-t border-hairline" ref={containerRef}>
      
      {/* Featured / Closing Look (Full-bleed or near full-bleed emphasis) */}
      {featured && (
        <div className="feed-element w-full px-6 md:px-16 mb-24 md:mb-40">
          <header className="max-w-7xl mx-auto mb-16 flex items-center justify-between">
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-text-primary uppercase tracking-tighter">Show Order</h2>
            <span className="hidden md:block font-structural text-sm text-text-primary border border-text-primary px-2 py-1 uppercase tracking-[0.2em] animate-pulse">Live</span>
          </header>

          <div className="max-w-[100vw] mx-auto w-full relative bg-bg-raised border-y border-hairline group">
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 py-12 md:py-16 items-center">
              <div className="w-full lg:w-1/2 flex flex-col justify-center px-0 lg:pr-16">
                <div className="mb-8">
                  <span className="font-structural text-text-secondary uppercase tracking-[0.2em] text-xs mb-4 block font-bold">Closing Look</span>
                  <h3 className="font-display text-4xl md:text-6xl lg:text-7xl text-text-primary uppercase tracking-tighter leading-none mb-4">{featured.title}</h3>
                  <div className="flex items-center gap-4 text-text-secondary">
                    <span className="font-structural text-sm uppercase tracking-[0.1em]">{featured.project}</span>
                    <span className="font-structural text-sm tracking-[0.1em]">/</span>
                    <span className="font-structural text-sm uppercase tracking-[0.1em]">{featured.year}</span>
                  </div>
                </div>
                
                <p className="font-accent text-3xl md:text-4xl text-text-primary italic leading-tight mb-10 max-w-xl">
                  {featured.contextLine}
                </p>

                <div className="flex flex-wrap gap-3">
                  {featured.role.map(r => (
                    <span key={r} className="font-structural text-xs uppercase tracking-[0.2em] border border-hairline px-4 py-2 text-text-primary">
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                {featured.youtubeId ? (
                  <div className="w-full">
                    <MusicPlayer 
                      theme="midnight" 
                      currentTrack={{
                        id: featured.id,
                        title: featured.title,
                        artist: featured.project,
                        album: featured.year.toString(),
                        artwork: `https://img.youtube.com/vi/${featured.youtubeId}/maxresdefault.jpg`,
                        duration: 0,
                        url: `https://www.youtube.com/watch?v=${featured.youtubeId}`
                      }} 
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-md border border-hairline bg-bg-raised p-6 opacity-50">
                    <span className="font-structural text-xs uppercase tracking-[0.2em] text-text-secondary block mb-4">Audio Unavailable</span>
                    <div className="h-12 flex items-center">
                      <span className="font-body text-sm text-text-primary">No track linked.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Running Order List */}
      <div className="feed-element feed-list-container max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col">
          {feed.map((release, index) => (
            <div key={release.id} className="feed-item-reveal">
              <FeedItem 
                release={release} 
                index={index + 1} // +1 because featured is technically 00/Closing
                isExpanded={expandedId === release.id}
                onToggle={() => setExpandedId(expandedId === release.id ? null : release.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
