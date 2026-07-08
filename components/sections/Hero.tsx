'use client';
import { useState } from 'react';

const clipTopMobile = "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 10vh))";
const clipBottomMobile = "polygon(0 0, 100% 10vh, 100% 100%, 0 100%)";
const clipLeftDesktop = "polygon(0 0, 100% 0, calc(100% - 10vw) 100%, 0 100%)";
const clipRightDesktop = "polygon(10vw 0, 100% 0, 100% 100%, 0 100%)";

export default function Hero() {
  const [hovered, setHovered] = useState<'left' | 'right' | null>(null);

  const getDesktopWidths = () => {
    if (hovered === 'left') return { left: '90vw', right: '20vw' };
    if (hovered === 'right') return { left: '20vw', right: '90vw' };
    return { left: '65vw', right: '45vw' };
  };

  const getMobileHeights = () => {
    if (hovered === 'left') return { top: '85vh', bottom: '25vh' }; // Top is Akshay Raheja
    if (hovered === 'right') return { top: '25vh', bottom: '85vh' }; // Bottom is Akshay & IP
    return { top: '60vh', bottom: '50vh' }; // Default 50/40 overlap
  };

  const widths = getDesktopWidths();
  const heights = getMobileHeights();

  // Dynamic text sizes
  const leftTextSizeMd = hovered === 'left' ? '7vw' : hovered === 'right' ? '8vh' : '5vw';
  const rightTextSizeMd = hovered === 'right' ? '7vw' : hovered === 'left' ? '8vh' : '5vw';
  
  const leftTextSizeSm = hovered === 'left' ? '12vw' : hovered === 'right' ? '8vw' : '10vw';
  const rightTextSizeSm = hovered === 'right' ? '12vw' : hovered === 'left' ? '8vw' : '10vw';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="sticky top-0 z-0 w-full h-[100dvh] flex flex-col md:flex-row overflow-hidden bg-bg-base"
    >
      <style>{`
        .hero-panel-left, .hero-panel-right {
          will-change: width, height, clip-path;
        }
        .hero-panel-left {
          height: ${heights.top};
          clip-path: ${clipTopMobile};
          transition: width 0.8s cubic-bezier(0.7, 0, 0.3, 1), height 0.8s cubic-bezier(0.7, 0, 0.3, 1), clip-path 0.8s cubic-bezier(0.7, 0, 0.3, 1);
        }
        .hero-panel-right {
          height: ${heights.bottom};
          margin-top: -10vh;
          clip-path: ${clipBottomMobile};
          transition: width 0.8s cubic-bezier(0.7, 0, 0.3, 1), height 0.8s cubic-bezier(0.7, 0, 0.3, 1), clip-path 0.8s cubic-bezier(0.7, 0, 0.3, 1);
        }
        .wordmark-left { 
          font-size: ${leftTextSizeSm}; 
          will-change: font-size;
          transition: font-size 0.8s cubic-bezier(0.7, 0, 0.3, 1);
        }
        .wordmark-right { 
          font-size: ${rightTextSizeSm}; 
          will-change: font-size;
          transition: font-size 0.8s cubic-bezier(0.7, 0, 0.3, 1);
        }

        @media (min-width: 768px) {
          .hero-panel-left {
            height: 100%;
            width: ${widths.left};
            clip-path: ${clipLeftDesktop};
          }
          .hero-panel-right {
            height: 100%;
            width: ${widths.right};
            margin-top: 0;
            margin-left: -10vw;
            clip-path: ${clipRightDesktop};
          }
          .wordmark-left { 
            font-size: ${leftTextSizeMd}; 
          }
          .wordmark-right { 
            font-size: ${rightTextSizeMd}; 
          }
          .twist-compressed {
            transform: rotate(-80deg);
            transform: rotate(atan2(-100vh, 10vw));
          }
        }
      `}</style>

      {/* Left Panel - Akshay Raheja */}
      <button 
        className="hero-panel-left relative w-full border-none outline-none cursor-pointer flex items-center justify-center overflow-hidden group"
        onMouseEnter={() => setHovered('left')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => scrollTo('filmography')}
      >
        {/* Background Photo */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/97816532.png" 
            alt="Akshay Raheja" 
            className="w-full h-full object-cover object-center grayscale contrast-75 brightness-[0.3]" 
          />
        </div>
        
        {/* Content */}
        <div className={
          "relative z-10 flex flex-col items-center transition-transform duration-[800ms] ease-[cubic-bezier(0.7,0,0.3,1)] origin-center " +
          (hovered === 'right' ? "twist-compressed" : "")
        }>
          <h2 className="wordmark-left font-display text-text-primary uppercase tracking-tighter whitespace-nowrap leading-[0.85]">
            AKSHAY RAHEJA
          </h2>
          <span className="font-structural text-text-secondary uppercase tracking-[0.3em] text-[10px] md:text-sm border-t border-hairline pt-2 mt-4 md:mt-6">
            COMPOSER
          </span>
        </div>

        {/* Editorial Bio - Left Panel */}
        <div className={
          "absolute bottom-8 left-6 md:bottom-12 md:left-12 max-w-[200px] md:max-w-[280px] text-left transition-opacity duration-700 " +
          (hovered === 'right' ? "opacity-0 pointer-events-none" : "opacity-100 delay-200")
        }>
          <p className="font-structural text-[9px] md:text-[10px] text-text-secondary uppercase tracking-[0.2em] leading-[2]">
            Bollywood composer since 2015. 
            <br/><br/>
            Selected credits:<br/>
            <span className="text-text-primary">Shershaah, Kesari, Runway 34, Phillauri, Hichki.</span>
            <br/><br/>
            Driven by independent-music roots.
          </p>
        </div>
      </button>

      {/* Right Panel - Akshay & IP */}
      <button 
        className="hero-panel-right relative w-full border-none outline-none cursor-pointer flex items-center justify-center overflow-hidden group"
        onMouseEnter={() => setHovered('right')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => scrollTo('now')}
      >
        {/* Background Photo with Red Wash */}
        <div className="absolute inset-0 z-0 bg-bg-base overflow-hidden">
          <img 
            src="/97c611fa-f5c6-4053-a71a-28424bbaf0f3.png" 
            alt="Akshay & IP" 
            className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-75 brightness-[0.4]" 
          />

          {/* Strong Red Wash / Edge Light */}
          <div className="absolute inset-0 bg-accent-flash/10 mix-blend-color-dodge z-30 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-accent-flash/40 to-transparent w-32 z-30 pointer-events-none hidden md:block"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-accent-flash/40 to-transparent h-32 z-30 pointer-events-none md:hidden"></div>
        </div>

        {/* Content */}
        <div className={
          "relative z-40 flex flex-col items-center transition-transform duration-[800ms] ease-[cubic-bezier(0.7,0,0.3,1)] origin-center " +
          (hovered === 'left' ? "twist-compressed" : "")
        }>
          <h2 className="wordmark-right font-display text-text-primary uppercase tracking-tighter whitespace-nowrap leading-[0.85]">
            AKSHAY & IP
          </h2>
          <span className="font-structural text-text-secondary uppercase tracking-[0.3em] text-[10px] md:text-sm border-t border-hairline pt-2 mt-4 md:mt-6">
            TWO PATHS, ONE SOUND
          </span>
        </div>

        {/* Editorial Bio - Right Panel */}
        <div className={
          "absolute bottom-8 right-6 md:bottom-12 md:right-12 max-w-[200px] md:max-w-[500px] text-right transition-opacity duration-700 " +
          (hovered === 'left' ? "opacity-0 pointer-events-none" : "opacity-100 delay-200")
        }>
          <p className="font-structural text-[9px] md:text-[10px] text-text-secondary uppercase tracking-[0.2em] leading-[2]">
            <span className="whitespace-nowrap"><span className="text-text-primary">Akshay Raheja</span> &amp; singer-composer <span className="text-text-primary">IP Singh</span>.</span>
            <br/><br/>
            From scoring the fashion runway world to their Bollywood debut with Crew (2024). 
            <br/><br/>
            A shared belief in staying true to the work.
          </p>
        </div>
      </button>

    </section>
  );
}
