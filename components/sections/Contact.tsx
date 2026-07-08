'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useGSAP(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo('.contact-element', 
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    
    console.log("Form payload received:", payload);
    
    setTimeout(() => {
      setStatus('success');
    }, 800);
  };

  return (
    <section id="contact" className="w-full py-24 md:py-32 px-6 md:px-16 border-t border-hairline bg-bg-base" ref={containerRef}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 lg:gap-24">
        
        <div className="w-full md:w-1/3 contact-element">
          <header className="mb-8">
            <h2 className="font-display text-5xl md:text-6xl text-text-primary mb-6 uppercase tracking-tighter">Get in Touch</h2>
            <p className="font-body text-lg text-text-secondary leading-relaxed mb-10">
              For scores, production inquiries, or collaborations, please reach out to the studio.
            </p>
          </header>

          <div>
            <p className="font-structural text-xs text-text-secondary uppercase tracking-[0.2em] mb-2 border-b border-hairline inline-block pb-1">Direct</p>
            <p className="font-structural text-sm text-text-primary hover:text-accent-flash tracking-widest transition-colors">
              <a href="mailto:studio@akshayraheja.com">studio@akshayraheja.com</a>
            </p>
          </div>
        </div>

        <div className="w-full md:w-2/3 contact-element">
          {status === 'success' ? (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center border border-hairline bg-transparent p-12 text-center">
              <span className="font-structural text-sm text-accent-flash uppercase tracking-[0.2em] mb-4">Message Received</span>
              <p className="font-body text-xl text-text-secondary">
                Thank you. The studio will be in touch shortly.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-8 font-structural text-xs text-text-secondary hover:text-text-primary uppercase tracking-[0.2em] border-b border-hairline pb-1 transition-colors focus:outline-none"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-structural text-xs text-text-secondary uppercase tracking-[0.2em]">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required 
                    className="bg-transparent border-b border-hairline py-2 text-text-primary font-body text-lg focus:outline-none focus:border-accent-flash transition-colors"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="organization" className="font-structural text-xs text-text-secondary uppercase tracking-[0.2em]">Organization</label>
                  <input 
                    type="text" 
                    id="organization" 
                    name="organization"
                    required 
                    className="bg-transparent border-b border-hairline py-2 text-text-primary font-body text-lg focus:outline-none focus:border-accent-flash transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="projectType" className="font-structural text-xs text-text-secondary uppercase tracking-[0.2em]">Project Type</label>
                <div className="relative">
                  <select 
                    id="projectType" 
                    name="projectType"
                    required
                    className="w-full bg-transparent border-b border-hairline py-2 text-text-primary font-body text-lg focus:outline-none focus:border-accent-flash transition-colors appearance-none cursor-pointer rounded-none"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-bg-base">Select type...</option>
                    <option value="film" className="text-bg-base">Film</option>
                    <option value="series" className="text-bg-base">Series</option>
                    <option value="brand" className="text-bg-base">Brand / Fashion</option>
                    <option value="other" className="text-bg-base">Other</option>
                  </select>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-structural text-xs text-text-secondary uppercase tracking-[0.2em]">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  required 
                  rows={4}
                  className="bg-transparent border-b border-hairline py-2 text-text-primary font-body text-lg focus:outline-none focus:border-accent-flash transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="font-structural text-xs text-text-primary border border-hairline hover:border-accent-flash hover:text-accent-flash uppercase tracking-[0.2em] px-8 py-3 transition-colors disabled:opacity-50 disabled:cursor-wait"
                >
                  {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
