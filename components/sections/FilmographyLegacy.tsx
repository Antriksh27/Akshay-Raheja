'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { getFilmographyLegacy } from '@/lib/data/releases';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function FilmographyLegacy() {
  const legacy = getFilmographyLegacy();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !scrollWrapperRef.current) return;
    
    const wrapper = scrollWrapperRef.current;
    const items = wrapper.querySelectorAll('.poster-item');
    
    const getScrollAmount = () => {
      const parentWidth = wrapper.parentElement?.clientWidth || window.innerWidth;
      return -(wrapper.scrollWidth - parentWidth);
    };

    gsap.to(wrapper, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom", // Finishes exactly when the section unpins
        scrub: true, // Perfect 1:1 scrub sync with no lag, prevents unpinning while posters are still moving
        invalidateOnRefresh: true,
        onUpdate: () => {
          const rightCol = wrapper.parentElement;
          if (!rightCol) return;
          const rightColRect = rightCol.getBoundingClientRect();
          const rightColCenter = rightColRect.left + rightColRect.width / 2;

          items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const distance = Math.abs(itemCenter - rightColCenter);
            
            // If the item center is close to the container center, mark active
            if (distance < rect.width * 0.5) {
              item.setAttribute('data-active', 'true');
            } else {
              item.setAttribute('data-active', 'false');
            }
          });
        }
      }
    });
    
  }, { scope: sectionRef });

  return (
    <section 
      id="filmography" 
      ref={sectionRef}
      className="w-full h-[800vh] relative border-t border-hairline" // Taller section = slower scroll
    >
      {/* Sticky container that stays in the viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col md:flex-row bg-bg-raised">
        
        {/* Texture Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img 
            src="/images/duo-photo-placeholder.jpg" 
            className="w-full h-full object-cover grayscale mix-blend-screen opacity-5"
            alt=""
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-bg-raised/90"></div>
        </div>

        {/* Left Column: Fixed Text */}
        <div className="w-full md:w-1/3 lg:w-2/5 h-auto md:h-full flex flex-col justify-center px-6 py-8 md:py-0 md:px-16 lg:px-24 relative z-20 shrink-0 bg-bg-raised">
          <h2 className="font-display text-5xl md:text-8xl lg:text-[8vw] leading-[0.8] tracking-tighter text-text-primary uppercase mb-8">
            The<br/>Legacy.
          </h2>
          <p className="font-accent text-xl md:text-4xl text-text-secondary italic max-w-sm">
            A decade of original scores that redefined the sound of Indian cinema.
          </p>
        </div>

        {/* Right Column: GSAP Scrolling Posters */}
        <div className="w-full md:w-2/3 lg:w-3/5 h-[60vh] md:h-full relative overflow-hidden flex items-center shrink-0 z-10 bg-bg-base">
          <div 
            ref={scrollWrapperRef}
            className="flex items-center w-max gap-12 md:gap-24 h-[60vh] md:h-[70vh] absolute top-1/2 -translate-y-1/2 left-0 will-change-transform"
          >
            {/* Start Spacer - pushes first poster to center */}
            <div className="w-[50vw] lg:w-[30vw] h-full flex-shrink-0" />

            {/* Film Posters */}
            {legacy.map((release) => (
              <div key={release.id} className="poster-item relative h-full flex-shrink-0 group" data-active="false">
                {/* Poster Image */}
                <div className="h-full aspect-[2/3] relative shadow-2xl overflow-hidden border border-hairline border-opacity-10 bg-bg-raised transition-transform duration-700 ease-out scale-95 group-data-[active=true]:scale-105">
                  <img
                    src={release.coverArtPath || '/images/covers/placeholder.jpg'}
                    alt={release.title}
                    className="w-full h-full object-cover transition-all duration-700 ease-out grayscale opacity-30 group-data-[active=true]:grayscale-0 group-data-[active=true]:opacity-100"
                  />
                </div>
              </div>
            ))}

            {/* End Spacer - allows last poster to reach center */}
            <div className="w-[50vw] lg:w-[30vw] h-full flex-shrink-0" />
          </div>
        </div>

      </div>
    </section>
  );
}
