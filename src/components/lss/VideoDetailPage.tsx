"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modules, phaseColors, type VideoResource } from "@/lib/course-data";
import { useLearningStore } from "@/lib/store";
import { VideoPlayer } from "./VideoPlayer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft, Play, Clock, CheckCircle2, ChevronRight,
  Bookmark, BookmarkCheck, Trash2, List, StickyNote,
  Share2, Award, ExternalLink, RotateCcw,
} from "lucide-react";

interface VideoDetailPageProps {
  videoId: string;
  moduleId: string;
}

export function VideoDetailPage({ videoId, moduleId }: VideoDetailPageProps) {
  const {
    setSection, setModule, setActiveVideo, moduleProgress,
    toggleVideoWatched, bookmarks, addBookmark, removeBookmark,
    videoResumePositions, getModuleProgress, setPlaybackSpeed,
  } = useLearningStore();

  const [activeTab, setActiveTab] = useState<"playlist" | "bookmarks">("playlist");
  const [noteText, setNoteText] = useState("");
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const module = useMemo(() => modules.find((m) => m.id === moduleId), [moduleId]);
  const mp = getModuleProgress(moduleId);
  const phaseColor = module ? phaseColors[module.phase] : phaseColors.define;

  const currentVideoIndex = useMemo(() => {
    if (!module) return -1;
    return module.videos.findIndex((v) => v.youtubeId === videoId);
  }, [module, videoId]);

  const currentVideo = module?.videos[currentVideoIndex] as VideoResource | undefined;

  const videoBookmarks = useMemo(
    () => bookmarks.filter((b) => b.videoId === videoId).sort((a, b) => a.time - b.time),
    [bookmarks, videoId]
  );

  const handleVideoChange = useCallback((newVideoId: string) => {
    setActiveVideo(newVideoId, moduleId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [moduleId, setActiveVideo]);

  const handleNext = useCallback(() => {
    if (module && currentVideoIndex < module.videos.length - 1) {
      handleVideoChange(module.videos[currentVideoIndex + 1].youtubeId);
    }
  }, [module, currentVideoIndex, handleVideoChange]);

  const handlePrev = useCallback(() => {
    if (module && currentVideoIndex > 0) {
      handleVideoChange(module.videos[currentVideoIndex - 1].youtubeId);
    }
  }, [module, currentVideoIndex, handleVideoChange]);

  const handleBack = useCallback(() => {
    setActiveVideo(null, null);
    setSection("videos");
  }, [setActiveVideo, setSection]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "n" || e.key === "N") handleNext();
      if (e.key === "p" || e.key === "P") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]);

  if (!module || !currentVideo) return null;

  const progressPercent = mp.videoProgress?.[videoId] || 0;
  const isWatched = mp.videoWatched?.includes(videoId) || false;

  return (
    <section className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span className="hidden sm:inline">Back to Library</span>
            <span className="sm:hidden">Back</span>
          </Button>

          {/* Module badge */}
          <button
            onClick={() => { setActiveVideo(null, null); setModule(moduleId); }}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <div
              className="w-5 h-5 rounded flex items-center justify-center"
              style={{ backgroundColor: `${phaseColor.accent}20`, color: phaseColor.accent }}
            >
              <span className="text-[10px] font-bold">{module.phase[0].toUpperCase()}</span>
            </div>
            <span className="hidden sm:inline">{module.shortTitle}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex flex-col xl:flex-row gap-5">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Video player */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <VideoPlayer
                key={videoId}
                youtubeId={videoId}
                moduleId={moduleId}
                title={currentVideo.title}
                onVideoEnd={handleNext}
              />
            </motion.div>

            {/* Video info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Title and actions */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight mb-1.5 line-clamp-2">
                    {currentVideo.title}
                  </h1>
                  <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground/80">{currentVideo.channel}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {currentVideo.duration}
                    </span>
                    <span className="text-muted-foreground/40">·</span>
                    <Badge variant="outline" className={`text-[10px] ${phaseColor.bg} ${phaseColor.text} ${phaseColor.border}`}>
                      {module.phase.charAt(0).toUpperCase() + module.phase.slice(1)} Phase
                    </Badge>
                    <Badge variant="outline" className={`text-[10px] ${
                      module.belt === "green" ? "border-emerald-500/40 text-emerald-400" : "border-zinc-500/40 text-zinc-300"
                    }`}>
                      {module.belt === "green" ? "Green Belt" : "Black Belt"}
                    </Badge>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant={isWatched ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => toggleVideoWatched(moduleId, videoId)}
                    className={`transition-all ${
                      isWatched
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 group/btn"
                        : "hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20"
                    }`}
                  >
                    {isWatched ? (
                      <>
                        <span className="group-hover/btn:hidden flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Watched
                        </span>
                        <span className="hidden group-hover/btn:inline">Mark Unwatched</span>
                      </>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5 fill-rose-400/20" />
                        Mark Watched
                      </span>
                    )}
                  </Button>

                  <div className="relative">
                    <Button variant="outline" size="sm" onClick={handleCopyLink} className="gap-1.5">
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                    {showShareTooltip && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                        Link copied!
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                  <span>Progress</span>
                  <span className={progressPercent >= 90 ? "text-emerald-400" : ""}>
                    {Math.round(progressPercent)}%
                  </span>
                </div>
                <div className="h-1 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      progressPercent >= 90
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500"
                        : "bg-gradient-to-r from-rose-500 to-rose-400"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progressPercent, 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Keyboard shortcuts info */}
              <div className="bg-secondary/30 rounded-xl p-3 sm:p-4 mb-4 border border-border/20">
                <p className="text-[11px] text-muted-foreground font-medium mb-2">Keyboard Shortcuts</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground/70">
                  <span><kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground/70 text-[10px] font-mono">Space</kbd> Play/Pause</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground/70 text-[10px] font-mono">←</kbd> -10s</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground/70 text-[10px] font-mono">→</kbd> +10s</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground/70 text-[10px] font-mono">F</kbd> Fullscreen</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground/70 text-[10px] font-mono">M</kbd> Mute</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground/70 text-[10px] font-mono">N</kbd> Next</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground/70 text-[10px] font-mono">P</kbd> Previous</span>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrev}
                  disabled={currentVideoIndex <= 0}
                  className="gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous
                </Button>

                <div className="text-xs text-muted-foreground">
                  {currentVideoIndex + 1} / {module.videos.length}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentVideoIndex >= module.videos.length - 1}
                  className="gap-1.5"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="xl:w-[360px] xl:shrink-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-20"
            >
              <Card className="border-border/50 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-border/30">
                  <button
                    onClick={() => setActiveTab("playlist")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors border-b-2 ${
                      activeTab === "playlist"
                        ? "text-emerald-400 border-emerald-500"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    Playlist
                  </button>
                  <button
                    onClick={() => setActiveTab("bookmarks")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors border-b-2 ${
                      activeTab === "bookmarks"
                        ? "text-emerald-400 border-emerald-500"
                        : "text-muted-foreground border-transparent hover:text-foreground"
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    Bookmarks ({videoBookmarks.length})
                  </button>
                </div>

                <ScrollArea className="max-h-[calc(100vh-12rem)]">
                  {/* Playlist */}
                  {activeTab === "playlist" && (
                    <div className="p-2">
                      {/* Module header */}
                      <div className="px-3 py-2 mb-1">
                        <p className="text-xs font-semibold text-foreground/80">{module.shortTitle}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {mp.videoWatched?.length || 0}/{module.videos.length} watched
                        </p>
                      </div>

                      {/* Video list */}
                      {module.videos.map((video, vi) => {
                        const isActive = video.youtubeId === videoId;
                        const vWatched = mp.videoWatched?.includes(video.youtubeId) || false;
                        const vProgress = mp.videoProgress?.[video.youtubeId] || 0;
                        const vResumePos = videoResumePositions[video.youtubeId] || 0;

                        return (
                          <button
                            key={video.youtubeId}
                            onClick={() => handleVideoChange(video.youtubeId)}
                            className={`w-full text-left p-2 rounded-lg transition-all flex gap-3 group/item ${
                              isActive
                                ? "bg-emerald-500/10 border border-emerald-500/20"
                                : "hover:bg-secondary/50 border border-transparent"
                            }`}
                          >
                            {/* Thumbnail placeholder */}
                            <div className="relative w-28 sm:w-32 aspect-video rounded-md overflow-hidden bg-secondary shrink-0">
                              <img
                                src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                alt=""
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                              {/* Progress indicator */}
                              {!vWatched && vProgress > 0 && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/40">
                                  <div
                                    className="h-full bg-rose-500"
                                    style={{ width: `${vProgress}%` }}
                                  />
                                </div>
                              )}
                              {vWatched && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                </div>
                              )}
                              {isActive && (
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                  <div className="w-7 h-7 rounded-full bg-emerald-500/80 flex items-center justify-center">
                                    <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                                  </div>
                                </div>
                              )}
                              {/* Duration badge */}
                              <div className="absolute bottom-1 right-1 bg-black/80 text-[9px] text-white/90 px-1 py-0.5 rounded font-mono">
                                {video.duration}
                              </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0 py-0.5">
                              <p className={`text-xs font-medium line-clamp-2 mb-1 ${
                                isActive ? "text-emerald-400" : "text-foreground/80"
                              }`}>
                                {video.title}
                              </p>
                              <p className="text-[10px] text-muted-foreground">{video.channel}</p>
                              {vResumePos > 10 && !vWatched && (
                                <p className="text-[10px] text-rose-400 mt-1 flex items-center gap-1">
                                  <RotateCcw className="w-2.5 h-2.5" />
                                  Resume at {formatTime(vResumePos)}
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Bookmarks */}
                  {activeTab === "bookmarks" && (
                    <div className="p-3">
                      {videoBookmarks.length === 0 ? (
                        <div className="text-center py-8">
                          <Bookmark className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">No bookmarks yet</p>
                          <p className="text-[10px] text-muted-foreground/60 mt-1">
                            Click the bookmark icon in the player to save a timestamp
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {videoBookmarks.map((bm, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 group/bm"
                            >
                              <button
                                onClick={() => {
                                  const player = document.querySelector("iframe")?.parentElement;
                                  // We'll use store to seek - for now navigate via URL hash
                                }}
                                className="flex items-center gap-2 flex-1 text-left"
                              >
                                <div className="w-8 h-8 rounded-md bg-emerald-500/10 flex items-center justify-center shrink-0">
                                  <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-mono text-emerald-400">{formatTime(bm.time)}</p>
                                  <p className="text-[10px] text-muted-foreground truncate">{bm.label}</p>
                                </div>
                              </button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeBookmark(videoId, bm.time)}
                                className="h-7 w-7 p-0 opacity-0 group-hover/bm:opacity-100 transition-opacity text-muted-foreground hover:text-red-400"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </Card>

              {/* Tips card */}
              <Card className="border-border/50 mt-3 p-3">
                <div className="flex items-start gap-2">
                  <Award className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground/80">Learning Tip</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                      Watch at least 90% of the video to automatically mark it as watched. Use bookmarks to save important moments for quick review.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
