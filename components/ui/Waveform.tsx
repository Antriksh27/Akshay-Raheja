'use client';
import { useEffect, useRef, useState } from 'react';

export default function Waveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const initAudio = () => {
    if (!audioRef.current || analyserRef.current) return;
    
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audioRef.current);
    const analyser = audioCtx.createAnalyser();
    
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    
    analyserRef.current = analyser;
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      initAudio();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    let lastDrawTime = 0;
    const throttleMs = 1000 / 30; // throttle to ~30fps for mobile performance
    
    const draw = (timestamp: number) => {
      animationFrameRef.current = requestAnimationFrame(draw);
      
      if (timestamp - lastDrawTime < throttleMs) return;
      lastDrawTime = timestamp;
      
      const width = canvas.width;
      const height = canvas.height;
      const dpr = window.devicePixelRatio || 1;
      
      // We clear the canvas to make sure we don't smear
      ctx.clearRect(0, 0, width, height);
      
      ctx.fillStyle = '#E8291C'; // var(--color-accent-flash)
      
      // Render fewer points on mobile
      const isMobile = window.innerWidth < 768;
      const numBars = isMobile ? 40 : 80;
      const barWidth = Math.max(2, 3 * dpr);
      const gap = (width - (numBars * barWidth)) / Math.max(1, (numBars - 1));
      
      let x = 0;

      if (isPlaying && analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteTimeDomainData(dataArrayRef.current as any);
        const bufferLength = analyserRef.current.frequencyBinCount;
        const step = Math.max(1, Math.floor(bufferLength / numBars));
        
        for (let i = 0; i < numBars; i++) {
          const v = dataArrayRef.current[i * step] / 128.0;
          const barHeight = Math.max(4 * dpr, Math.abs(v - 1) * height);
          const y = (height - barHeight) / 2;
          ctx.fillRect(x, y, barWidth, barHeight);
          x += barWidth + gap;
        }
      } else {
        // Idle breathing animation
        for (let i = 0; i < numBars; i++) {
          const breathing = Math.sin(time + i * 0.1) * (15 * dpr);
          const barHeight = Math.max(4 * dpr, (15 * dpr) + breathing);
          const y = (height - barHeight) / 2;
          ctx.fillRect(x, y, barWidth, barHeight);
          x += barWidth + gap;
        }
        time += 0.1;
      }
    };
    
    animationFrameRef.current = requestAnimationFrame(draw);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvasRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width * dpr;
        canvasRef.current.height = rect.height * dpr;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-24 sm:h-32 flex items-center">
      {/* Placeholder audio for demo purposes. */}
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" loop crossOrigin="anonymous" className="hidden" />
      
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      <button 
        onClick={toggleAudio}
        className="absolute bottom-0 right-0 p-3 text-text-secondary hover:text-accent-primary transition-colors duration-500 ease-out focus:outline-none"
        aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.898a9 9 0 010 12.728M5 12h4l4-4v12l-4-4H5a2 2 0 01-2-2v-4a2 2 0 012-2z" /></svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h2.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
        )}
      </button>
    </div>
  );
}
