'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Press() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo('.press-element', 
      { opacity: 0, y: 15 },
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
  }, { scope: containerRef });

  return (
    <section id="press" className="w-full py-16 md:py-32 px-4 md:px-16 bg-bg-base" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 md:mb-24 press-element">
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl text-text-primary uppercase tracking-tighter">Recognition</h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-24 mb-16 md:mb-24">
          <blockquote className="press-element border-t border-hairline pt-6">
            <p className="font-display text-2xl md:text-4xl text-text-primary mb-4 md:mb-6 leading-tight">
              "A seamless marriage of traditional sarod warmth and the muscular demands of modern playback scale."
            </p>
            <footer className="flex flex-col">
              <cite className="font-structural text-sm text-accent-flash uppercase tracking-[0.2em] not-italic mb-1">Hindustan Times</cite>
              <span className="font-structural text-sm text-text-secondary uppercase tracking-[0.2em]">On the Subedaar score</span>
            </footer>
          </blockquote>

          <blockquote className="press-element border-t border-hairline pt-6">
            <p className="font-display text-2xl md:text-4xl text-text-primary mb-4 md:mb-6 leading-tight">
              "They don't just remake classics; they hold a genuine conversation with the composers who came before them."
            </p>
            <footer className="flex flex-col">
              <cite className="font-structural text-sm text-accent-flash uppercase tracking-[0.2em] not-italic mb-1">Rolling Stone India</cite>
              <span className="font-structural text-sm text-text-secondary uppercase tracking-[0.2em]">Reviewing Crew's reimaginations</span>
            </footer>
          </blockquote>
        </div>

        {/* Logo Row */}
        <div className="press-element flex flex-col items-center border-y border-hairline py-10 md:py-16 mb-12 md:mb-16">
          <p className="font-structural text-xs text-text-secondary uppercase tracking-[0.2em] mb-8 text-center">Featured In</p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-20 items-center w-full grayscale opacity-40 hover:opacity-100 transition-opacity duration-300">
            {/* TODO: Swap these text placeholders with real logo SVGs/assets */}
            <span className="font-display text-xl md:text-3xl text-text-primary tracking-tight">DNA</span>
            <span className="font-display text-xl md:text-3xl text-text-primary tracking-tight">Bollywood Hungama</span>
            <span className="font-display text-xl md:text-3xl text-text-primary tracking-tight">Hindustan Times</span>
            <span className="font-display text-xl md:text-3xl text-text-primary tracking-tight">Film Companion</span>
          </div>
        </div>

        <div className="press-element flex justify-center">
          <button 
            disabled 
            className="font-structural text-xs text-text-secondary/50 uppercase tracking-[0.2em] border border-hairline px-6 py-3 cursor-not-allowed"
          >
            Press Kit (Coming Soon)
          </button>
        </div>

      </div>
    </section>
  );
}
