'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { getFilmographyLegacy, Release } from '@/lib/data/releases';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function FilmographyRow({ release }: { release: Release }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div 
      className="group border-b border-hairline py-6 md:py-8 cursor-pointer relative"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 transition-opacity duration-300">
        <div className="w-full md:w-1/6">
          <span className="font-structural text-sm text-text-secondary uppercase tracking-[0.2em]">{release.year}</span>
        </div>
        
        <div className="w-full md:w-3/6">
          <h3 className="font-structural text-2xl md:text-3xl text-text-primary uppercase tracking-widest group-hover:text-accent-flash transition-colors">
            {release.title}
          </h3>
        </div>
        
        <div className="w-full md:w-2/6 text-left md:text-right">
          <span className="font-structural text-xs text-text-secondary uppercase tracking-[0.2em]">
            {release.role.join(' / ')}
          </span>
        </div>
      </div>
      
      {/* Desktop hover image - absolute positioned off-center */}
      <div className="hidden md:block absolute right-[25%] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 w-48 aspect-square relative mix-blend-screen">
        <Image 
          src={release.coverArtPath || '/images/covers/placeholder.jpg'} 
          alt={`${release.title} cover`} 
          fill
          className="object-cover grayscale opacity-60 shadow-2xl"
          unoptimized
        />
      </div>
      
      {/* Mobile expand image */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${isExpanded ? 'max-h-64 mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="w-32 aspect-square relative">
          <Image src={release.coverArtPath || '/images/covers/placeholder.jpg'} alt={`${release.title} cover`} fill className="object-cover grayscale mix-blend-screen opacity-80" unoptimized />
        </div>
      </div>
    </div>
  );
}

export default function FilmographyLegacy() {
  const legacy = getFilmographyLegacy();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Fast snap reveal
    gsap.fromTo('.filmography-row', 
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.filmography-list',
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="filmography" className="w-full py-24 md:py-32 px-6 md:px-16 border-t border-hairline bg-bg-base" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 md:mb-24">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-text-primary tracking-tighter">Filmography</h2>
        </header>

        <div className="filmography-list border-t border-hairline flex flex-col">
          {legacy.map(release => (
            <div key={release.id} className="filmography-row">
              <FilmographyRow release={release} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
