"use client";

import { motion } from "framer-motion";
import { modules, phaseColors } from "@/lib/course-data";
import { useLearningStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Clock, BookOpen, CheckCircle2, RotateCcw, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

export function VideoLibrarySection() {
  const { moduleProgress, setActiveVideo, moduleProgress: allProgress } = useLearningStore();
  const [filter, setFilter] = useState<"all" | "green" | "black">("all");

  const allVideos = useMemo(() =>
    modules
      .filter((m) => filter === "all" || m.belt === filter)
      .flatMap((m) =>
        m.videos.map((v) => ({
          ...v,
          moduleId: m.id,
          moduleTitle: m.shortTitle,
          modulePhase: m.phase,
          moduleBelt: m.belt,
          isWatched: moduleProgress[m.id]?.videoWatched?.includes(v.youtubeId) || false,
          progress: moduleProgress[m.id]?.videoProgress?.[v.youtubeId] || 0,
        }))
      ),
    [filter, moduleProgress]
  );

  const watchedCount = allVideos.filter((v) => v.isWatched).length;

  const continueWatching = useMemo(() =>
    allVideos
      .filter((v) => v.progress > 5 && !v.isWatched)
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 6),
    [allVideos]
  );

  const handleVideoClick = (video: typeof allVideos[0]) => {
    setActiveVideo(video.youtubeId, video.moduleId);
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
            Video <span className="text-rose-400">Library</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Curated video lessons from top Six Sigma educators. Click any video to start learning with our custom player.
          </p>
          <div className="flex items-center justify-center gap-3 mb-2">
            {(["all", "green", "black"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setFilter(b)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  filter === b ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                {b === "all" ? "All" : b === "green" ? "Green Belt" : "Black Belt"}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {watchedCount}/{allVideos.length} watched
            </span>
            {continueWatching.length > 0 && (
              <span className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                {continueWatching.length} in progress
              </span>
            )}
          </div>
        </motion.div>

        {/* Continue Watching */}
        {continueWatching.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold">Continue Watching</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {continueWatching.map((video, i) => (
                <motion.button
                  key={`cw-${video.youtubeId}-${i}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleVideoClick(video)}
                  className="text-left group"
                >
                  <Card className="border-border/30 overflow-hidden hover:border-amber-500/30 transition-all">
                    <div className="relative aspect-video bg-black/30">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                          <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                        </div>
                      </div>
                      {/* Progress bar on thumbnail */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
                        <div
                          className="h-full bg-amber-500 transition-all"
                          style={{ width: `${video.progress}%` }}
                        />
                      </div>
                      <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-[10px] text-white px-1.5 py-0.5 rounded font-mono">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <p className="text-xs font-medium line-clamp-1 mb-1 group-hover:text-amber-400 transition-colors">
                        {video.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">{video.channel}</span>
                        <span className="text-[10px] text-amber-400 font-medium">{Math.round(video.progress)}%</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* All Videos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {allVideos.map((video, i) => {
            const pc = phaseColors[video.modulePhase];
            return (
              <motion.div
                key={`${video.youtubeId}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.5) }}
              >
                <button
                  onClick={() => handleVideoClick(video)}
                  className="w-full text-left group"
                >
                  <Card className="border-border/40 overflow-hidden hover:border-border/80 transition-all h-full flex flex-col">
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-black/30">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {/* Hover play */}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl transition-transform group-hover:scale-105">
                          <Play className="w-6 h-6 text-black fill-black ml-0.5" />
                        </div>
                      </div>
                      {/* Watched badge */}
                      {video.isWatched && (
                        <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Watched
                        </div>
                      )}
                      {/* Progress bar */}
                      {!video.isWatched && video.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
                          <div
                            className="h-full bg-rose-500 transition-all"
                            style={{ width: `${video.progress}%` }}
                          />
                        </div>
                      )}
                      {/* Duration */}
                      <div className="absolute bottom-2 right-2 bg-black/80 text-[10px] text-white/90 px-1.5 py-0.5 rounded font-mono">
                        {video.duration}
                      </div>
                    </div>

                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h4 className="text-sm font-semibold mb-2 line-clamp-2 group-hover:text-rose-400 transition-colors">
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                        <span className="text-muted-foreground/30">·</span>
                        <span>{video.channel}</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <Badge variant="outline" className={`text-[10px] ${pc?.bg} ${pc?.text} ${pc?.border}`}>
                            {video.modulePhase}
                          </Badge>
                          <Badge variant="outline" className={`text-[10px] ${
                            video.moduleBelt === "green" ? "border-emerald-500/40 text-emerald-400" : "border-zinc-500/40 text-zinc-300"
                          }`}>
                            {video.moduleBelt} belt
                          </Badge>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-rose-400 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </button>
              </motion.div>
            );
          })}
        </div>

        {allVideos.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No videos found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
