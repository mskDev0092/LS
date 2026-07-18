"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLearningStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Play, Pause, Volume2, VolumeX, Volume1, Maximize, Minimize,
  SkipBack, SkipForward, Settings, BookmarkPlus,
  CheckCircle2, RotateCcw, EyeOff,
} from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface VideoPlayerProps {
  youtubeId: string;
  moduleId: string;
  title?: string;
  onVideoEnd?: () => void;
  onVideoProgress?: (progress: number) => void;
  className?: string;
}

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const TICK_INTERVAL_MS = 1000;
const SEEK_TOLERANCE_SECONDS = 3;

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VideoPlayer({
  youtubeId,
  moduleId,
  title,
  onVideoEnd,
  onVideoProgress,
  className = "",
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const hideControlsTimer = useRef<NodeJS.Timeout | null>(null);

  const actualWatchedRef = useRef<number>(0);
  const lastTickPosRef = useRef<number>(-1);
  const lastTickTimeRef = useRef<number>(0);

  const {
    playbackSpeed, setPlaybackSpeed, updateVideoProgress,
    markVideoWatched, addBookmark, saveResumePosition,
    getResumePosition, videoResumePositions, moduleProgress,
  } = useLearningStore();

  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [actualProgress, setActualProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showBigPlay, setShowBigPlay] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const isWatched = moduleProgress[moduleId]?.videoWatched?.includes(youtubeId) || false;

  const destroyPlayer = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
    if (hideControlsTimer.current) {
      clearTimeout(hideControlsTimer.current);
      hideControlsTimer.current = null;
    }
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch {}
      playerRef.current = null;
    }
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        initPlayer();
        return;
      }

      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => initPlayer();

      const checkYT = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkYT);
          initPlayer();
        }
      }, 100);

      return () => clearInterval(checkYT);
    };

    function initPlayer() {
      if (playerRef.current) return;
      if (!containerRef.current) return;

      const playerDiv = document.createElement("div");
      playerDiv.id = `yt-player-${youtubeId}`;
      playerDiv.style.width = "100%";
      playerDiv.style.height = "100%";
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(playerDiv);

      const savedPosition = getResumePosition(youtubeId);

      playerRef.current = new window.YT.Player(playerDiv.id, {
        videoId: youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          origin: typeof window !== "undefined" ? window.location.origin : "",
          start: savedPosition > 0 ? Math.floor(savedPosition) : 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError,
        },
      });
    }

    const cleanup = loadYouTubeAPI();
    return () => {
      if (typeof cleanup === "function") cleanup();
      destroyPlayer();
    };
  }, [youtubeId, destroyPlayer, getResumePosition]);

  // Sync playback speed
  useEffect(() => {
    if (playerRef.current && playerReady) {
      try { playerRef.current.setPlaybackRate(playbackSpeed); } catch {}
    }
  }, [playbackSpeed, playerReady]);

  // Sync volume
  useEffect(() => {
    if (playerRef.current && playerReady) {
      try {
        playerRef.current.setVolume(volume);
        if (volume === 0 && !isMuted) {
          setIsMuted(true);
        } else if (volume > 0 && isMuted) {
          setIsMuted(false);
          playerRef.current.unMute();
        }
      } catch {}
    }
  }, [volume, isMuted, playerReady]);

  // --- Visibility / Focus detection ---
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        setTabHidden(true);
        if (playerRef.current && isPlaying) {
          try { playerRef.current.pauseVideo(); } catch {}
        }
      } else {
        setTabHidden(false);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [isPlaying]);

  // --- Player callbacks ---
  const onPlayerReady = useCallback(() => {
    setPlayerReady(true);
    setIsLoading(false);
    try {
      playerRef.current.setVolume(volume);
      playerRef.current.setPlaybackRate(playbackSpeed);
    } catch {}
  }, [volume, playbackSpeed]);

  const onPlayerStateChange = useCallback((event: any) => {
    const state = event.data;

    if (state === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      setShowBigPlay(false);
      setTabHidden(false);
      if (!hasStarted) setHasStarted(true);
      startProgressTracking();
      startHideControlsTimer();
    } else if (state === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
      stopProgressTracking();
      saveCurrentPosition();
      setShowControls(true);
    } else if (state === window.YT.PlayerState.ENDED) {
      setIsPlaying(false);
      setShowBigPlay(false);
      stopProgressTracking();
      if (duration > 0) {
        updateVideoProgress(moduleId, youtubeId, 100);
        markVideoWatched(moduleId, youtubeId);
        saveResumePosition(youtubeId, 0);
      }
      onVideoEnd?.();
    } else if (state === -1) {
      setIsLoading(false);
    }
  }, [hasStarted, moduleId, youtubeId, duration, onVideoProgress, onVideoEnd,
      updateVideoProgress, markVideoWatched, saveResumePosition]);

  const onPlayerError = useCallback(() => {
    setIsLoading(false);
  }, []);

  // --- Progress tracking (actual watch time) ---
  const startProgressTracking = useCallback(() => {
    stopProgressTracking();

    lastTickTimeRef.current = Date.now();
    try {
      lastTickPosRef.current = playerRef.current?.getCurrentTime() || 0;
    } catch { lastTickPosRef.current = 0; }

    progressInterval.current = setInterval(() => {
      if (!playerRef.current) return;
      try {
        const pos = playerRef.current.getCurrentTime() || 0;
        const dur = playerRef.current.getDuration() || 0;
        const now = Date.now();

        setCurrentTime(pos);
        setDuration(dur);

        if (dur > 0 && lastTickPosRef.current >= 0) {
          const elapsed = (now - lastTickTimeRef.current) / 1000;
          const posDelta = pos - lastTickPosRef.current;

          // Only count as watched if position advanced naturally (not seeked)
          // posDelta should be ~TICK_INTERVAL_MS/1000 (±tolerance for speed)
          const expectedDelta = elapsed * playbackSpeed;
          if (posDelta > 0 && posDelta < expectedDelta + SEEK_TOLERANCE_SECONDS && posDelta > 0.3) {
            actualWatchedRef.current += elapsed;
          }

          // Cap at duration
          actualWatchedRef.current = Math.min(actualWatchedRef.current, dur);
        }

        lastTickPosRef.current = pos;
        lastTickTimeRef.current = now;

        if (dur > 0) {
          const actualPct = (actualWatchedRef.current / dur) * 100;
          const cappedPct = Math.min(actualPct, 100);
          setActualProgress(cappedPct);
          setDisplayProgress(pos / dur * 100);

          onVideoProgress?.(cappedPct);
          updateVideoProgress(moduleId, youtubeId, cappedPct);

          if (cappedPct >= 90 && !moduleProgress[moduleId]?.videoWatched?.includes(youtubeId)) {
            markVideoWatched(moduleId, youtubeId);
          }
        }
      } catch {}
    }, TICK_INTERVAL_MS);
  }, [playbackSpeed, moduleId, youtubeId, onVideoProgress, updateVideoProgress, markVideoWatched, moduleProgress]);

  const stopProgressTracking = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  const saveCurrentPosition = useCallback(() => {
    if (!playerRef.current) return;
    try {
      const current = playerRef.current.getCurrentTime() || 0;
      if (current > 5) {
        saveResumePosition(youtubeId, current);
      }
    } catch {}
  }, [youtubeId, saveResumePosition]);

  // Save position + actual watched on unmount
  useEffect(() => {
    return () => {
      saveCurrentPosition();
    };
  }, [saveCurrentPosition]);

  const startHideControlsTimer = useCallback(() => {
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    try {
      const state = playerRef.current.getPlayerState();
      if (state === window.YT.PlayerState.PLAYING) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch {}
  }, []);

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
        if (volume === 0) setVolume(80);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch {}
  }, [isMuted, volume]);

  const seek = useCallback((seconds: number) => {
    if (!playerRef.current) return;
    try {
      const current = playerRef.current.getCurrentTime() || 0;
      const dur = playerRef.current.getDuration() || 0;
      const newTime = Math.max(0, Math.min(current + seconds, dur));
      playerRef.current.seekTo(newTime, true);
      setCurrentTime(newTime);
    } catch {}
  }, []);

  const handleProgressMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return;
    setIsSeeking(true);

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const computePct = (clientX: number) =>
      Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));

    const pct = computePct(e.clientX);
    const dur = playerRef.current.getDuration() || 0;
    playerRef.current.seekTo(pct * dur, true);
    setDisplayProgress(pct * 100);

    const handleMouseMove = (ev: globalThis.MouseEvent) => {
      setDisplayProgress(computePct(ev.clientX) * 100);
    };

    const handleMouseUp = (ev: globalThis.MouseEvent) => {
      const finalPct = computePct(ev.clientX);
      const finalDur = playerRef.current?.getDuration() || 0;
      playerRef.current?.seekTo(finalPct * finalDur, true);
      setDisplayProgress(finalPct * 100);
      setIsSeeking(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current?.parentElement) return;
    if (!document.fullscreenElement) {
      containerRef.current.parentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    startHideControlsTimer();
  }, [startHideControlsTimer]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) startHideControlsTimer();
  }, [isPlaying, startHideControlsTimer]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case " ": case "k": e.preventDefault(); togglePlay(); break;
        case "ArrowRight": e.preventDefault(); seek(10); break;
        case "ArrowLeft": e.preventDefault(); seek(-10); break;
        case "ArrowUp": e.preventDefault(); setVolume((v) => Math.min(100, v + 10)); break;
        case "ArrowDown": e.preventDefault(); setVolume((v) => Math.max(0, v - 10)); break;
        case "f": e.preventDefault(); toggleFullscreen(); break;
        case "m": e.preventDefault(); toggleMute(); break;
        case "j": e.preventDefault(); seek(-10); break;
        case "l": e.preventDefault(); seek(10); break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [togglePlay, seek, toggleFullscreen, toggleMute]);

  const handleAddBookmark = useCallback(() => {
    if (!playerRef.current) return;
    const current = playerRef.current.getCurrentTime() || 0;
    addBookmark(youtubeId, current, `Bookmark at ${formatTime(current)}`);
  }, [youtubeId, addBookmark]);

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  return (
    <div
      className={`relative bg-black rounded-xl overflow-hidden select-none group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ aspectRatio: "16/9" }}
    >
      <div ref={containerRef} className="absolute inset-0" />

      {/* Loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="w-10 h-10 border-[3px] border-white/20 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Tab hidden overlay */}
      {tabHidden && !showBigPlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 text-center">
            <EyeOff className="w-10 h-10 text-white/50" />
            <p className="text-sm text-white/70">Video paused — tab is not in focus</p>
            <Button onClick={togglePlay} size="sm" className="bg-emerald-500 hover:bg-emerald-400 text-white">
              <Play className="w-4 h-4 mr-1 fill-white" /> Resume
            </Button>
          </div>
        </div>
      )}

      {/* Big play button */}
      {showBigPlay && !isLoading && (
        <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 transition-opacity hover:bg-black/50">
          <div className="w-20 h-20 rounded-full bg-emerald-500/90 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-emerald-500/30 transition-transform hover:scale-110">
            <Play className="w-9 h-9 text-white fill-white ml-1" />
          </div>
        </button>
      )}

      {/* Resume badge */}
      {hasStarted && videoResumePositions[youtubeId] > 10 && !showBigPlay && currentTime < 10 && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-white/80 flex items-center gap-2">
            <RotateCcw className="w-3.5 h-3.5" />
            Resumed from {formatTime(videoResumePositions[youtubeId])}
          </div>
        </div>
      )}

      {/* Watched badge */}
      {isWatched && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-emerald-500/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-white font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Watched
          </div>
        </div>
      )}

      {/* Click area for play/pause */}
      {showControls && !showBigPlay && !tabHidden && (
        <div
          className="absolute inset-0 z-[5] cursor-pointer"
          onClick={togglePlay}
          style={{ pointerEvents: isSeeking ? "none" : "auto" }}
        />
      )}

      {/* Controls overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 transition-all duration-300 ${
          showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        <div className="relative px-4 pb-4 pt-12">
          {/* Progress bar (dual-layer: actual watched + display position) */}
          <div
            className="group/progress mb-3 cursor-pointer h-6 flex items-end"
            onMouseDown={handleProgressMouseDown}
          >
            <div className="relative w-full h-1 group-hover/progress:h-1.5 rounded-full bg-white/20 transition-all overflow-hidden">
              {/* Actual watched progress (green, thicker) */}
              <div
                className="absolute top-0 left-0 h-full bg-emerald-500/50 rounded-full transition-none"
                style={{ width: `${Math.min(actualProgress, 100)}%` }}
              />
              {/* Display/position progress (white, thin line on top) */}
              <div
                className="absolute top-0 left-0 h-full bg-white rounded-full transition-none"
                style={{ width: `${displayProgress}%`, opacity: 0.9 }}
              />
            </div>
            {/* Scrub handle */}
            <div
              className="absolute bottom-1.5 w-3.5 h-3.5 rounded-full bg-white shadow-lg opacity-0 group-hover/progress:opacity-100 transition-all -translate-x-1/2 pointer-events-none"
              style={{ left: `${displayProgress}%` }}
            />
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={togglePlay} className="h-9 w-9 p-0 text-white hover:bg-white/10">
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </Button>

              <Button variant="ghost" size="sm" onClick={() => seek(-10)} className="h-9 w-9 p-0 text-white/70 hover:bg-white/10 hover:text-white hidden sm:flex">
                <SkipBack className="w-4 h-4" />
              </Button>

              <Button variant="ghost" size="sm" onClick={() => seek(10)} className="h-9 w-9 p-0 text-white/70 hover:bg-white/10 hover:text-white hidden sm:flex">
                <SkipForward className="w-4 h-4" />
              </Button>

              <div className="relative flex items-center" onMouseEnter={() => setShowVolumeSlider(true)} onMouseLeave={() => setShowVolumeSlider(false)}>
                <Button variant="ghost" size="sm" onClick={toggleMute} className="h-9 w-9 p-0 text-white/70 hover:bg-white/10 hover:text-white">
                  <VolumeIcon className="w-4 h-4" />
                </Button>
                {showVolumeSlider && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/90 backdrop-blur-sm rounded-lg px-2 py-3 flex flex-col items-center gap-2">
                    <input
                      type="range" min={0} max={100}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(Number(e.target.value));
                        if (isMuted && Number(e.target.value) > 0) setIsMuted(false);
                      }}
                      className="volume-slider w-20 h-1 appearance-none bg-white/20 rounded-full cursor-pointer accent-emerald-500"
                    />
                    <span className="text-[10px] text-white/60">{isMuted ? 0 : volume}%</span>
                  </div>
                )}
              </div>

              <div className="text-xs text-white/70 font-mono ml-2 hidden sm:block">
                <span className="text-white/90">{formatTime(currentTime)}</span>
                <span className="mx-1">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={handleAddBookmark}
                className="h-9 w-9 p-0 text-white/70 hover:bg-white/10 hover:text-white hidden sm:flex" title="Add bookmark">
                <BookmarkPlus className="w-4 h-4" />
              </Button>

              <div className="relative">
                <Button variant="ghost" size="sm" onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="h-9 px-2 text-white/70 hover:bg-white/10 hover:text-white text-xs font-mono">
                  <Settings className="w-3.5 h-3.5 mr-1" />
                  {playbackSpeed}x
                </Button>
              </div>
              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 min-w-[120px] z-30">
                  <div className="px-3 py-2 text-[10px] text-white/40 uppercase tracking-wider font-medium border-b border-white/10">
                    Playback Speed
                  </div>
                  {SPEED_OPTIONS.map((speed) => (
                    <button key={speed} onClick={() => { setPlaybackSpeed(speed); setShowSpeedMenu(false); }}
                      className={`w-full px-3 py-2 text-xs text-left transition-colors hover:bg-white/10 flex items-center justify-between ${
                        playbackSpeed === speed ? "text-emerald-400 bg-emerald-500/10" : "text-white/80"
                      }`}>
                      <span>{speed === 1 ? "Normal" : `${speed}x`}</span>
                      {playbackSpeed === speed && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                    </button>
                  ))}
                </div>
              )}

              <Button variant="ghost" size="sm" onClick={toggleFullscreen}
                className="h-9 w-9 p-0 text-white/70 hover:bg-white/10 hover:text-white">
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
