"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Repeat,
  Shuffle,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Maximize2,
  Minimize2,
  List,
  X,
} from "lucide-react";
import Image from "next/image";
import { usePlayerContext, Track } from "@/components/providers/GlobalPlayerProvider";

export interface MusicPlayerProps {
  theme?: "default" | "spotify" | "cosmic" | "midnight";
  currentTrack?: Track;
  queue?: Track[];
  currentIndex?: number;
  initialTime?: number;
  className?: string;
  autoPlay?: boolean;
  showEqualizer?: boolean;
  onPlayPause?: (isPlaying: boolean) => void;
  onTimeChange?: (time: number) => void;
  onTrackEnd?: () => void;
  onTrackChange?: (track: Track, index: number) => void;
  onVolumeChange?: (volume: number) => void;
}

const defaultTrack: Track = {
  id: "default",
  title: "Sample Track",
  artist: "Sample Artist",
  album: "Sample Album",
  artwork: "/placeholder.svg?height=300&width=300",
  duration: 180,
};

export const MusicPlayer = ({
  theme = "default",
  currentTrack,
  queue = [],
  currentIndex = 0,
  className = "",
  showEqualizer = true,
  onPlayPause,
  onTimeChange,
  onTrackEnd,
  onTrackChange,
  onVolumeChange,
}: MusicPlayerProps) => {
  const track = currentTrack || defaultTrack;
  const globalPlayer = usePlayerContext();
  
  const isThisTrackActive = globalPlayer.activeTrack?.id === track.id;
  
  // Use global state if active, otherwise use default/0
  const isPlaying = isThisTrackActive ? globalPlayer.isPlaying : false;
  const currentTime = isThisTrackActive ? globalPlayer.progress : 0;
  const duration = isThisTrackActive && globalPlayer.duration > 0 ? globalPlayer.duration : (track.duration || 0);
  const volume = globalPlayer.volume * 100; // stored as 0-1 globally
  const isMuted = volume === 0;

  const [liked, setLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [equalizerBars, setEqualizerBars] = useState(Array(12).fill(0));
  
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Intersection Observer for PiP visibility
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          globalPlayer.registerVisibility(track.id, entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // 10% visible is enough to consider it visible
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [track.id, globalPlayer]);

  // Keyboard shortcuts (only active if this is the active track)
  useEffect(() => {
    if (!isThisTrackActive) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      switch (e.code) {
        case "Space":
          e.preventDefault();
          handlePlayToggle();
          break;
        case "ArrowLeft":
          e.preventDefault();
          // We might need a small hack to seek relative on global player, but for now exact seek is fine
          break;
        case "ArrowRight":
          e.preventDefault();
          break;
        case "ArrowUp":
          e.preventDefault();
          globalPlayer.setVolume(Math.min(1, globalPlayer.volume + 0.1));
          break;
        case "ArrowDown":
          e.preventDefault();
          globalPlayer.setVolume(Math.max(0, globalPlayer.volume - 0.1));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isThisTrackActive, globalPlayer]);

  // Equalizer animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && showEqualizer) {
      interval = setInterval(() => {
        setEqualizerBars((bars) => bars.map(() => Math.random() * 100));
      }, 150);
    } else {
      setEqualizerBars(Array(12).fill(0));
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, showEqualizer]);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  const handlePlayToggle = () => {
    globalPlayer.playTrack(track);
    if (onPlayPause) onPlayPause(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !isThisTrackActive) return;
    const { left, width } = progressRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - left;
    const percentage = Math.max(0, Math.min(1, clickPosition / width));
    
    globalPlayer.seekTo(percentage);
    
    const newTime = Math.floor(duration * percentage);
    if (onTimeChange) onTimeChange(newTime);
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration) return;
    const { left, width } = progressRef.current.getBoundingClientRect();
    const hoverPosition = e.clientX - left;
    const percentage = Math.max(0, Math.min(1, hoverPosition / width));
    const hoverTimeValue = Math.floor(duration * percentage);
    setHoverTime(hoverTimeValue);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeRef.current) return;
    const { top, height } = volumeRef.current.getBoundingClientRect();
    const clickPosition = e.clientY - top;
    const percentage = Math.max(0, Math.min(1, 1 - clickPosition / height));
    globalPlayer.setVolume(percentage);
    
    if (onVolumeChange) onVolumeChange(percentage * 100);
  };

  const toggleMute = () => {
    globalPlayer.setVolume(isMuted ? 0.75 : 0);
  };

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  const toggleRepeat = () => {
    const modes: ("off" | "all" | "one")[] = ["off", "all", "one"];
    const currentModeIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentModeIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  const skipTrack = (direction: "next" | "prev") => {
    if (!queue.length) return;
    // Skip logic for queues can be added here
  };

  const selectTrackFromQueue = (track: Track, index: number) => {
    if (onTrackChange) {
      onTrackChange(track, index);
    }
    setShowQueue(false);
  };

  const getThemeStyles = () => {
    const baseStyles = "transition-all duration-500 backdrop-blur-sm";
    switch (theme) {
      case "spotify":
        return `bg-green-50 dark:bg-black text-green-600 dark:text-green-500 border-2 border-green-400/40 shadow-2xl shadow-green-500/20 ${baseStyles}`;
      case "cosmic":
        return `bg-gradient-to-br from-bg-base via-bg-base to-bg-base text-text-primary border border-hairline shadow-2xl shadow-black/20 ${baseStyles}`;
      case "midnight":
        return `bg-gradient-to-br from-bg-base via-bg-base to-bg-base text-text-primary border border-hairline shadow-2xl shadow-black/20 ${baseStyles}`;
      default:
        return `bg-gradient-to-br from-bg-base via-bg-base to-bg-base text-text-primary border border-hairline shadow-2xl shadow-black/20 ${baseStyles}`;
    }
  };

  const getAccentColor = () => {
    switch (theme) {
      case "spotify": return "bg-green-500";
      case "cosmic": return "bg-accent-flash";
      case "midnight": return "bg-accent-flash";
      default: return "bg-accent-flash";
    }
  };

  const getEqualizerColor = () => {
    switch (theme) {
      case "spotify": return "from-green-300 to-green-500";
      case "cosmic": return "from-accent-flash to-accent-flash";
      case "midnight": return "from-accent-flash to-accent-flash";
      default: return "from-accent-flash to-accent-flash";
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative" ref={containerRef}>
      <div
        className={`${getThemeStyles()} ${className} rounded-2xl overflow-hidden shadow-lg w-full max-w-md mx-auto min-w-0 ${isThisTrackActive ? 'ring-2 ring-black dark:ring-white scale-[1.01] transition-transform' : 'transition-transform'}`}
      >
        {/* Artwork Section */}
        <div className="relative">
          <div
            className={`w-full transition-all duration-500 ${isExpanded ? "h-96" : "h-48 sm:h-60"} relative overflow-hidden`}
          >
            <Image
              src={track.artwork || "/placeholder.svg"}
              alt={`${track.title} by ${track.artist}`}
              fill
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${isExpanded ? "from-transparent" : "from-black/80"} via-transparent to-transparent`}
            ></div>
            {/* Equalizer Overlay */}
            {showEqualizer && isPlaying && (
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 flex items-end gap-0.5 sm:gap-1 opacity-80">
                {equalizerBars.map((height, i) => (
                  <div
                    key={i}
                    className={`w-1 sm:w-1.5 bg-gradient-to-t ${getEqualizerColor()} rounded-full transition-all duration-150 shadow-sm`}
                    style={{ height: `${Math.max(4, height * 0.3)}px` }}
                  />
                ))}
              </div>
            )}

            {/* Expand Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 bg-black/40 rounded-full backdrop-blur-sm hover:bg-black/60 transition-colors"
            >
              {isExpanded ? (
                <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-4 sm:mb-6">
            <div className="flex-1 min-w-0 pr-2">
              <h1 className="text-lg sm:text-xl font-bold mb-1 truncate">
                {track.title}
              </h1>
              <p className="text-xs sm:text-sm opacity-70 truncate">
                {track.artist} • {track.album}
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button
                onClick={() => setLiked(!liked)}
                className={`p-1.5 sm:p-2 rounded-full transition-all hover:scale-110 duration-300 ${
                  liked
                    ? "text-red-500 drop-shadow-lg"
                    : "text-black/40 dark:text-white/60 hover:text-white"
                }`}
              >
                <Heart
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${liked ? "fill-current drop-shadow-sm" : ""}`}
                />
              </button>
              <button className="p-1.5 sm:p-2 rounded-full text-black/40 hover:text-black/60 dark:text-white/60 dark:hover:text-white transition-colors">
                <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4 sm:mb-6">
            <div
              ref={progressRef}
              className="relative h-1.5 sm:h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden cursor-pointer group backdrop-blur-sm border border-white/5"
              onClick={handleProgressClick}
              onMouseMove={handleProgressHover}
              onMouseLeave={() => setHoverTime(null)}
            >
              <div
                className={`absolute top-0 left-0 h-full ${getAccentColor().split(" ")[0]} rounded-full transition-all`}
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg border-2 border-white/20"
                style={{
                  left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                  marginLeft: "-6px",
                }}
              />
              {hoverTime !== null && (
                <div
                  className="absolute -top-8 sm:-top-10 bg-black/90 text-white text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg pointer-events-none backdrop-blur-sm border border-white/10"
                  style={{
                    left: `${duration > 0 ? (hoverTime / duration) * 100 : 0}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  {formatTime(hoverTime)}
                </div>
              )}
            </div>
            <div className="flex justify-between mt-1 sm:mt-2 text-xs opacity-70">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
              <button
                onClick={() => setIsShuffled(!isShuffled)}
                className={`p-1.5 sm:p-2 rounded-full transition-all hover:scale-110 hidden sm:block ${
                  isShuffled
                    ? `text-black dark:text-white`
                    : "text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white"
                }`}
              >
                <Shuffle className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
              <button
                onClick={toggleRepeat}
                className={`p-1.5 sm:p-2 rounded-full transition-all hover:scale-110 relative ${
                  repeatMode !== "off"
                    ? "text-black dark:text-white"
                    : "text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white"
                }`}
              >
                <Repeat className="h-3 w-3 sm:h-4 sm:w-4" />
                {repeatMode === "one" && (
                  <span className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white text-black text-xs rounded-full flex items-center justify-center font-bold">
                    1
                  </span>
                )}
              </button>
            </div>

            {/* Center Controls */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <button
                onClick={() => skipTrack("prev")}
                className={`p-1.5 sm:p-2 transition-all hover:scale-110 ${
                  queue.length > 0
                    ? "text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white"
                    : "text-black/40 dark:text-white/40 cursor-not-allowed"
                }`}
                disabled={queue.length === 0}
              >
                <SkipBack className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <button
                onClick={handlePlayToggle}
                className={`p-3 sm:p-4 rounded-full ${getAccentColor()} text-black hover:scale-105 transition-all duration-300 hover:shadow-xl flex-shrink-0`}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 sm:h-6 sm:w-6 fill-black" />
                ) : (
                  <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-0.5 fill-black" />
                )}
              </button>

              <button
                onClick={() => skipTrack("next")}
                className={`p-1.5 sm:p-2 transition-all hover:scale-110 ${
                  queue.length > 0
                    ? "text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white"
                    : "text-black/40 dark:text-white/40 cursor-not-allowed"
                }`}
                disabled={queue.length === 0}
              >
                <SkipForward className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-1 sm:gap-2 relative flex-shrink-0">
              <button
                onClick={toggleVolumeSlider}
                className="p-1.5 sm:p-2 rounded-full text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-all hover:scale-110"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </button>

              {/* Vertical Volume Slider */}
              {showVolumeSlider && (
                <div className="absolute bottom-full mb-2 right-0 bg-black/90 p-2 sm:p-3 rounded-xl backdrop-blur-sm border border-white/10 z-10">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-xs text-white/70">
                      {isMuted ? 0 : Math.round(volume)}%
                    </div>
                    <div
                      ref={volumeRef}
                      className="w-1.5 sm:w-2 h-16 sm:h-20 bg-white/20 rounded-full cursor-pointer border border-white/5 relative"
                      onClick={handleVolumeChange}
                    >
                      <div
                        className={`absolute bottom-0 w-full ${getAccentColor().split(" ")[0]} rounded-full transition-all`}
                        style={{ height: `${isMuted ? 0 : volume}%` }}
                      />
                    </div>
                    <button
                      onClick={toggleMute}
                      className="p-1 rounded text-white/60 hover:text-white transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      ) : (
                        <Volume2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowQueue(!showQueue)}
                className={`p-1.5 sm:p-2 rounded-full transition-all hover:scale-110 hidden sm:block ${
                  showQueue || queue.length > 0
                    ? "text-black dark:text-white"
                    : "text-black/60 dark:text-white/60"
                } ${queue.length === 0 ? "opacity-50" : ""}`}
                disabled={queue.length === 0}
              >
                <List className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showQueue && queue.length > 0 && (
        <div
          className={`${getThemeStyles()} rounded-2xl mt-4 overflow-hidden shadow-lg w-full max-w-md mx-auto`}
        >
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Queue ({queue.length})</h3>
              <button
                onClick={() => setShowQueue(false)}
                className="p-1.5 rounded-full text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {queue.map((queueTrack, index) => (
                <div
                  key={queueTrack.id}
                  onClick={() => selectTrackFromQueue(queueTrack, index)}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all hover:bg-black/5 dark:hover:bg-white/5 ${
                    index === currentIndex ? "bg-black/10 dark:bg-white/10" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={queueTrack.artwork || "/placeholder.svg"}
                      alt={queueTrack.title}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${
                        index === currentIndex
                          ? "text-black dark:text-white"
                          : "text-black/80 dark:text-white/80"
                      }`}
                    >
                      {queueTrack.title}
                    </p>
                    <p className="text-xs opacity-60 truncate">
                      {queueTrack.artist}
                    </p>
                  </div>
                  <div className="text-xs opacity-50 flex-shrink-0">
                    {formatTime(queueTrack.duration)}
                  </div>
                  {index === currentIndex && (
                    <div
                      className={`w-2 h-2 rounded-full ${getAccentColor()} flex-shrink-0`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
