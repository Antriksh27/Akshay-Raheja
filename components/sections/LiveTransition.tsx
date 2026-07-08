'use client';

import Image from 'next/image';

export default function LiveTransition() {
  return (
    <section 
      className="relative w-full h-[70vh] md:h-[100vh]" 
      style={{ clipPath: 'inset(0)' }}
    >
      {/* 
        By placing a 'fixed' element inside a container with 'clip-path: inset(0)', 
        the fixed element stays perfectly locked to the viewport, but is ONLY visible 
        within the boundaries of this section. This creates a flawless, zero-jitter 
        "Window" parallax effect without needing any JavaScript.
      */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <Image
          src="/images/backstage-transition.png"
          alt="Live Performance Transition"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </section>
  );
}
