'use client';

import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import ReactPlayer from 'react-player/youtube';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  duration: number;
  url?: string;
}

interface PlayerContextType {
  activeTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  isReady: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  seekTo: (percentage: number) => void;
  setVolume: (volume: number) => void;
  registerVisibility: (trackId: string, isVisible: boolean) => void;
  isPiPVisible: boolean;
  stopTrack: () => void;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function GlobalPlayerProvider({ children }: { children: ReactNode }) {
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isReady, setIsReady] = useState(false);
  
  // Track visibility of cards
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean>>({});
  
  const playerRef = useRef<ReactPlayer>(null);

  const playTrack = (track: Track) => {
    if (activeTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrack(track);
      setIsPlaying(true);
      setProgress(0);
      setDuration(0);
      setIsReady(false);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const stopTrack = () => {
    setIsPlaying(false);
    setActiveTrack(null);
  };

  const seekTo = (percentage: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(percentage, 'fraction');
      setProgress(percentage * duration);
    }
  };

  const setVolumeLevel = (vol: number) => {
    setVolume(vol);
  };

  const registerVisibility = (trackId: string, isVisible: boolean) => {
    setVisibilityMap(prev => {
      if (prev[trackId] === isVisible) return prev;
      return { ...prev, [trackId]: isVisible };
    });
  };

  const isPiPVisible = !!activeTrack && (visibilityMap[activeTrack.id] === false);

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setProgress(state.playedSeconds);
  };

  const handleReady = () => {
    setIsReady(true);
    if (playerRef.current) {
      setDuration(playerRef.current.getDuration());
    }
  };

  const handleDuration = (dur: number) => {
    setDuration(dur);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <PlayerContext.Provider value={{
      activeTrack,
      isPlaying,
      progress,
      duration,
      volume,
      isReady,
      playTrack,
      togglePlay,
      seekTo,
      setVolume: setVolumeLevel,
      registerVisibility,
      isPiPVisible,
      stopTrack
    }}>
      {children}
      
      {/* Hidden Global ReactPlayer */}
      {activeTrack?.url && (
        <div className="fixed inset-0 pointer-events-none opacity-0 z-[-999]" style={{ width: 0, height: 0, overflow: 'hidden' }}>
          <ReactPlayer
            ref={playerRef}
            url={activeTrack.url}
            playing={isPlaying}
            volume={volume}
            onProgress={handleProgress}
            onReady={handleReady}
            onDuration={handleDuration}
            onEnded={handleEnded}
            width="1px"
            height="1px"
            playsinline
            config={{
              playerVars: {
                controls: 0,
                modestbranding: 1,
                fs: 0,
                playsinline: 1,
              }
            }}
          />
        </div>
      )}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a GlobalPlayerProvider');
  }
  return context;
}
