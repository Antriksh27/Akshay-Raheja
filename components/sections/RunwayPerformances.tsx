'use client';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const runwayData = [
  {
    id: 'ishq-mitha',
    title: 'ISHQ MITHA',
    designer: 'KUNAL RAWAL',
    event: 'INDIA COUTURE WEEK',
    year: '2023',
    context: 'An original track composed exclusively for the show — it went viral and was searched for online before it was ever released on streaming platforms.',
    quote: "The soundtrack is not a finishing touch, it's the starting block.",
    quoteSource: 'Elle India',
    videoUrl: '/ishq-mitha.mp4'
  },
  {
    id: 'rawal-da-kurta',
    title: 'RAWAL DA KURTA',
    designer: 'KUNAL RAWAL',
    event: 'INDIA COUTURE WEEK',
    year: '',
    context: 'Live performance of Rawal Da Kurta at India Couture Week.',
    quote: null,
    quoteSource: null,
    videoUrl: '/rawal-da-kurta.mp4'
  },
  {
    id: 'rani-aur-raj-kumar',
    title: 'RANI AUR RAJ KUMAR',
    designer: 'ABU JANI SANDEEP KHOSLA',
    event: 'INDIA COUTURE WEEK',
    year: '2024',
    context: 'An original live soundtrack blending Punjabi beats for the haveli-set showcase, introduced by comedian Sumukhi Suresh.',
    quote: null,
    quoteSource: null,
    videoUrl: '/snow-live.mp4'
  }
];

function RunwayVideo({ src, isMuted, onToggleMute }: { src: string, isMuted: boolean, onToggleMute: () => void }) {
  return (
    <div className="runway-video-wrapper w-full aspect-[9/16] bg-bg-base border border-hairline relative overflow-hidden group">
      <video 
        src={src}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
      />
      
      {/* Sound Toggle Overlay */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          onToggleMute();
        }}
        className="absolute bottom-4 right-4 z-20 bg-black/40 hover:bg-black/80 backdrop-blur-md text-white border border-white/10 px-4 py-2 rounded-full font-structural text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
      >
        {isMuted ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
            Unmute
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
            Mute
          </>
        )}
      </button>
    </div>
  );
}

export default function RunwayPerformances() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGlobalMuted, setIsGlobalMuted] = useState(false);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Header Animation
    gsap.fromTo('.runway-header', 
      { opacity: 0, y: 100, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        }
      }
    );

    // Individual Item Animations
    const items = gsap.utils.toArray('.runway-item');
    
    items.forEach((item: any, i) => {
      const videoWrapper = item.querySelector('.runway-video-wrapper');
      const video = item.querySelector('video');
      const content = item.querySelector('.runway-content');
      const title = item.querySelector('h3');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          end: "center 50%",
          scrub: 1.5, // buttery smooth scrub
        }
      });

      // Cinematic Window Reveal for Video
      tl.fromTo(videoWrapper, 
        { clipPath: 'inset(15% 15% 15% 15%)', filter: 'brightness(0.5)' },
        { clipPath: 'inset(0% 0% 0% 0%)', filter: 'brightness(1)', ease: 'power2.out' },
        0
      )
      // Extreme Parallax Zoom out for the video itself
      .fromTo(video,
        { scale: 1.4 },
        { scale: 1, ease: 'power2.out' },
        0
      )
      // Text block slides up and fades in
      .fromTo(content,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, ease: 'power3.out' },
        0.1
      )
      // Title gets a tracking expansion
      .fromTo(title,
        { letterSpacing: '-0.05em' },
        { letterSpacing: 'normal', ease: 'power2.out' },
        0.1
      );

      // Auto-play video on scroll (One at a time, with sound)
      if (video) {
        
        const playCurrentVideo = () => {
          // 1. Force pause every other video on the entire page
          document.querySelectorAll('video').forEach(v => {
            if (v !== video) v.pause();
          });
          
          // 2. Play this one (attempt unmuted first)
          video.play().catch((err: any) => {
            if (err.name === 'NotAllowedError') {
              // Browser blocked unmuted autoplay. Fallback to muted.
              setIsGlobalMuted(true);
              video.muted = true;
              video.play().catch(() => {});
            }
          });
        };

        ScrollTrigger.create({
          trigger: videoWrapper,
          start: "center 70%", // Only triggers when comfortably in the middle of the screen
          end: "center 30%",
          onEnter: playCurrentVideo,
          onEnterBack: playCurrentVideo,
          onLeave: () => video.pause(),
          onLeaveBack: () => video.pause(),
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section id="runway" className="w-full py-16 md:py-32 px-4 md:px-16 border-t border-hairline bg-bg-base" ref={containerRef}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 md:mb-28 runway-header transform-gpu">
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl text-text-primary tracking-tighter uppercase mb-4 md:mb-6">The Runway</h2>
          <p className="font-accent text-2xl md:text-4xl text-text-primary opacity-90 max-w-2xl leading-tight">
            Before the soundtrack was a film credit, it was the reason the room went quiet.
          </p>
        </header>

        <div className="flex flex-col gap-12 md:gap-24">
          {runwayData.map((item) => (
            <div key={item.id} className="runway-item flex flex-col md:flex-row gap-8 md:gap-16 border-t border-hairline pt-8 md:pt-12 relative group">
              
              {/* Asset / Video - Left Column */}
              <div className="w-full md:w-5/12 flex-shrink-0">
                {item.videoUrl ? (
                  <RunwayVideo 
                    src={item.videoUrl} 
                    isMuted={isGlobalMuted} 
                    onToggleMute={() => setIsGlobalMuted(!isGlobalMuted)} 
                  />
                ) : (
                  <div className="w-full aspect-[4/5] bg-bg-base border border-hairline relative flex items-center justify-center overflow-hidden grayscale opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none z-10"></div>
                    <p className="font-structural text-xs text-text-secondary tracking-[0.2em] uppercase z-20 border border-hairline px-4 py-2">
                      Asset Pending
                    </p>
                  </div>
                )}
              </div>

              {/* Content - Right Column */}
              <div className="runway-content w-full md:w-7/12 flex flex-col justify-center">
                {/* Metadata Row */}
                <div className="flex flex-wrap gap-4 items-center mb-6">
                  <span className="font-structural text-xs md:text-sm text-text-secondary tracking-widest uppercase">
                    {item.designer}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-accent-flash opacity-50"></span>
                  <span className="font-structural text-xs md:text-sm text-text-secondary tracking-widest uppercase">
                    {item.event}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-accent-flash opacity-50"></span>
                  <span className="font-structural text-xs md:text-sm text-text-secondary tracking-widest uppercase">
                    {item.year}
                  </span>
                </div>

                <h3 className="font-display text-3xl md:text-5xl lg:text-6xl text-text-primary uppercase tracking-tight mb-6 md:mb-8">
                  {item.title}
                </h3>
                
                <p className="font-accent text-xl md:text-3xl text-text-secondary leading-snug mb-8 md:mb-10 max-w-xl">
                  {item.context}
                </p>

                {item.quote && (
                  <div className="border-l border-accent-flash pl-6 mt-4">
                    <p className="font-accent text-lg md:text-2xl text-text-primary leading-relaxed mb-3">
                      "{item.quote}"
                    </p>
                    <p className="font-structural text-xs text-text-secondary tracking-[0.2em] uppercase">
                      — {item.quoteSource}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
