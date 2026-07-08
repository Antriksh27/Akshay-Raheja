'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

function MagneticLink({ children, href, isActive }: { children: React.ReactNode, href: string, isActive: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 }); // scale down the pull
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative z-10 px-4 md:px-8 py-3 font-structural text-xs md:text-sm uppercase tracking-widest transition-opacity duration-300 flex-1 text-center ${isActive ? 'font-bold' : 'hover:opacity-60'}`}
    >
      {children}
    </motion.a>
  );
}

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { label: 'RUNWAY', href: '#runway' },
    { label: 'NOW', href: '#now' },
    { label: 'RECREATIONS', href: '#recreations' },
    { label: 'FILMOGRAPHY', href: '#filmography' },
    { label: 'SOUND', href: '#sound' },
    { label: 'PRESS', href: '#press' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      let current = '';
      for (const link of navLinks) {
        const element = document.querySelector(link.href);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            current = link.href;
          }
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Nav (AKSHAY RAHEJA / CONTACT) */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start pointer-events-none mix-blend-difference text-text-primary">
        <a href="#hero" className="font-structural text-sm tracking-widest uppercase pointer-events-auto hover:text-accent-flash transition-colors">
          AKSHAY RAHEJA
        </a>
        <a href="#contact" className="font-structural text-sm tracking-widest uppercase pointer-events-auto hover:text-accent-flash transition-colors">
          CONTACT
        </a>
      </nav>

      {/* Bottom Ticker-Style Nav Bar */}
      <nav className={`fixed bottom-0 left-0 w-full z-50 flex pointer-events-none transition-transform duration-500 ${isScrolled ? 'translate-y-0' : 'translate-y-full'}`}>
        
        {/* Solid Bar Background with Mix-Blend for dynamic inversion */}
        <div className="relative w-full bg-white text-black mix-blend-difference flex items-center justify-between pointer-events-auto overflow-hidden">
          
          {/* Full-height Scroll Progress Fill */}
          <motion.div
            className="absolute inset-0 bg-accent-flash origin-left z-0"
            style={{ scaleX }}
          />

          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <MagneticLink key={link.label} href={link.href} isActive={isActive}>
                {isActive && <span className="inline-block w-1.5 h-1.5 bg-accent-flash rounded-full mr-2 mb-0.5"></span>}
                {link.label}
              </MagneticLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
