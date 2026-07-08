"use client";

import React from "react";
import { usePlayerContext } from "@/components/providers/GlobalPlayerProvider";
import { Play, Pause, X, SkipForward, Maximize2 } from "lucide-react";
import Image from "next/image";

export function StickyMiniPlayer() {
  const { activeTrack, isPlaying, progress, duration, isPiPVisible, togglePlay, seekTo } = usePlayerContext();
  const [isDismissed, setIsDismissed] = React.useState(false);

  // If a new track starts, undis-miss the PiP
  React.useEffect(() => {
    setIsDismissed(false);
  }, [activeTrack?.id]);

  if (!activeTrack || !isPiPVisible || isDismissed) {
    return null;
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - left;
    const percentage = Math.max(0, Math.min(1, clickPosition / width));
    seekTo(percentage);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] animate-in slide-in-from-bottom-8 fade-in duration-500">
      <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-3 w-72 flex flex-col gap-3 group">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-white/60 text-[10px] uppercase tracking-widest font-structural font-bold">Now Playing</span>
          </div>
          <button 
            onClick={() => setIsDismissed(true)}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
            <Image 
              src={activeTrack.artwork || "/placeholder.svg"} 
              alt={activeTrack.title} 
              fill 
              className="object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex gap-0.5 h-3 items-end">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-white rounded-full animate-pulse" 
                      style={{ height: `${Math.max(30, Math.random() * 100)}%`, animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-bold text-sm truncate">{activeTrack.title}</h4>
            <p className="text-white/50 text-xs truncate">{activeTrack.artist}</p>
          </div>

          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-black" />
            ) : (
              <Play className="w-5 h-5 fill-black ml-0.5" />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div 
          className="h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden relative mt-1"
          onClick={handleProgressClick}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
            style={{ width: `${duration > 0 ? (progress / duration) * 100 : 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}
