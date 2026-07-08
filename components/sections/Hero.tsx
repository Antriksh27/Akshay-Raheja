'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // The giant mask scroll animation
    // Text scales up drastically to swallow the screen
    gsap.to(textRef.current, {
      scale: 30, // massive expansion
      opacity: 0,
      ease: "power2.in",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%",
        scrub: 1,
        pin: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="hero" className="relative w-full h-[100dvh] flex flex-col justify-center items-center overflow-hidden bg-black">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/97816532.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover object-center opacity-80" 
        />
        {/* Subtle dark gradient overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </div>

      {/* Giant Typography Background / Mask */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.h1 
          ref={textRef}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[25vw] leading-none tracking-tighter text-white mix-blend-overlay select-none origin-center"
        >
          AKSHAY
        </motion.h1>
      </div>

      {/* Center UI Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-20 flex flex-col items-center justify-center text-white mix-blend-difference"
      >
        <button className="font-structural text-sm tracking-widest uppercase hover:text-[#ff003c] transition-colors">
          [ || ] Mute sound
        </button>
      </motion.div>
      
    </section>
  );
}
